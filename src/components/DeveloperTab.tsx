import React, { useState } from 'react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

const markdownContent = `# Integration Guide — Sending Mouse Input to \`[x].exe\`

\`[x].exe\` is a compiled Bluetooth HID mouse emulator. Once running, it listens for mouse input over UDP and re-emits it as a standard Bluetooth mouse to any paired host device (e.g. a Windows PC). This guide explains everything your application needs to send mouse movements, button presses, and releases to it.

## How It Works

Your application acts as a **UDP sender**. \`[x].exe\` acts as a **UDP receiver**. For every mouse event your app wants to produce, it packs the movement and button state into a 7-byte binary packet and fires it to the machine running \`[x].exe\`.

\`\`\`diagram
Your App  ──[ 7-byte UDP packet ]──►  [x].exe  ──[ BT HID ]──►  Paired Host
\`\`\`

There is no handshake, no connection, and no acknowledgement. UDP is fire-and-forget by design. \`[x].exe\` validates each packet by checking a magic byte at offset 0 and silently discards anything malformed.

## Prerequisites

- \`[x].exe\` is running on its host machine and is reachable over the network from your machine.
- Both machines are on the same network (LAN, Wi-Fi, or direct Ethernet).
- UDP port \`5555\` (default) is not blocked by a firewall on the \`[x].exe\` host.
- You know the IP address of the machine running \`[x].exe\`.

To verify connectivity before integrating, send a test packet from the command line:

\`\`\`bash
# Linux / macOS
echo -ne '\\xAB\\x0A\\x00\\x00\\x00\\x00\\x00' | nc -u -w1 <TARGET_IP> 5555

# Windows PowerShell
$bytes = [byte[]](0xAB, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00)
$udp = New-Object System.Net.Sockets.UdpClient
$udp.Send($bytes, $bytes.Length, "<TARGET_IP>", 5555)
\`\`\`

A \`dx\` of \`+10\` with no buttons and sequence \`0\` is a safe test packet. If \`[x].exe\` is running with \`log_level = 3\` (debug), you will see the packet logged on its console.

## The Wire Protocol

Every packet is exactly **7 bytes**, little-endian.

| Offset | Size | Field | Type | Description |
|---|---|---|---|---|
| \`0\` | 1 byte | \`magic\` | \`uint8\` | Always \`0xAB\`. Packets with any other value are silently dropped. Use this as a sanity check. |
| \`1\` | 2 bytes | \`dx\` | \`int16\` | Relative X movement. Positive = right. Range: -32768 to +32767. |
| \`3\` | 2 bytes | \`dy\` | \`int16\` | Relative Y movement. Positive = down. Range: -32768 to +32767. |
| \`5\` | 1 byte | \`buttons\` | \`uint8\` | Button bitmask (see below). |
| \`6\` | 1 byte | \`seq\` | \`uint8\` | Rolling sequence counter, 0–255. Increment by 1 per packet; wraps at 255 → 0. |

All multi-byte fields use **little-endian** byte order.

### Button Bitmask

\`[x].exe\` reads bits 0–2 of the \`buttons\` byte. Higher bits are ignored.

| Bit | Button |
|---|---|
| \`0\` | Left |
| \`1\` | Right |
| \`2\` | Middle |

Examples:

| Desired State             | \`buttons\` value |
|---------------------------|-----------------|
| No buttons held           | \`0x00\`          |
| Left button held          | \`0x01\`          |
| Right button held         | \`0x02\`          |
| Left + Right held         | \`0x03\`          |
| Middle button held        | \`0x04\`          |
| Left + Middle held        | \`0x05\`          |

A button is **held** as long as its bit is \`1\`. To **release** it, send a subsequent packet with that bit cleared. \`[x].exe\` uses the most recently received state for each source — it does not auto-release buttons between packets.

### \`dx\` / \`dy\` Interpretation

- Both are **relative** deltas, not absolute screen coordinates.
- A single packet can carry any delta in the int16 range (-32768 to +32767). \`[x].exe\` internally clamps each axis to [-127, 127] per 8 ms dispatch tick and carries over the remainder, so large deltas are delivered faithfully across multiple ticks without loss.
- To move the cursor right and down, use positive \`dx\` and positive \`dy\`.
- To move it left and up, use negative values.

### Sequence Number

The \`seq\` field is a rolling counter managed by your sender. Start at \`0\` and increment by \`1\` per packet, wrapping from \`255\` back to \`0\`. \`[x].exe\` parses \`seq\` out of the packet but does not use it for anything — it is not logged, not used for reordering, and not used for deduplication. It is silently discarded after parsing. You must still include it in the packet because it is part of the wire format, but its value has no effect on behaviour.

## Sending Rate

\`[x].exe\` dispatches HID reports at **125 Hz** by default (one report every 8 ms). You can send packets faster than this — accumulated deltas are summed inside \`[x].exe\` and flushed at the dispatch rate — but there is no benefit to sending faster than 125 Hz under default configuration.

**Recommended sender rate:** 100–125 packets/second for smooth cursor movement.

If you are generating high-velocity movements (e.g. a flick gesture), you can batch the delta into a single large packet rather than splitting it across many. \`[x].exe\` handles the clamping and remainder carry-over internally.

## Code Examples

### Python

\`\`\`python
import socket
import struct
import time

TARGET_IP   = "192.168.1.100"   # IP of the machine running [x].exe
TARGET_PORT = 5555
MAGIC       = 0xAB
PACKET_FMT  = "<BhhBB"          # magic(u8), dx(i16), dy(i16), buttons(u8), seq(u8)

def build_packet(dx: int, dy: int, buttons: int, seq: int) -> bytes:
    return struct.pack(PACKET_FMT, MAGIC, dx, dy, buttons & 0x07, seq & 0xFF)

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_SNDBUF, 1024)

seq = 0

def send_move(dx: int, dy: int, buttons: int = 0):
    global seq
    packet = build_packet(dx, dy, buttons, seq)
    sock.sendto(packet, (TARGET_IP, TARGET_PORT))
    seq = (seq + 1) & 0xFF

# --- Example usage ---

# Move right 50px
send_move(50, 0)

# Move down 30px with left button held
send_move(0, 30, buttons=0x01)

# Release all buttons (no movement)
send_move(0, 0, buttons=0x00)

# Smooth movement: 100px right over 10 steps
for _ in range(10):
    send_move(10, 0)
    time.sleep(0.008)  # 125 Hz

sock.close()
\`\`\`

### C++17

\`\`\`cpp
#include <cstdint>
#include <cstring>

#ifdef _WIN32
  #include <winsock2.h>
  #include <ws2tcpip.h>
  #pragma comment(lib, "ws2_32.lib")
  using socket_t = SOCKET;
  #define SOCK_INVALID INVALID_SOCKET
#else
  #include <sys/socket.h>
  #include <arpa/inet.h>
  #include <unistd.h>
  using socket_t = int;
  #define SOCK_INVALID -1
  #define closesocket close
#endif

constexpr uint8_t  PACKET_MAGIC = 0xAB;
constexpr int      PACKET_SIZE  = 7;
constexpr uint16_t TARGET_PORT  = 5555;

#pragma pack(push, 1)
struct MousePacket {
    uint8_t  magic;
    int16_t  dx;
    int16_t  dy;
    uint8_t  buttons;
    uint8_t  seq;
};
#pragma pack(pop)

static_assert(sizeof(MousePacket) == PACKET_SIZE, "Packet must be 7 bytes");

class HidBridgeSender {
public:
    HidBridgeSender(const char* target_ip, uint16_t port = 5555)
        : seq_(0), sock_(SOCK_INVALID)
    {
#ifdef _WIN32
        WSADATA wsa;
        WSAStartup(MAKEWORD(2, 2), &wsa);
#endif
        sock_ = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
        std::memset(&addr_, 0, sizeof(addr_));
        addr_.sin_family = AF_INET;
        addr_.sin_port   = htons(port);
        inet_pton(AF_INET, target_ip, &addr_.sin_addr);
    }

    ~HidBridgeSender() {
        if (sock_ != SOCK_INVALID) closesocket(sock_);
#ifdef _WIN32
        WSACleanup();
#endif
    }

    bool send(int16_t dx, int16_t dy, uint8_t buttons = 0) {
        MousePacket pkt{};
        pkt.magic   = PACKET_MAGIC;
        pkt.dx      = dx;
        pkt.dy      = dy;
        pkt.buttons = buttons & 0x07;
        pkt.seq     = seq_++;

        // The protocol requires little-endian int16 for dx/dy.
        // All platforms this app targets (x86, x64, ARM) are little-endian,
        // so no byte swap is needed. htole16() is a Linux/glibc function and
        // is not available on Windows (MSVC/MinGW), so it is intentionally
        // omitted here. If you ever target a big-endian host, add a manual
        // swap: pkt.dx = (int16_t)((dx << 8) | ((uint16_t)dx >> 8));

        int sent = sendto(sock_,
            reinterpret_cast<const char*>(&pkt), PACKET_SIZE, 0,
            reinterpret_cast<const sockaddr*>(&addr_), sizeof(addr_));

        return sent == PACKET_SIZE;
    }

private:
    sockaddr_in addr_{};
    socket_t    sock_;
    uint8_t     seq_;
};

// --- Example usage ---
int main() {
    HidBridgeSender sender("192.168.1.100");

    // Move right 50 units
    sender.send(50, 0);

    // Left-click (press then release)
    sender.send(0, 0, 0x01);   // left button down
    sender.send(0, 0, 0x00);   // release

    return 0;
}
\`\`\`

### C# / .NET

\`\`\`csharp
using System;
using System.Net;
using System.Net.Sockets;

public class HidBridgeSender : IDisposable
{
    private readonly UdpClient _udp;
    private readonly IPEndPoint _endpoint;
    private byte _seq = 0;

    private const byte MAGIC = 0xAB;

    public HidBridgeSender(string targetIp, int port = 5555)
    {
        _udp = new UdpClient();
        _endpoint = new IPEndPoint(IPAddress.Parse(targetIp), port);
    }

    /// <summary>
    /// Send a mouse movement or button event.
    /// </summary>
    /// <param name="dx">Relative X delta (positive = right).</param>
    /// <param name="dy">Relative Y delta (positive = down).</param>
    /// <param name="buttons">Button bitmask: bit0=Left, bit1=Right, bit2=Middle.</param>
    public void Send(short dx, short dy, byte buttons = 0)
    {
        byte[] packet = BuildPacket(dx, dy, buttons, _seq);
        _seq++;  // wraps automatically at 256
        _udp.Send(packet, packet.Length, _endpoint);
    }

    private static byte[] BuildPacket(short dx, short dy, byte buttons, byte seq)
    {
        var buf = new byte[7];
        buf[0] = MAGIC;

        // int16 little-endian
        buf[1] = (byte)(dx & 0xFF);
        buf[2] = (byte)((dx >> 8) & 0xFF);
        buf[3] = (byte)(dy & 0xFF);
        buf[4] = (byte)((dy >> 8) & 0xFF);

        buf[5] = (byte)(buttons & 0x07);
        buf[6] = seq;
        return buf;
    }

    public void Dispose() => _udp.Dispose();
}

// --- Example usage ---
class Program
{
    static void Main()
    {
        using var sender = new HidBridgeSender("192.168.1.100");

        // Move cursor right 50 units
        sender.Send(50, 0);

        // Right-click
        sender.Send(0, 0, 0x02);   // right down
        sender.Send(0, 0, 0x00);   // release

        // Smooth upward movement over 200ms
        for (int i = 0; i < 25; i++)
        {
            sender.Send(0, -4);
            System.Threading.Thread.Sleep(8);  // 125 Hz
        }
    }
}
\`\`\`

### Node.js

\`\`\`javascript
const dgram = require('dgram');

const TARGET_IP   = '192.168.1.100';
const TARGET_PORT = 5555;
const MAGIC       = 0xAB;

const sock = dgram.createSocket('udp4');
let seq = 0;

function buildPacket(dx, dy, buttons) {
    const buf = Buffer.allocUnsafe(7);
    buf[0] = MAGIC;
    buf.writeInt16LE(dx, 1);
    buf.writeInt16LE(dy, 3);
    buf[5] = buttons & 0x07;
    buf[6] = seq & 0xFF;
    seq = (seq + 1) & 0xFF;
    return buf;
}

function sendMove(dx, dy, buttons = 0) {
    const packet = buildPacket(dx, dy, buttons);
    sock.send(packet, TARGET_PORT, TARGET_IP);
}

// --- Example usage ---

// Move right 50
sendMove(50, 0);

// Left-click
sendMove(0, 0, 0x01);  // press
sendMove(0, 0, 0x00);  // release

// Close socket when done
setTimeout(() => sock.close(), 500);
\`\`\`

## Sending Button Events Correctly

Buttons are **stateful** in \`[x].exe\`. The emitter holds the last-known button state from your source and ORs it with any local physical mouse. This means:

- To click: send \`buttons = 0x01\` (press), then \`buttons = 0x00\` (release).
- To drag: send \`buttons = 0x01\` on the press packet, keep \`buttons = 0x01\` on all movement packets during the drag, then \`buttons = 0x00\` on release.
- Never assume buttons auto-reset. If your process crashes while a button is pressed, \`[x].exe\` will hold that button state until it receives a packet clearing it, or until it disconnects from its BT host.

| Event | \`dx\` | \`dy\` | \`buttons\` | Notes |
|---|---|---|---|---|
| Press event | \`0\` | \`0\` | \`0x01\` | |
| Move while dragging | \`20\` | \`10\` | \`0x01\` | (keep bit set) |
| Release event | \`0\` | \`0\` | \`0x00\` | |

## Configuration Reference

The target port and dispatch rate on \`[x].exe\` are set in its \`config.ini\`. If the defaults have been changed, match them in your sender.

| \`config.ini\` key               | Default | Your sender must match         |
|--------------------------------|---------|--------------------------------|
| \`[network] udp_port\`           | \`5555\`  | Set \`TARGET_PORT\` to this      |
| \`[performance] dispatch_rate_hz\` | \`125\` | Optional: tune your send rate  |

The port can also be overridden at launch via \`--udp-port <N>\`. Check with whoever is running \`[x].exe\` if the default port has been changed.

## Troubleshooting

**Cursor does not move on the paired host**

- Verify \`[x].exe\` is actually running and a BT host is connected to it. Check its console output.
- Confirm \`[x].exe\` is reachable: \`ping <TARGET_IP>\`.
- Confirm the UDP port is open: run \`nc -u -l 5555\` (Linux) or use Wireshark on the \`[x].exe\` host to verify packets arrive.
- Double-check byte order. \`dx\` and \`dy\` must be **little-endian** int16.

**Packets arrive but cursor drifts or overshoots**

- You are likely sending too fast or with accumulated unreduced deltas. Stay at or below 125 packets/second.
- Ensure you are sending **relative** deltas per event, not absolute coordinates.

**Buttons stick (held after you expect them to release)**

- Ensure every press is followed by an explicit release packet (\`buttons = 0x00\`).
- Handle exceptions and process exits in your sender: always send a \`buttons = 0x00\` packet on cleanup.

**Packets are silently dropped with no visible error**

- If \`[x].exe\` receives a packet with an incorrect magic byte, it logs a \`Bad magic\` message at **debug level** (\`logger.debug\`) and discards the packet. This message is only visible when \`log_level = 3\`. At the default \`log_level = 2\` (info), malformed packets are dropped with no output at all.
- To see bad magic messages, restart \`[x].exe\` with \`--log-level 3\` or set \`log_level = 3\` in its \`config.ini\`.
- Verify the first byte of every packet you send is \`0xAB\`.
- In C/C++, check struct alignment — \`#pragma pack(1)\` or equivalent is required to avoid padding between fields.

**Large movements feel laggy**

- Large deltas are carried across multiple 8 ms ticks. For fast gestures, this is expected and correct.
- If overall latency is too high, ask the operator of \`[x].exe\` to increase \`dispatch_rate_hz\` to \`250\` or \`500\` in its \`config.ini\`. Your sender does not need to change.
`;

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const isLanguageCode = !inline && match;

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLanguageCode) {
    if (match[1] === 'diagram') {
      return (
        <div className="p-4 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200/60 relative overflow-hidden my-6 shadow-xs select-none">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl mx-auto py-4">
            
            {/* Sender Node */}
            <div className="w-full md:w-1/3 p-4 rounded-xl bg-white border border-stone-200/85 hover:border-stone-400 hover:shadow-sm transition-all text-center space-y-1 relative z-10">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-stone-100 border border-stone-200 text-stone-550 font-mono text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap">
                Sender
              </div>
              <span className="font-serif font-bold text-stone-950 text-sm block mt-1">Your App</span>
            </div>

            {/* Path 1: UDP */}
            <div className="flex-1 w-full flex items-center justify-center relative min-h-[40px] md:min-h-0">
              {/* Line */}
              <div className="absolute inset-0 top-1/2 -translate-y-1/2 md:h-0.5 md:w-full w-0.5 h-full left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 bg-stone-300/50 overflow-hidden">
                <motion.div
                  className="hidden md:block absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
                  animate={{ left: ["-128px", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
                <motion.div
                  className="md:hidden absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-white to-transparent opacity-90"
                  animate={{ top: ["-128px", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
              <span className="relative z-10 md:-translate-y-4 px-2 py-0.5 rounded-full bg-[#fbfaf7] border border-stone-200 shadow-2xs font-mono text-[9px] font-bold text-[#8c7853] whitespace-nowrap">
                7-byte UDP
              </span>
            </div>

            {/* Receiver / Bridge Node */}
            <div className="w-full md:w-1/3 p-4 rounded-xl bg-white border border-stone-200/85 hover:border-stone-400 hover:shadow-sm transition-all text-center space-y-1 relative z-10">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-stone-100 border border-stone-200 text-stone-550 font-mono text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap">
                Bridge
              </div>
              <span className="font-serif font-bold text-stone-950 text-sm block mt-1">[x].exe</span>
            </div>

            {/* Path 2: BT HID */}
            <div className="flex-1 w-full flex items-center justify-center relative min-h-[40px] md:min-h-0">
              {/* Line */}
              <div className="absolute inset-0 top-1/2 -translate-y-1/2 md:h-0.5 md:w-full w-0.5 h-full left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 bg-stone-300/50 overflow-hidden">
                <motion.div
                  className="hidden md:block absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
                  animate={{ left: ["-128px", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.2 }}
                />
                <motion.div
                  className="md:hidden absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-white to-transparent opacity-90"
                  animate={{ top: ["-128px", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.2 }}
                />
              </div>
              <span className="relative z-10 md:-translate-y-4 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200/60 shadow-2xs font-mono text-[9px] font-bold text-blue-600 whitespace-nowrap">
                BT HID
              </span>
            </div>

            {/* Target Node */}
            <div className="w-full md:w-1/3 p-4 rounded-xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 text-center space-y-1 relative z-10 shadow-sm">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-stone-800 border border-stone-700 text-stone-300 font-mono text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap">
                Target Host
              </div>
              <span className="font-serif font-bold text-white text-sm block mt-1">Paired Host</span>
            </div>
            
          </div>
        </div>
      );
    }

    return (
      <div className="relative group rounded-xl overflow-hidden my-6 border border-stone-800 bg-[#1e1e1e] shadow-lg">
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-stone-800 select-none">
          <span className="text-[11px] font-mono text-stone-400 font-bold uppercase tracking-widest">
            {match[1]}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-stone-700 bg-transparent hover:bg-[#252525] text-stone-400 hover:text-stone-200 transition-all text-[10px] font-mono tracking-widest uppercase cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="text-[12px] sm:text-[13px] leading-relaxed">
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            customStyle={{ margin: 0, padding: '1.25rem', background: 'transparent' }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }

  return (
    <code className="bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded-md font-mono text-[0.85em] border border-stone-200/50" {...props}>
      {children}
    </code>
  );
};

const Table = ({ children, ...props }: any) => (
  <div className="w-full overflow-x-auto my-8 border border-stone-200/80 rounded-xl bg-white shadow-xs">
    <table className="w-full text-left border-collapse text-sm min-w-max" {...props}>
      {children}
    </table>
  </div>
);

const TableHead = ({ children, ...props }: any) => (
  <thead className="bg-stone-50/80 border-b border-stone-200/80" {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, ...props }: any) => (
  <tbody className="divide-y divide-stone-150" {...props}>
    {children}
  </tbody>
);

const TableRow = ({ children, ...props }: any) => (
  <tr className="border-b border-stone-100 last:border-0 hover:bg-stone-50/40 transition-colors" {...props}>
    {children}
  </tr>
);

const TableHeader = ({ children, ...props }: any) => (
  <th className="px-4 py-3 font-serif font-bold text-stone-900 bg-stone-100/50" {...props}>
    {children}
  </th>
);

const TableCell = ({ children, ...props }: any) => (
  <td className="px-4 py-3 text-stone-600 font-light" {...props}>
    {children}
  </td>
);

export default function DeveloperTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8 max-w-5xl mx-auto px-4 w-full min-w-0"
    >
      <div className="p-6 md:p-10 rounded-2xl sm:rounded-3xl bg-white/95 border border-stone-200/60 shadow-xs marble-slab-card w-full max-w-full min-w-0 overflow-hidden prose prose-sm prose-stone max-w-none prose-code:before:hidden prose-code:after:hidden">
        <div className="markdown-body text-stone-700 font-light prose-headings:font-serif prose-headings:font-normal prose-h1:text-2xl prose-h2:text-lg prose-a:text-stone-900 prose-a:underline prose-strong:font-bold prose-strong:text-stone-900 prose-hr:border-stone-200">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: CodeBlock,
              table: Table,
              thead: TableHead,
              tbody: TableBody,
              tr: TableRow,
              th: TableHeader,
              td: TableCell,
              pre: ({ children }) => <>{children}</>
            }}
          >
            {markdownContent}
          </Markdown>
        </div>
      </div>
    </motion.div>
  );
}
