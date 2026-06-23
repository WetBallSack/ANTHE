import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Copy, Check, Server, Cpu, Layers, Radio, Code2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

function highlightCode(code: string, lang: 'csharp' | 'cpp' | 'python'): string {
  // Escape HTML first
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders: {type: string, val: string}[] = [];
  const getPlaceholder = (type: string, val: string) => {
    placeholders.push({type, val});
    return `__PH_${placeholders.length - 1}__`;
  };

  // Match and replace comments
  if (lang === 'python') {
    html = html.replace(/(#.*)/g, (match) => getPlaceholder('comment', match));
  } else {
    html = html.replace(/(\/\*[\s\S]*?\*\/|\/\/.*)/g, (match) => getPlaceholder('comment', match));
  }

  // Match and replace string literals
  html = html.replace(/(&quot;[\s\S]*?&quot;|'[\s\S]*?')/g, (match) => getPlaceholder('string', match));

  // Numbers and hex values
  html = html.replace(/\b(0x[0-9a-fA-F]+|\d+)\b/g, (match) => getPlaceholder('number', match));

  // Keywords
  const keywords = [
    'using', 'namespace', 'public', 'class', 'private', 'const', 'readonly', 'byte', 'string', 'int', 'async', 'Task', 'await', 'try', 'catch', 'void', 'new', 'return', 'ifndef', 'define', 'include', 'constexpr', 'uint8_t', 'int16_t', 'struct', 'static_assert', 'sizeof', 'double', 'bool', 'throw', 'import', 'def', 'self', 'and', 'or', 'not', 'elif', 'else', 'if', 'template', 'std', 'short', 'static', 'nullptr', 'false', 'true', 'as', 'except', 'pass'
  ];
  
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    html = html.replace(regex, (match) => getPlaceholder('keyword', match));
  });

  // Types / Built-ins
  html = html.replace(/\b(UdpClient|IPEndPoint|IPAddress|SocketException|WinsockUdpStreamer|WSADATA|SOCKET|SOCK_DGRAM|IPPROTO_UDP|sockaddr_in|AF_INET|BlockingIOError|Exception|Console)\b/g, (match) => getPlaceholder('type', match));

  // Restore placeholders with styling
  for (let i = placeholders.length - 1; i >= 0; i--) {
    const p = placeholders[i];
    let cls = "";
    if (p.type === 'comment') cls = "text-stone-500 italic";
    else if (p.type === 'string') cls = "text-amber-300";
    else if (p.type === 'number') cls = "text-amber-200";
    else if (p.type === 'keyword') cls = "text-indigo-400 font-semibold";
    else if (p.type === 'type') cls = "text-teal-400 font-medium";

    html = html.replace(`__PH_${i}__`, `<span class="${cls}">${p.val}</span>`);
  }

  return html;
}

export default function DeveloperTab() {
  const { t } = useLanguage();
  const [activeLang, setActiveLang] = useState<'csharp' | 'cpp' | 'python'>('csharp');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeTemplates = {
    csharp: `using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;

public class HidUdpStreamer : IDisposable
{
    private const byte PacketMagic = 0xAB;
    private readonly UdpClient _udpClient;
    private readonly IPEndPoint _targetEndPoint;
    private byte _sequenceNumber = 0;

    // Example instantiation targeting Linux receiver at 192.168.1.100:5555
    public HidUdpStreamer(string ipAddress = "192.168.1.100", int port = 5555)
    {
        _udpClient = new UdpClient();
        _targetEndPoint = new IPEndPoint(IPAddress.Parse(ipAddress), port);
    }

    /// <summary>
    /// Sends a low-overhead, packed binary relative mouse packet asynchronously.
    /// </summary>
    /// <param name="dx">Relative X movement (-32768 to 32767)</param>
    /// <param name="dy">Relative Y movement (-32768 to 32767)</param>
    /// <param name="buttons">Button bitmask (Bit 0: Left, Bit 1: Right, Bit 2: Middle)</param>
    public async Task SendMovementAsync(short dx, short dy, byte buttons)
    {
        byte[] payload = SerializePacket(dx, dy, buttons);
        try
        {
            await _udpClient.SendAsync(payload, payload.Length, _targetEndPoint);
        }
        catch (SocketException ex)
        {
            // Handle transient network exceptions or full socket buffers gracefully
            Console.WriteLine($"[UDP Streamer] Socket Exception: {ex.Message}");
        }
    }

    private byte[] SerializePacket(short dx, short dy, byte buttons)
    {
        byte[] buffer = new byte[7];
        
        buffer[0] = PacketMagic;
        
        // Serialize little-endian 16-bit integers
        buffer[1] = (byte)(dx & 0xFF);
        buffer[2] = (byte)((dx >> 8) & 0xFF);
        
        buffer[3] = (byte)(dy & 0xFF);
        buffer[4] = (byte)((dy >> 8) & 0xFF);
        
        buffer[5] = buttons;
        
        // Capture rolling sequence number and increment
        buffer[6] = _sequenceNumber++;
        
        return buffer;
    }

    public void Dispose()
    {
        _udpClient?.Dispose();
    }
}`,
    cpp: `#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif

#include <windows.h>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <cstdint>
#include <iostream>

#pragma comment(lib, "Ws2_32.lib")

constexpr uint8_t PACKET_MAGIC = 0xAB;

// Force 1-byte alignment to avoid padding compiler differences
#pragma pack(push, 1)
struct HidPacket {
    uint8_t  magic   = PACKET_MAGIC;
    int16_t  dx      = 0;
    int16_t  dy      = 0;
    uint8_t  buttons = 0;
    uint8_t  seq     = 0;
};
#pragma pack(pop)

static_assert(sizeof(HidPacket) == 7, "HidPacket must be exactly 7 bytes on the wire.");

class WinsockUdpStreamer {
private:
    SOCKET m_socket = INVALID_SOCKET;
    sockaddr_in m_targetAddr{};
    uint8_t m_seq = 0;

public:
    // Defaults to Linux receiver at IPv4 address 192.168.1.100 and port 5555
    WinsockUdpStreamer(const char* ipAddress = "192.168.1.100", uint16_t port = 5555) {
        WSADATA wsaData;
        if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
            throw std::runtime_error("WSAStartup failed.");
        }

        m_socket = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
        if (m_socket == INVALID_SOCKET) {
            WSACleanup();
            throw std::runtime_error("Failed to create socket.");
        }

        // Configure socket as non-blocking to prevent locking the main render or hook threads
        u_long nonBlockingMode = 1;
        if (ioctlsocket(m_socket, FIONBIO, &nonBlockingMode) != 0) {
            cleanup();
            throw std::runtime_error("Failed to set non-blocking mode.");
        }

        m_targetAddr.sin_family = AF_INET;
        m_targetAddr.sin_port = htons(port);
        inet_pton(AF_INET, ipAddress, &m_targetAddr.sin_addr);
    }

    ~WinsockUdpStreamer() {
        cleanup();
    }

    bool SendMovement(int16_t dx, int16_t dy, uint8_t buttons) {
        HidPacket packet;
        packet.dx = dx;
        packet.dy = dy;
        packet.buttons = buttons;
        packet.seq = m_seq++;

        int bytesSent = sendto(m_socket, 
                               reinterpret_cast<const char*>(&packet), 
                               sizeof(packet), 
                               0, 
                               reinterpret_cast<const sockaddr*>(&m_targetAddr), 
                               sizeof(m_targetAddr));

        if (bytesSent == SOCKET_ERROR) {
            int errorCode = WSAGetLastError();
            if (errorCode != WSAEWOULDBLOCK) {
                std::cerr << "[Winsock Streamer] Send failed with error: " << errorCode << std::endl;
                return false;
            }
        }
        return true;
    }

private:
    void cleanup() {
        if (m_socket != INVALID_SOCKET) {
            closesocket(m_socket);
            m_socket = INVALID_SOCKET;
        }
        WSACleanup();
    }
};`,
    python: `import socket
import struct

class PythonUdpStreamer:
    PACKET_MAGIC = 0xAB
    # Format: < (little-endian), B (uint8), h (int16), h (int16), B (uint8), B (uint8)
    PACKET_FORMAT = "<BhhBB"

    # Defaulting target connection to Linux receiver IP 192.168.1.100 on port 5555
    def __init__(self, target_ip: str = "192.168.1.100", target_port: int = 5555):
        self.target_ip = target_ip
        self.target_port = target_port
        
        # Instantiate UDP socket
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        
        # Configure non-blocking socket state
        self.sock.setblocking(False)
        self.seq = 0

    def send_movement(self, dx: int, dy: int, buttons: int) -> bool:
        """Serializes and streams mouse movement to the emulator.

        Args:
            dx (int): Relative X axis movement.
            dy (int): Relative Y axis movement.
            buttons (int): Mouse button bitmask.
        """
        # Pack the fields using little-endian structuring
        payload = struct.pack(
            self.PACKET_FORMAT,
            self.PACKET_MAGIC,
            dx,
            dy,
            buttons & 0xFF,
            self.seq & 0xFF
        )
        
        # Increment rolling sequence number
        self.seq = (self.seq + 1) & 0xFF

        try:
            self.sock.sendto(payload, (self.target_ip, self.target_port))
            return True
        except BlockingIOError:
            # Handle socket buffer congestion gracefully
            return False
        except socket.error as e:
            print(f"[Python Streamer] Socket error: {e}")
            return False

    def close(self):
        self.sock.close()`
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8 max-w-5xl mx-auto px-1 sm:px-0"
    >
      {/* Page Header */}
      <div className="p-4 sm:p-6 md:p-10 rounded-3xl bg-white/95 border border-stone-200/60 shadow-xs marble-slab-card overflow-hidden">
        <div className="space-y-2 border-b border-stone-200/40 pb-6 mb-8 text-center sm:text-left">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest font-bold flex items-center justify-center sm:justify-start gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-stone-704" /> {t.developer.badge}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-stone-950 leading-tight">
            {t.developer.title}
          </h3>
          <p className="text-xs text-stone-405 font-light">
            {t.developer.subtitle}
          </p>
        </div>

        {/* Section 1: Architectural Overview */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="h-4.5 w-4.5 text-stone-700" />
            <h4 className="font-serif text-lg font-bold text-stone-900">{t.developer.sec1Title}</h4>
          </div>
          
          <div className="text-xs text-stone-605 leading-relaxed font-light space-y-4 font-sans">
            <p>
              {t.developer.sec1Paragraph1}
            </p>
            <p>
              {t.developer.sec1Paragraph2}
            </p>

            {/* List with icons */}
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/50 space-y-2">
                <span className="font-mono text-[10px] text-stone-400 font-bold uppercase block">{t.developer.step1Title}</span>
                <span className="font-serif font-bold text-stone-950 text-xs block flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-stone-800" /> {t.developer.step1Host}
                </span>
                <p className="text-[11px] text-stone-500 font-light font-sans leading-normal">
                  {t.developer.step1Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/50 space-y-2">
                <span className="font-mono text-[10px] text-stone-400 font-bold uppercase block">{t.developer.step2Title}</span>
                <span className="font-serif font-bold text-stone-950 text-xs block flex items-center gap-1.5">
                  <Radio className="h-3.5 w-3.5 text-stone-800" /> {t.developer.step2Host}
                </span>
                <p className="text-[11px] text-stone-500 font-light font-sans leading-normal">
                  {t.developer.step2Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/50 space-y-2">
                <span className="font-mono text-[10px] text-stone-400 font-bold uppercase block">{t.developer.step3Title}</span>
                <span className="font-serif font-bold text-stone-950 text-xs block flex items-center gap-1.5">
                  <Server className="h-3.5 w-3.5 text-stone-800" /> {t.developer.step3Host}
                </span>
                <p className="text-[11px] text-stone-500 font-light font-sans leading-normal">
                  {t.developer.step3Desc}
                </p>
              </div>
            </div>

            {/* Architectural Visual Flow Diagram */}
            <div className="p-4 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200/60 relative overflow-hidden mt-6 shadow-xs select-none">
              <div className="absolute top-3 right-4 text-[9px] text-stone-400 font-mono tracking-widest uppercase font-bold select-none flex items-center gap-1.5">
                <Layers className="h-3 w-3" /> {t.developer.sysFlow}
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-6 max-w-lg mx-auto py-4">
                {/* Windows Host Node */}
                <div className="w-full p-4 rounded-xl bg-white border border-stone-200/85 hover:border-stone-400 hover:shadow-sm transition-all text-center space-y-1 relative group">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-stone-100 border border-stone-200 text-stone-550 font-mono text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap">
                    {t.developer.srcNode}
                  </div>
                  <span className="font-serif font-bold text-stone-950 text-xs block mt-1">{t.developer.step1Host}</span>
                  <p className="text-[11.5px] text-amber-805 font-mono font-semibold">Aimbot app</p>
                </div>

                {/* Arrow & Protocol Label */}
                <div className="flex flex-col items-center space-y-1 select-none w-full max-w-full">
                  <div className="w-0.5 h-8 bg-stone-300 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1.5 border-4 border-transparent border-t-stone-300 w-0 h-0" />
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold text-[#8c7853] bg-[#fbfaf7] border border-stone-200/80 px-2 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs text-center max-w-full truncate sm:whitespace-normal">
                    {t.developer.udpStream}
                  </span>
                  <div className="w-0.5 h-6 bg-stone-300 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1.5 border-4 border-transparent border-t-stone-300 w-0 h-0" />
                  </div>
                </div>

                {/* Linux HID Receiver Node */}
                <div className="w-full p-4 rounded-xl bg-white border border-stone-200/85 hover:border-stone-400 hover:shadow-sm transition-all text-center space-y-1 relative">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-stone-100 border border-stone-200 text-stone-550 font-mono text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap">
                    {t.developer.bridgeNode}
                  </div>
                  <span className="font-serif font-bold text-stone-950 text-xs block mt-1">{t.developer.step2Host}</span>
                  <p className="text-[11px] text-stone-500 font-mono">linux-hid-emulator</p>
                </div>

                {/* Arrow & Protocol Label */}
                <div className="flex flex-col items-center space-y-1 select-none w-full max-w-full">
                  <div className="w-0.5 h-8 bg-stone-300 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1.5 border-4 border-transparent border-t-stone-300 w-0 h-0" />
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold text-stone-600 bg-stone-50 border border-stone-200/80 px-2 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs text-center max-w-full truncate sm:whitespace-normal">
                    {t.developer.btStream}
                  </span>
                  <div className="w-0.5 h-6 bg-stone-300 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1.5 border-4 border-transparent border-t-stone-300 w-0 h-0" />
                  </div>
                </div>

                {/* Target Device Node */}
                <div className="w-full p-4 rounded-xl bg-gradient-to-b from-stone-900 to-stone-950 text-[#fbfaf7] text-center space-y-1 relative shadow-sm">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-stone-800 border border-stone-700 text-stone-300 font-mono text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap">
                    {t.developer.targetNode}
                  </div>
                  <span className="font-serif font-bold text-white text-xs block mt-1">{t.developer.step3Host}</span>
                  <p className="text-[11px] text-stone-400 font-mono">{t.developer.targetDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Connectionless UDP Network Routing */}
        <section className="space-y-6 mt-12 border-t border-stone-200/40 pt-10">
          <div className="flex items-center gap-2">
            <Radio className="h-4.5 w-4.5 text-stone-700" />
            <h4 className="font-serif text-lg font-bold text-stone-900">{t.developer.sec2RoutingTitle}</h4>
          </div>

          <div className="text-xs text-stone-605 leading-relaxed font-light space-y-4 font-sans">
            <p>
              {t.developer.sec2RoutingDesc}
            </p>

            <div className="grid gap-4 md:grid-cols-3 mt-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/50 space-y-1.5 hover:border-stone-400 hover:shadow-2xs transition-all duration-200">
                <span className="font-serif font-bold text-stone-950 text-xs block">
                  {t.developer.routingStep1Title}
                </span>
                <p className="text-[11px] text-stone-500 font-light leading-normal">
                  {t.developer.routingStep1Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/50 space-y-1.5 hover:border-stone-400 hover:shadow-2xs transition-all duration-200">
                <span className="font-serif font-bold text-stone-950 text-xs block">
                  {t.developer.routingStep2Title}
                </span>
                <p className="text-[11px] text-stone-500 font-light leading-normal">
                  {t.developer.routingStep2Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/50 space-y-1.5 hover:border-stone-400 hover:shadow-2xs transition-all duration-200">
                <span className="font-serif font-bold text-stone-950 text-xs block">
                  {t.developer.routingStep3Title}
                </span>
                <p className="text-[11px] text-stone-500 font-light leading-normal">
                  {t.developer.routingStep3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Custom UDP Payload Specification */}
        <section className="space-y-6 mt-12 border-t border-stone-200/40 pt-10">
          <div className="flex items-center gap-2">
            <Cpu className="h-4.5 w-4.5 text-stone-700" />
            <h4 className="font-serif text-lg font-bold text-stone-900">{t.developer.sec2Title}</h4>
          </div>

          <div className="text-xs text-stone-605 leading-relaxed font-light space-y-4 font-sans">
            <p>
              {t.developer.sec2Desc}
            </p>

            {/* Custom Interactive Table */}
            <div className="overflow-x-auto border border-stone-200/60 rounded-2xl bg-stone-50/40 w-full max-w-full">
              <table className="w-full text-left border-collapse font-sans text-xs min-w-[580px]">
                <thead>
                  <tr className="border-b border-stone-200/80 bg-stone-100/50">
                    <th className="p-4 font-bold text-stone-900 font-serif w-24">{t.developer.colOffset}</th>
                    <th className="p-4 font-bold text-stone-900 font-serif w-24">{t.developer.colSize}</th>
                    <th className="p-4 font-bold text-stone-900 font-serif w-32">{t.developer.colField}</th>
                    <th className="p-4 font-bold text-stone-900 font-serif w-24">{t.developer.colType}</th>
                    <th className="p-4 font-bold text-stone-900 font-serif">{t.developer.colDesc}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-150 text-stone-600 font-light">
                  <tr>
                    <td className="p-4 font-mono font-bold text-stone-900">0</td>
                    <td className="p-4">1 byte</td>
                    <td className="p-4 font-mono text-amber-900 font-bold">magic</td>
                    <td className="p-4 font-mono text-stone-500">uint8</td>
                    <td className="p-4">{t.developer.rowMagic}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-bold text-stone-900">1</td>
                    <td className="p-4">2 bytes</td>
                    <td className="p-4 font-mono text-amber-900 font-bold">dx</td>
                    <td className="p-4 font-mono text-stone-500">int16 (LE)</td>
                    <td className="p-4">{t.developer.rowDx}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-bold text-stone-900">3</td>
                    <td className="p-4">2 bytes</td>
                    <td className="p-4 font-mono text-amber-900 font-bold">dy</td>
                    <td className="p-4 font-mono text-stone-500">int16 (LE)</td>
                    <td className="p-4">{t.developer.rowDy}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-bold text-stone-900">5</td>
                    <td className="p-4">1 byte</td>
                    <td className="p-4 font-mono text-amber-900 font-bold">buttons</td>
                    <td className="p-4 font-mono text-stone-500">uint8</td>
                    <td className="p-4">{t.developer.rowButtons}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-bold text-stone-900">6</td>
                    <td className="p-4">1 byte</td>
                    <td className="p-4 font-mono text-amber-900 font-bold">seq</td>
                    <td className="p-4 font-mono text-stone-500">uint8</td>
                    <td className="p-4">{t.developer.rowSeq}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Button bitmask */}
            <div className="space-y-3 mt-4">
              <h5 className="font-serif font-bold text-stone-950 text-xs">{t.developer.bitmaskTitle}</h5>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/40 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[9px] font-bold text-stone-400 uppercase block">Bit 0 (0x01)</span>
                    <span className="font-serif font-semibold text-stone-900 text-xs">{t.developer.leftClick}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-stone-200 font-mono text-[10px] text-stone-704 font-bold">0x01</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/40 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[9px] font-bold text-stone-400 uppercase block">Bit 1 (0x02)</span>
                    <span className="font-serif font-semibold text-stone-900 text-xs">{t.developer.rightClick}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-stone-200 font-mono text-[10px] text-stone-704 font-bold">0x02</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/40 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[9px] font-bold text-stone-400 uppercase block">Bit 2 (0x04)</span>
                    <span className="font-serif font-semibold text-stone-900 text-xs">{t.developer.middleClick}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-stone-200 font-mono text-[10px] text-stone-704 font-bold">0x04</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Integration Templates */}
        <section className="space-y-6 mt-12 border-t border-stone-200/40 pt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-4.5 w-4.5 text-stone-700" />
              <h4 className="font-serif text-lg font-bold text-stone-900">{t.developer.sec3Title}</h4>
            </div>
            
            {/* Language Switcher Tabs */}
            <div className="flex bg-stone-100 p-1 rounded-full text-[10px] uppercase font-mono tracking-wider border border-stone-200 shadow-inner">
              <button 
                onClick={() => setActiveLang('csharp')}
                className={`px-3 py-1.5 rounded-full transition-all ${activeLang === 'csharp' ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-800'}`}
              >
                C#
              </button>
              <button 
                onClick={() => setActiveLang('cpp')}
                className={`px-3 py-1.5 rounded-full transition-all ${activeLang === 'cpp' ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-800'}`}
              >
                C++
              </button>
              <button 
                onClick={() => setActiveLang('python')}
                className={`px-3 py-1.5 rounded-full transition-all ${activeLang === 'python' ? 'bg-stone-900 text-white font-bold' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Python
              </button>
            </div>
          </div>

          <p className="text-xs text-stone-605 leading-relaxed font-light font-sans">
            {t.developer.sec3Desc}
          </p>

          {/* Code IDE Showcase wrapper */}
          <div className="rounded-2xl border border-stone-800 bg-[#161514] overflow-hidden flex flex-col shadow-xl max-w-full w-full">
            {/* Code header mockup */}
            <div className="bg-[#0f0e0d] px-4 py-3 border-b border-stone-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 shrink-0" />
                <span className="text-[10px] text-stone-500 font-mono ml-3 uppercase truncate">
                  {activeLang === 'csharp' ? 'HidUdpStreamer.cs' : activeLang === 'cpp' ? 'WinsockUdpStreamer.cpp' : 'udp_streamer.py'}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(codeTemplates[activeLang])}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-750 hover:border-stone-500 bg-[#1a1918] hover:bg-[#252322] text-stone-400 hover:text-stone-200 font-mono text-[9px] uppercase tracking-widest transition-all cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">{t.developer.copiedBtn}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-stone-400" />
                    <span>{t.developer.copyBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Pre container */}
            <div className="p-3 sm:p-5 font-mono text-[10px] sm:text-[11px] leading-relaxed overflow-x-auto text-amber-50/90 h-[480px] scrollbar-thin select-text w-full max-w-full font-sans">
              <pre className="font-mono h-full w-full max-w-full block overflow-x-auto whitespace-pre">
                <code className="block w-full" dangerouslySetInnerHTML={{ __html: highlightCode(codeTemplates[activeLang], activeLang) }} />
              </pre>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
