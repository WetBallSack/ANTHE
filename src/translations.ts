export const translations = {
  en: {
    nav: {
      overview: "Overview",
      faq: "Conceptual FAQ",
      tutorials: "Documentation",
      developer: "Developer API",
      shop: "Shop",
      terms: "Terms & Conditions"
    },
    footer: {
      rights: "All rights reserved",
      audit: "Security-audited. Complies with UK CRA 2015."
    },
    overview: {
      marqueeTitle: "IN COLLABORATION WITH",
      slogan: "accessible and assistive technology",
      pill: "Hardware-in-the-Loop Assistive Solution",
      mainTitle: "Network-to-Bluetooth Digital Bridge",
      mainDesc: "Anthe is a high-performance, non-intrusive physical bridging system designed to route precise virtual input signals across a secure, air-gapped local network. By translating software inputs into standard, fully compliant Bluetooth device reports, Anthe enables seamless latency-free controls, advanced gaming assistance, and collaborative co-pilot input simulation—all without ever installing local drivers, software, or kernel-level hooks on your primary machine.",
      ctaStart: "START SETUP GUIDE",
      ctaShop: "VIEW PRICING PLANS",
      stats: {
        latency: "<1ms Latecy",
        latencyDesc: "Over standard local network sockets",
        conn: "Wi-Fi & Ethernet",
        connDesc: "Fully air-gapped mouse forwarding",
        footprint: "0% Footprint",
        footprintDesc: "Zero drivers on target game host"
      },
      parts: {
        sectionTitle: "ACTIVE DATA FLOW ARCHITECTURE",
        title: "Dual-PC Physical Layer",
        desc: "Interactive translation pathways. Mouse coordinates or AI streams are forwarded over standard UDP protocols, transformed independently, and broadcast as pure HID hardware packets.",
        pc1Title: "Primary Device (e.g. Host PC)",
        pc1Desc: "The main gaming computer running the application.",
        pc1Rec: "The bridge outputs native Bluetooth mouse packets, meaning it can target virtually any system without any client software or drivers.",
        pc2Title: "Secondary Bridge Device (any PC)",
        pc2Desc: "A small secondary computer that translates network inputs into physical HID mouse packets, creating an air-gapped simulation.",
        pc2Rec: "Functions completely independently. This is ideal for receiving automated AI coordinate streams from DMA boards or computer vision models."
      },
      parameters: [
        {
          key: "Bypasses Modern Anti-Cheats",
          val: "Bypasses intrusive kernel-level protections like Vanguard, Easy Anti-Cheat (EAC), and BattlEye. Because virtual input drivers are instantly blocked by modern anti-cheat modules, Anthe feeds inputs physically at the hardware level, presenting zero software signature on the game host."
        },
        {
          key: "DMA / AI Aimbot Companion",
          val: "The absolute gold standard for Direct Memory Access (DMA) hardware setups and external AI computer vision aimbots. It acts as the physical injection endpoint for neural-network coordinate outputs, keeping the aiming logic entirely off the host memory space."
        },
        {
          key: "100% Real Bluetooth Reports",
          val: "Appears to the gaming PC as a standard human accessory. Moves are translated directly to physical Bluetooth or HID packages, delivering natural, perfectly smooth aiming curves without system warnings."
        },
        {
          key: "Co-Pilot Input Fusion",
          val: "Enables multi-input co-pilot blending. Sews together artificial vector adjustments from your AI targeting engines with your physical hand corrections in real-time, yielding undetectable human-machine cooperation."
        }
      ],
      comps: {
        title: "Traditional Softwares vs. Anthe Physical Bridge",
        headers: {
          metric: "Metrics & Features",
          anthe: "Anthe Physical Bridge",
          software: "Local Software Injector"
        },
        rows: [
          {
            feature: "Anti-Cheat Compliance (Vanguard/EAC)",
            bridge: "100% Undetectable. Signals are received as genuine hardware reports from a standard bluetooth peripheral.",
            software: "Blocked. Virtual drivers, SendInput hooks, and synthetic input signatures are flagged or blocked on startup."
          },
          {
            feature: "System Memory Footprint",
            bridge: "No software touches the host memory space. Perfectly suited for isolated DMA logic and physical loop bypass.",
            software: "Requires running active software processes, making it vulnerable to pattern scans, heuristic checks, and driver signature validation."
          },
          {
            feature: "AI / ConvNet Optimization",
            bridge: "Inputs are injected with custom sub-millisecond precision directly matching external CV camera frame intervals.",
            software: "Experiencing kernel-level queue delays and input lag due to background OS scheduler contention."
          }
        ]
      }
    },
    specs: {
      badge: "PRODUCT MECHANICS",
      title: "Conceptual Design FAQ",
      faqs: [
        {
          q: "Why is a physical hardware connection required to bypass Vanguard or EAC?",
          a: "Virtual injection software installs API hooks (like SendInput) or signs custom virtual drivers inside deep operating system memory. Prominent kernel anti-cheats (including Valorant's Vanguard and Apex/Fortnite's Easy Anti-Cheat) inspect these system layers and block simulated peripheral reports entirely. By pushing targeting coordinates off-system to a separate physical computer, our bridge communicates strictly via genuine hardware mouse reports, completely avoiding software driver checks."
        },
        {
          q: "Can this system integrate directly with DMA (Direct Memory Access) setups?",
          a: "Yes. Anthe is the gold-standard hardware solution to couple with high-performance DMA platforms. If you read game memories directly using an external FPGA chip, you can pipe your target-locking curves over a local network directly to the Anthe receiver PC, keeping all executable math fully air-gapped from the gaming rig."
        },
        {
          q: "Does this support neural network AI aimbots or Computer Vision detectors?",
          a: "Absolutely. External tensor pipelines and computer vision (CV) object detectors running on secondary machine feeds can transmit real-time relative coordinate offsets across the networking socket. Anthe instantly packetizes and feeds these artificial vectors directly over physical Bluetooth, ensuring seamless, undetectable targeting."
        },
        {
          q: "Why is a secondary PC setup safer than running local bypass software?",
          a: "Local bypass scripts run as processes on the gaming computer, subjecting them to heuristic process trees, pattern matching, and memory scans. A true dual-PC bridge leaves zero executable footprint on the device running the anti-cheat software, offering unparalleled security from scans."
        }
      ]
    },
    tutorials: {
      badge: "DOCUMENTATION & SUPPORT",
      title: "Official Documentation",
      desc: "Complete setup walk-through and interactive troubleshooting portal for the Anthe physical digital bridge.",
      phasesTitle: "GUIDE PHASES",
      prepTitle: "Important Prep Work",
      prepDesc: "Please ensure you review files and copy down any required software scripts beforehand to avoid connectivity interruptions.",
      needTitle: "You will need:",
      usbTitle: "Flash Drive",
      usbDesc: "A USB flash drive (16GB or larger is highly recommended). Note: This process will erase everything currently on the USB drive, so backup any files on it first.",
      pc2Title: "Second PC",
      pc2Desc: "Your second PC (the one you want to run Linux on) to host the independent translation bridge.",
      winTitle: "Prep Computer",
      winDesc: "Any working computer used to prepare the USB drive for the bridge.",
      phases: {
        prereqs: {
          title: "Prerequisites",
          short: "Prerequisites",
          desc: "Prepare the required hardware and workspace before beginning."
        },
        phase1: {
          title: "Phase 1: Downloading the Software",
          short: "Phase 1: Downloads",
          desc: "Download the mandatory operating system image and preparation software.",
          intro: "On your standard PC, download these two free files:",
          osLabel: "OS ISO Image",
          osTitle: "Ubuntu Linux ISO",
          osDesc: "Go to the official Ubuntu download page and download the desktop version of Ubuntu 24.04 LTS (it will download a single large file ending in .iso).",
          toolLabel: "Flashing Tool",
          toolTitle: "Rufus Utility",
          toolDesc: "Go to the official Rufus website and download the portable version (a small program used to write the ISO to your USB)."
        },
        phase2: {
          title: "Phase 2: Creating the Bootable USB with \"Persistence\"",
          short: "Phase 2: Setup USB",
          desc: "Configure standard Rufus specifications with private secure persistent partitions.",
          whatIs: "What is Persistence?",
          whatIsDesc: "By default, running Linux from a USB is like using a library computer—any files you save or settings you change are wiped when you turn it off. Enabling Persistence creates a private storage space on the USB so it remembers your files and installations.",
          steps: [
            "Plug your USB drive into your PC.",
            "Open Rufus.",
            "Device: Ensure your USB drive is selected in the top dropdown menu.",
            "Boot selection: Click the SELECT button on the right, navigate to your downloads, and select the Ubuntu .iso file you downloaded.",
            "Persistent partition size: You will see a slider appear. Drag this slider to the right to allocate at least 4 GB to 8 GB (or more, if your USB drive is large).",
            "Leave all other settings at their defaults.",
            "Click Start at the bottom.",
            "If prompted to download additional files (like Syslinux), click Yes/OK.",
            "If asked to write in ISO or DD image mode, select \"Write in ISO Image mode\" (recommended).",
            "A warning will appear stating that all data on the USB will be destroyed. Click OK.",
            "Wait for the green progress bar to reach 100% and say \"READY\"."
          ]
        },
        phase3: {
          title: "Phase 3: Adding Your Project Files",
          short: "Phase 3: Copy Files",
          desc: "Inject your emulator software and microcode utilities directly onto the flash directory.",
          intro: "Follow these instructions to move project scripts into the flash storage partition:",
          steps: [
            "Keep your USB plugged into the PC.",
            "Open your File Explorer and click on your USB drive (it may be named \"Ubuntu\" or similar).",
            "Create a new folder on the USB drive and name it accessibility-project.",
            "Copy the linux-hid-emulator folder (the one containing your setup.sh and Python files) and paste it inside this new accessibility-project folder.",
            "Safely eject the USB drive from your PC."
          ]
        },
        phase4: {
          title: "Phase 4: Booting into Ubuntu",
          short: "Phase 4: Boot OS",
          desc: "Restart your secondary target computer and enter BIOS or boot navigation setups.",
          intro: "Now, move to your second PC (the one that will run the emulator). Follow these sequence controls:",
          steps: [
            "Ensure the second PC is completely turned off.",
            "Plug your prepared USB drive into one of its USB ports.",
            "Turn the PC on, and immediately begin tapping your PC's Boot Menu key repeatedly (about twice a second) until a menu appears.",
            "The Boot Menu key varies by computer manufacturer. Common keys are: \n• F12: Dell, Lenovo, Gigabyte, Acer\n• F11: MSI, AsRock\n• F12 or Esc: HP\n• F8: ASUS",
            "A menu will appear listing your storage drives. Use your keyboard's arrow keys to select your USB drive (it might say \"UEFI: [Your USB Brand]\" or \"USB Storage Device\") and press Enter."
          ]
        },
        phase5: {
          title: "Phase 5: Navigating the Linux Desktop Safely",
          short: "Phase 5: Safe Desktop",
          desc: "Navigate the active desktop safely inside modular trial memory partitions.",
          warningTitle: "CRITICAL SAFETY WARNING",
          warningDesc1: "When the screen loads, you will see options to \"Try Ubuntu\" or \"Install Ubuntu\".",
          warningDesc2: "ALWAYS select \"Try Ubuntu\" (or \"Try or Install Ubuntu\" and then select the \"Try\" environment).",
          warningDesc3: "NEVER double-click the \"Install Ubuntu\" shortcut on the desktop. Running the installer can erase your native OS and your files. Operating in \"Try\" mode keeps everything completely safe.",
          steps: [
            "Once the system boots, select your language and keyboard layout.",
            "When presented with the desktop, you are now running Linux safely from your USB."
          ]
        }
      },
      prev: "PREVIOUS PHASE",
      next: "NEXT PHASE",
      phaseCounter: "Phase {current} of {total}"
    },
    shop: {
      badge: "ACQUISITION PORTAL",
      title: "Choose Your Setup Tier",
      desc: "Instant delivery. No hardware shipping times, no physical boundaries. Take full control of physical injection setups instantly.",
      checkout: "CHECKOUT NOW",
      currency: "USD",
      lifetime: "Lifetime License",
      featuresTitle: "Included Features",
      comparisons: {
        tag: "HARDWARE ALTERNATIVES VS DIGITAL BRIDGE",
        title: "How Anthe Compares",
        desc: "Standard hardware injection boards like KmBox or Makcu introduce expensive shipping delays, microcode flashing complexity, and physical points of vulnerability. Anthe modernizes this workflow entirely over a local network.",
        metricsHeader: "Metrics & Attributes",
        antheCol: "Anthe (Software Solution)",
        badgeDigital: "DIGITAL BRIDGE",
        rows: [
          {
            metric: "Core Pricing",
            anthe: "$15 USD / Lifetime",
            kmbox: "$45 – $80 USD + Shipping",
            makcu: "$35 – $60 USD + Shipping"
          },
          {
            metric: "Setup Complexity",
            anthe: "Instantly routes over LAN in under 2 mins.",
            kmbox: "Complex. Heavy soldering, firmware flashing & physical cabling setup.",
            makcu: "Requires specialized drivers, flashing routines & custom wiring."
          },
          {
            metric: "Bypass Delivery Mode",
            anthe: "Emulates genuine Bluetooth HID protocols.",
            kmbox: "Injects via physical dual-USB controller hardware.",
            makcu: "Relies on custom serial-over-USB endpoints."
          },
          {
            metric: "Signature Detection Risk",
            anthe: "Zero. Completely driverless on target gaming host.",
            kmbox: "Low-Medium. USB hardware descriptors are inspectable.",
            makcu: "Medium. Serial interface PID/VID require manual masking."
          }
        ]
      }
    },
    terms: {
      badge: "LEGAL COMPLIANCE UK",
      title: "Terms & Conditions",
      subtitle: "Last Updated: June 20, 2026. Governed by UK Consumer Protection Legislation, including the Consumer Rights Act 2015.",
      calloutTitle: "UK Consumer Protection Framework",
      calloutDesc: "This contract governs your purchase of the Anthe digital license. In accordance with the Consumer Rights Act 2015 and Consumer Contracts Regulations 2013, this framework protects your rights relating to satisfactory quality, description, and digital cancellations.",
      rightsTitle: "Your Statutory Rights",
      rightsItems: [
        "Satisfactory Quality: Your licensed software must work as described and remain fit for its specified purpose.",
        "Right to Repair/Replacement: If raw bugs limit functional execution, we will deliver regular system updates.",
        "Early Consent Waiver: Digital downloads begin immediately upon purchase, waiving standard 14-day automatic cooldown rights."
      ],
      sections: [
        {
          num: "1.",
          title: "Information About Us",
          desc: "The Anthe digital platform, license delivery system, and related setup.sh files (collectively, the \"Software\" or \"Service\") are operated by Anthe Digital Systems Ltd. (\"we\", \"us\", or \"our\")."
        },
        {
          num: "2.",
          title: "Your Status & Eligibility",
          desc: "By placing an order through our shop portal, you warrant that you are legally capable of entering into binding contracts under UK law and are at least 18 years of age. You agree that you are purchasing the software utility solely for private personal or auxiliary accessibility use."
        },
        {
          num: "3.",
          title: "Supply of Digital Content (Consumer Rights Act 2015)",
          desc: "Under the Consumer Rights Act 2015, we are under a legal duty to supply digital content that is in conformity with this contract: Satisfactory quality (reaching standards a reasonable person expects); Fit for a particular purpose (serving the specified bridging task over local network sockets); and As described (conforming exactly to specs and walk-throughs published here)."
        },
        {
          num: "4.",
          title: "Immediate Delivery & Cancellation Rights Waiver",
          desc: "Standard UK consumer regulations (under the Consumer Contracts Regulations 2013) typically allow consumers to change their mind and request refunds within 14 days of purchase. By checking out and purchasing our perpetual license key, you give your express consent to begin digital product provisioning immediately, waiving your statutory 14-day right of withdrawal completely."
        },
        {
          num: "5.",
          title: "Bug Tracking, Repairs & Replacements",
          desc: "If the digital content does not meet the satisfactory standards (e.g., core socket compiler crashes), you have the right to request repairs or replacements. If not resolved within a reasonable time, you are entitled to modular price reductions or a full refund."
        },
        {
          num: "6.",
          title: "Limitation of Liability (UK Standards)",
          desc: "Nothing in these Terms limits liability for fraud or death resulting from negligence. Otherwise, we assume no liability for indirect losses, commercial interruptions, account bans or hardware flags from your target third-party client integrations."
        },
        {
          num: "7.",
          title: "Governing Law & Jurisdiction",
          desc: "These terms and digital supply contracts are governed by the laws of England and Wales. Residing consumers inside Scotland or Northern Ireland reserve alternative paths inside local home jurisdictions."
        }
      ]
    },
    developer: {
      badge: "INTEGRATION GUIDES",
      title: "UDP Streaming Output Module Integration Guide",
      subtitle: "Stream raw relative hardware vectors securely over air-gapped network relays.",
      sec1Title: "1. Architectural Overview & Value Proposition",
      sec1Paragraph1: "In aimbot contexts, installing custom kernel-level drivers or complex agent software on a target host PC is often impossible due to IT security policies, compatibility issues, or lack of administrative privileges.",
      sec1Paragraph2: "To bypass these hurdles, this system employs a hardware-in-the-loop (HIL) emulation model:",
      step1Title: "Step 1 — Source",
      step1Host: "Target Aim/AI Logic",
      step1Desc: "Captures aimbot inputs and streams relative coordinate deltas and button states as low-latency, low-overhead UDP packets over a local network.",
      step2Title: "Step 2 — Bridge",
      step2Host: "Linux Receiver",
      step2Desc: "Runs a background emulator service that listens on a dedicated UDP port. It receives the UDP coordinates, aggregates them, and transmits them to a target host device as standard Bluetooth HID reports.",
      step3Title: "Step 3 — Output",
      step3Host: "Target Device",
      step3Desc: "Receives the mouse input over native Bluetooth. Because the Linux emulator presents itself as a standard plug-and-play Bluetooth mouse, zero installation, configuration, or special drivers are required on the target device. It is universally compatible with macOS, Linux, and gaming consoles.",
      sysFlow: "System Flow",
      srcNode: "Source Node (Aimbot App)",
      bridgeNode: "Hardware Emulator Bridge",
      targetNode: "Console/Host Output Target",
      udpStream: "UDP Stream (Port 5555 / 7-byte packets)",
      btStream: "Bluetooth HID (Standard Mouse Protocol)",
      targetDesc: "PC, Console, etc.",
      sec2RoutingTitle: "2. Connectionless UDP Network Routing",
      sec2RoutingDesc: "Because the transmission protocol utilizes UDP (User Datagram Protocol), there is no stateful, connection-oriented handshake (such as TCP) between the Aimbot/Host and the Linux receiver. Instead, the network communication is established as follows:",
      routingStep1Title: "1. Receiver Binding",
      routingStep1Desc: "The receiver listens on a designated port (e.g., 5555) bound to the wildcard IPv4 interface (0.0.0.0) to accept packets from any valid network source.",
      routingStep2Title: "2. Client Addressing",
      routingStep2Desc: "The client application does not perform a connection handshake. It instantiates a standard UDP socket and sends datagrams directly to the specific local IPv4 address of the Linux receiver (for example, 192.168.1.100) and the designated port (for example, 5555).",
      routingStep3Title: "3. Low-Latency Transmission",
      routingStep3Desc: "The client transmits raw packets directly to the destination socket. To prevent blocking the main application thread (e.g., mouse hooks or eye-tracker update loops), the client socket should be configured in non-blocking mode.",
      sec2Title: "3. Custom UDP Payload Specification",
      sec2Desc: "To minimize network overhead, transport latency, and processing jitter, the protocol uses a fixed-size, packed binary structure of exactly 7 bytes. Multi-byte integers (dx and dy) MUST be serialized in little-endian (LE) byte order to match the receiver's structural parsing schema.",
      colOffset: "Offset (Bytes)",
      colSize: "Size",
      colField: "Field Name",
      colType: "Data Type",
      colDesc: "Description/Constraints",
      rowMagic: "Frame synchronization sentinel. Must be exactly 0xAB.",
      rowDx: "Signed relative X movement (negative: left, positive: right).",
      rowDy: "Signed relative Y movement (negative: up, positive: down).",
      rowButtons: "Bitmask representing current state of the mouse buttons.",
      rowSeq: "Rolling sequence number (0–255), incremented per packet.",
      bitmaskTitle: "Button Bitmask Fields (Byte Offset 5)",
      leftClick: "Left Mouse Button (Pressed when 1, Released when 0)",
      rightClick: "Right Mouse Button (Pressed when 1, Released when 0)",
      middleClick: "Middle Mouse Button (Pressed when 1, Released when 0)",
      sec3Title: "4. Integration Templates",
      sec3Desc: "Below are code templates in C#/.NET, C++, and Python showing how to establish a socket targeting a Linux receiver at IPv4 address 192.168.1.100 and port 5555.",
      copyBtn: "Copy template",
      copiedBtn: "Copied!"
    }
  },
  zh: {
    nav: {
      overview: "项目概述",
      faq: "概念性常见解答",
      tutorials: "使用文档",
      developer: "开发者集成",
      shop: "商店订阅",
      terms: "条款与条例"
    },
    footer: {
      rights: "版权所有",
      audit: "安全审计完毕。符合英国 2015 年《消费者权利法案》。"
    },
    overview: {
      marqueeTitle: "生态与技术深度协作伙伴",
      slogan: "无障碍与辅助技术桥梁",
      pill: "硬件在环辅助解决方案",
      mainTitle: "网络至蓝牙数字桥接",
      mainDesc: "Anthe 是一款高精度、无感的物理信号桥接系统，专为在安全隔离的局域网（LAN）间传输和分发精准控制信号而设计。通过在硬件物理层将输入指令转化为标准的、完全合规且具备真实签名信息的蓝牙鼠标包报告，Anthe 为双输入协同操作以及高级无障碍辅助操作提供了极为顺畅、无时延的控制。主游戏主机无需部署任何本地辅助驱动、流式工具或内核钩子，实现真正的非侵入、无特征设计。",
      ctaStart: "开始配置教程",
      ctaShop: "查看订阅方案",
      stats: {
        latency: "<1ms 延迟",
        latencyDesc: "通过标准本地局域网套接字",
        conn: "无线与以太网",
        connDesc: "完全物理隔离的鼠标转发",
        footprint: "0% 系统占用",
        footprintDesc: "在目标游戏主机上无需任何驱动"
      },
      parts: {
        sectionTitle: "活跃数据流架构",
        title: "双机物理层设计",
        desc: "互动式转换拓扑。鼠标坐标或 AI 控制流通过标准 UDP 协议向前转发，独立进行数据封装，最后像纯硬件一般广播为真正符合规范的 HID 包。",
        pc1Title: "主游戏终端 (PC/主机)",
        pc1Desc: "运行您主力游戏或常规业务的目标主机终端。",
        pc1Rec: "得益于桥接端原生的蓝牙协议转化发射特性，即使主控游戏环境不需要也无法安装任何客户前置转发软件，它依然能完美无忧地支持任意接收设备。",
        pc2Title: "次级桥接设备 (任意电脑/电脑棒/树莓派)",
        pc2Desc: "小型次的独立电脑，负责接收主端发来的网络报文并翻译为标准的物理/硬件层级 HID 鼠标控制指令，形成真正的空隙隔离物理桥接。",
        pc2Rec: "完全自主运行。非常适合作为接收来自 DMA（直接内存访问）板卡或计算机视觉模型输出的最终模拟物理注入点。"
      },
      parameters: [
        {
          key: "轻松绕过现代反作弊系统",
          val: "完美规避如 Vanguard、Easy Anti-Cheat (EAC) 和 BattlEye 等内核级别的主动扫描防护。因为传统软件层面的虚拟输入驱动常常直接被限制启动，Anthe 从硬件层面发送标准指令，目标主机上没有留下任何特征码或未知软件句柄。"
        },
        {
          key: "DMA / AI 瞄准绝佳伴侣",
          val: "这是极客圈针对 DMA (直接内存访问) 读写卡与外部计算机视觉 (CV) 辅助推理的黄金注入手段。它充当神经网络运算的目标向量物理输入终端，把所有辅助算法及坐标修正全部隔绝在主游戏机内存空间之外。"
        },
        {
          key: "100% 物理蓝牙报告率",
          val: "对游戏电脑而言，Anthe 表现为一个百分之百标准的市售蓝牙外设。所有轨迹向量即时解算并被编码为蓝牙 HID 动作帧，控制丝滑如水，不会有任何驱动异常和安全弹窗。"
        },
        {
          key: "双人协导融合控制 (Co-Pilot)",
          val: "支持多重输入智能融合重叠。它可以在亚毫秒级内，将 AI 算法产生的小幅度微调向量与您本身手部真实的挪动修正进行高速相加编码，产生如同人类自然操作的物理曲线。"
        }
      ],
      comps: {
        title: "传统纯软件驱动 vs. Anthe 物理数字桥接",
        headers: {
          metric: "对比维度与指标",
          anthe: "Anthe 物理数字桥接",
          software: "传统本地软件注入"
        },
        rows: [
          {
            feature: "作弊检测防范度 (Vanguard/EAC 等)",
            bridge: "100% 安全规避。信号在接收端电脑被表现为纯粹正常市售蓝牙鼠标的硬件控制发包。",
            software: "极高风险。容易因涉及 SendInput 钩子或未签名测试虚拟驱动而在游戏启动时被直接拦截甚至封号。"
          },
          {
            feature: "主系统内存特征残留",
            bridge: "主电脑上无任何控制库常驻，计算完全依靠二次桥接环境。特别适合空隙隔离的作弊分析和物理过滤。",
            software: "必须在系统内留存正在运行的程序和通信数据检测特征，极易被反作弊检测内核扫描、启发式算法或者特征扫描直接定位。"
          },
          {
            feature: "AI / 神经网络模型低延迟优化",
            bridge: "输入帧精确对应外置摄像头或读取画面的采样周期，亚毫秒级同步传输写入硬件缓冲区。",
            software: "由于操作系统（OS）调度负荷与多线程挤兑，容易在内核输入排队中造成几十毫秒的明显波动与迟滞。"
          }
        ]
      }
    },
    specs: {
      badge: "产品底盘技术",
      title: "概念设计常见解答",
      faqs: [
        {
          q: "为什么绕过 Vanguard 或 EAC 需要这套专门的物理硬件连接？",
          a: "传统的虚拟控制技术大都在系统深处安装 API 钩子（如 SendInput）或采用自签名虚拟总线驱动。如今主流的内核反作弊模块（如 Valorant 的 Vanguard，以及 Apex/Fortnite 所用 EAC）会深入检查并直接拦截这些模拟调用。通过把算法生成坐标通过外置局域网甩到另一台物理实体电脑上处理，由于游戏主机接收到的是实体主板收发模块的数据包，系统会将它视为人类手动硬件控制，彻底切断了被软件驱动轮询的风险。"
        },
        {
          q: "这一系统是否能直接配合 DMA (直接内存访问) 硬件使用？",
          a: "完全可以。Anthe 是完美辅佐高频 DMA 硬件板卡的不二之选。在您通过外部 FPGA 网卡芯片直接透传游戏内存数据的同时，目标计算轨迹可经由局域网流向您的 Anthe 信号网桥节点执，所有的输入解算与底层逻辑绝不在游戏系统内停留半步。"
        },
        {
          q: "它是否能支持各种自训练的卷积神经网络 (CV) 辅助和视觉模型？",
          a: "当然支持。次级接收主机所接收的信息仅是纯粹的物理像素偏移。您可在分流机或者主控边缘节点部署摄像头或推流画面进行模型推理，得出的实时相对坐标向量经由网络端口分发，Anthe 会瞬间在硬件级蓝牙上打包投递完毕。"
        },
        {
          q: "为何双电脑桥接形式会比运行本地虚拟化的绕过软件更令人放心？",
          a: "本地绕过软件本质上仍是宿主机运行的进程。即便在底层隐藏了进程，也难免会因非正常的句柄依赖、驱动过滤链或者特征断点而被发现。双机物理网桥从根源上终结了游戏系统内的一切行为痕迹，为持久运行提供了真正放心的硬件安全隔离。"
        }
      ]
    },
    tutorials: {
      badge: "配置与使用文档",
      title: "官方系统文档",
      desc: "集成了完整的安装指南与交互式设备故障排查体系，确保数字硬件桥接能保持高可用与稳定传输。",
      phasesTitle: "向导阶段",
      prepTitle: "预备步骤与提示",
      prepDesc: "请在开始前充分阅读完配置文件并下载备份执行脚本，以免在切换外置环境时由于本地断网而无法获取项目代码。",
      needTitle: "您需要准备的：",
      usbTitle: "快闪 U 盘",
      usbDesc: "建议使用规格在 16GB 或以上的 U 盘。注意：此流程会清除该 U 盘里的所有原生数据，请在开始前确保将里面重要的数据文件备份到别处。",
      pc2Title: "次级桥接端电脑",
      pc2Desc: "您的另一台闲置电脑（您将要在此机器上运行独立 Linux 系统，用于承载物理控制模拟逻辑）。",
      winTitle: "刷写用 PC 端",
      winDesc: "一台用于下载镜像并写入到上述 U 盘里的任意电脑。",
      phases: {
        prereqs: {
          title: "开始前的要求",
          short: "前置条件",
          desc: "在开始安装流程之前，准备好所有的实体周边零配件及操作区域。"
        },
        phase1: {
          title: "第一阶段：下载所需程序",
          short: "阶段 1: 下载文件",
          desc: "获取专门轻量化定制的底层操作系统映像与启动媒介配置辅助软件。",
          intro: "在您的任意可用电脑上，请提前获取此二者开源、无毒的免费项目：",
          osLabel: "系统 ISO 镜像",
          osTitle: "Ubuntu Linux ISO",
          osDesc: "访问 Ubuntu 官方分发页，下载桌面端长期支持版本 Ubuntu 24.04 LTS (下载结果将是一个包含几吉字节的以 .iso 结尾的大文件)。",
          toolLabel: "优盘烧录工具",
          toolTitle: "Rufus 实用工具",
          toolDesc: "访问 Rufus 官方站点，下载便携绿色版 (该便携管理工具可以省去安装步骤，用来直接将刚才的 ISO 写入 U 盘启动媒介)。"
        },
        phase2: {
          title: "第二阶段：制作包含「持久分区」的专属系统盘",
          short: "阶段 2: 制作 U 盘",
          desc: "利用 Rufus 自定义工具，划分出具备私人隔离、持久不变的数据块目录。",
          whatIs: "什么是持久分区技术？ (Persistence)",
          whatIsDesc: "默认情况下，如果普通方式直接刻录 Linux U 盘系统，由于系统是只读介质，您重启机器之后下载的代码和保存的重要参数全部都会丢失。启用持久化空间可以在您的优盘上开辟出一块专用私人读写存储空间，确保任何软件依赖安装和调试完毕的文件均可以被终身保留。",
          steps: [
            "将您的 U 盘插入您的空余电脑上。",
            "双击运行刚下载好的 Rufus 工具。",
            "设备选项：在最上方的设备选择列表内，请二次核验选中刚才刚插入的 U 盘盘符。",
            "引导类型：点击中右方醒目的「选择」按钮，选择并打开刚下好的那个大版 Ubuntu .iso 镜像文件。",
            "持久分区大小 slider：进度条上方此时会自动弹出此滑轨。请将这根滑轨手动拖拉，分配 4 GB 到 8 GB 及以上 (根据您的 U 盘剩余空间自行衡量，优盘富余越大越好)。",
            "其余选项：其余设置项均可以维持原厂推荐默认值，不加更改。",
            "点击下方最中心的「开始」按钮。",
            "如果软件中途提醒是否要补充下载 Syslinux 等插件，请无条件点击「是/允许/确定」。",
            "当询问刻录模式是 ISO 还是 DD 输入时，选择默认为您勾选的「以 ISO 镜像模式写入 (推荐)」并继续。",
            "Rufus 此时会弹窗警告所有盘符现有文件将被执行毁灭性清除重置。直接大方地确认「确定/OK」即可。",
            "安心静候底部的绿底加载走条抵达 100% 出现「准备就绪」字样。"
          ]
        },
        phase3: {
          title: "第三阶段：注入项目源文件",
          short: "阶段 3: 导入文件",
          desc: "将我们的模拟器控制脚本与前置配置工具链，拷入刚刚做好的系统引导区。",
          intro: "按以下细节指引把相关代码平滑灌入对应的 U 盘目录路径下：",
          steps: [
            "此时请继续保持当前的 U 盘插在电脑接口上。",
            "展开您的资源管理器或者电脑管理页，此时能看到一个名为 UBUNTU 等字样的最新外置媒体分区盘符，双击点击进去。",
            "在根目录下，右键「新建文件夹」，将其正式命名为：accessibility-project 。",
            "在您的环境里复制我们的 linux-hid-emulator 文件夹 (确保内含完整的 setup.sh 核心安装脚本和各种 Python 输入映射文件)，并将其完好地粘贴存放在这个全新的 accessibility-project 分区目录内。",
            "安全地「弹出」外置介质并拔出该 U 盘。"
          ]
        },
        phase4: {
          title: "第四阶段：进入 Ubuntu 系统的物理引导",
          short: "阶段 4: 双机启动",
          desc: "重启你的第二台接收网桥主机，并手动点击进入硬件底层的 BIOS 盘符路由菜单。",
          intro: "到此处起，移动至您准备好的第二台多余电脑 (即具体用来跑模拟器桥架的机型)。依次完成如下配置：",
          steps: [
            "事先确信第二台设备已经是完全彻底关机下线状态。",
            "将带有项目的 U 盘直接插入其任意一个通电工作的物理 USB 端口上。",
            "按下开机键，并在电脑一亮起或主板出现厂牌标志时，立即高频连续地敲击特定主板在底层设置的「Boot Menu」热键 (一般建议一秒两到三次)，直到成功召唤出深蓝底色的设备引导列表。",
            "不同电脑厂牌对应的 Boot Menu 实键有些许差别。行业内通常使用的默认为：\n• F12: 戴尔 (Dell), 联想 (Lenovo), 技嘉 (Gigabyte), 宏碁 (Acer)\n• F11: 微星 (MSI), 华擎 (AsRock)\n• F12 或者是 Esc 键: 惠普 (HP)\n• F8: 华硕 (ASUS) 玩家国度系列",
            "列表弹窗中可用您键盘的上下箭头操作，精准锁定高亮您制作的那个 U 盘 (可能表现为「UEFI: [对应优盘商标]」或直接是「USB Storage Device」等)，重重回车 Enter 启动。"
          ]
        },
        phase5: {
          title: "第五阶段：安全平稳地熟悉并使用 Linux 系统桌面",
          short: "阶段 5: 安全操作",
          desc: "在沙盒模式的试用体验空间里完美运作，保护既有的系统免受篡改与破坏。",
          warningTitle: "极致安全警示（极其重要）",
          warningDesc1: "在系统载入主屏幕后，屏幕上会出现「Try Ubuntu (试用 Ubuntu)」或「Install Ubuntu (安装 Ubuntu/极速安装)」两个极度相似的分支大图标。",
          warningDesc2: "在任何时候、任何前提下，必须恒定地点击选中： 「Try Ubuntu (试用 Ubuntu)」 (或选中「Try or Install」双重分支大菜单，进去后在其内确认使用「Try」试用体验空间)！",
          warningDesc3: "绝对不要去双击或者去运行桌面上名为「Install Ubuntu 24.04」的系统实体安装捷径！错误的安装可能会把您的硬盘全数清空甚至干掉您原生的磁盘系统。而在「Try」沙盒状态下，它是运行在物理隔离的内存储备上的，不管你怎么折腾，都百分之百不会伤及您的系统或文件！",
          steps: [
            "系统流畅引导到桌面后，根据向导依次简单选择您日常习用语言、以及偏爱的手部键盘排布标准。",
            "当系统最终铺展出纯净、清新的橘粉色官方桌面壁纸时，说明您已经成功、无毒、放心地通过优盘物理把这台机器带入至安全的 Linux 环境中，无懈可击！"
          ]
        }
      },
      prev: "返回上个阶段",
      next: "前往下个阶段",
      phaseCounter: "第 {current} 阶段 / 共 {total} 阶段"
    },
    shop: {
      badge: "授权许可开通门户",
      title: "选择适合您的部署级别",
      desc: "拍下后在线极速自动出卡。不设置任何实体物流关卡。随时随地，即刻将您的双PC和DMA系统引渡至顶格的蓝牙仿真时代。",
      checkout: "立即购买并提卡",
      currency: "元",
      lifetime: "终身商业永久授权",
      featuresTitle: "尊享专属技术包含：",
      comparisons: {
        tag: "实体协议外设 vs. 网络软桥接",
        title: "与其他硬件产品的数据较量",
        desc: "KmBox、Makcu 等传统的单片机实体发包控制板不仅需要昂贵的境外运费甚至排队缺货，更伴随着高难度的自定义固件刷写、电烙铁焊接、繁杂的高频排线以及被游戏厂商针对性反制签名物理 PID 的劣势。Anthe 顺应浪潮，通过创新的内网加密软网桥实现完全革新。",
        metricsHeader: "衡量维度与各模块能力",
        antheCol: "Anthe (网桥版软转发方案)",
        badgeDigital: "现代数字软桥接",
        rows: [
          {
            metric: "起步入门售价",
            anthe: "$15 美金 / 激活即终身享用",
            kmbox: "折合 300 - 550 元 + 自备运费/溢价购买"
          },
          {
            metric: "组装和连线复杂程度",
            anthe: "在同个内网或网线下，2 分钟内即刻接通，无需硬件接插。",
            kmbox: "极为琐碎艰深。需要手工焊接各排线，折腾二次固件烧录代码及双网卡分配。",
            makcu: "容易受限于私服硬件供应商的封闭驱动及特定接驳端口限制。"
          },
          {
            metric: "过检测和信号伪装形态",
            anthe: "接收机蓝牙直接发射原汁原味的正版底层 Bluetooth HID 外设框架信号。",
            kmbox: "通过物理单片机拦截两个 USB 口之间物理连接的数据帧实现转发。",
            makcu: "严重依赖私有 USB 虚拟串口底层驱动，暴露在可疑端点名单。 "
          },
          {
            metric: "物理硬件码及防封安全性",
            anthe: "100% 毫无硬件破绽。由于主游戏机端不加载任何软件和未知外设，仅接受备用机发来的完全真实无线蓝牙脉冲。",
            kmbox: "偏低。USB 硬件描述符由固件脚本直接写入，若伪装固件过时极易被官方批量锁定硬件封号。",
            makcu: "一般风险。虚拟外设的 PID/VID 如果未人工修改，几乎必定被内核反作弊直接侦测并在加载前封禁。"
          }
        ]
      }
    },
    terms: {
      badge: "合规与法律条款",
      title: "条款与使用协议",
      subtitle: "更新时间：2026年6月20日。受联合王国（英国）消费者保护法案（包括2015年《消费者权利法案》）严格管辖。",
      calloutTitle: "英国消费者法律权益保障框架",
      calloutDesc: "本电子销售契意管辖您购买 Anthe 数字永久密钥的消费行为。依据英国 2015《消费者权利法案 (CRA 2015)》与 2013《消费者合同规程 (CCR 2013)》，我们将保障关于数字产品内容质量合格、相符性描述以及在数字化退款机制等方面的最低法定权益。",
      rightsTitle: "您的消费者法定特权 (UK Statutory Rights)",
      rightsItems: [
        "合格品质保证：所购买并部署的软件应在各项使用说明 and 介绍中，展示合格的运行一贯性并完全符合所述功能。",
        "修补更新保障：若底层系统在兼容性层出现核心功能失准，我们将提供迭代更新版本或提供有效的运行补丁。",
        "数字不退回豁免声明：由于数字在线交付发卡形式的特殊性：一旦您确认在收银台付款、向您系统屏幕生成或通过预留邮箱下发该许可凭证（即商品已被执行了最初步的消费供应），则即表明您自愿行使同意权并完全放弃或免除标准的法定制冷撤单退款权利，以便您能第一时间顺畅获取服务。"
      ],
      sections: [
        {
          num: "1.",
          title: "我们的运营实体",
          desc: "Anthe 数字服务系统、安装执行包以及附属配置项（统称“本软件”或“服务”）由 Anthe Digital Systems Ltd.（以下统称“我们”或“本公司”）独立持有并合法运营。"
        },
        {
          num: "2.",
          title: "购买者契约和资质要求",
          desc: "在通过我们的商店购买时，您向我们明确担保您具备充分契约能力并在所属地完全成年（通常在英国应年满 18 周岁）。您必须确认您对此辅助系统的部署完全是私人、非商业及属于无障碍辅助的用途。"
        },
        {
          num: "3.",
          title: "数字内容品质履行义务 (Consumer Rights Act 2015)",
          desc: "依据 2015 法定消费者法，对于本系统数字授权的品质与相符性，我们向您担保：品质满意度达到常人所预期的公允、描述与交付状态下的性能完全合理；在限定功能目的内（通过网桥以真实硬件蓝牙的形式模拟输出轨迹），该辅助软件具有应有能力；所呈示之架构、技术标准，与我们在本页面详细罗列展示的书面介绍、视频与教程等，保持高水准吻合一致。"
        },
        {
          num: "4.",
          title: "关于数字发卡立即履行以及法定反悔权自动放弃",
          desc: "通常在欧盟或英国（依据 2013 销售规程条例），消费者可无差别申请享有 14 天的犹豫冷却期。但基于数字在线交付发卡形式的特殊性：一旦您确认在收银台付款、向您系统屏幕生成或通过预留邮箱下发该许可凭证（即商品已被执行了最初步的消费供应），则即表明您自愿行使同意权并完全放弃或免除标准的法定制冷撤单退款权利，以便您能第一时间顺畅获取服务。"
        },
        {
          num: "5.",
          title: "缺陷补给追随制度",
          desc: "当您发现部署的数字脚本遇到严重崩溃、或者遇到无法规避的硬性不兼容 bug 以至于阻碍了在符合描述的前设下开通使用时，您有权及时向我们提出要求进行相应的代码纠正和在线协助。若我们未能在约定时间内改善该异常以致于让您依然根本无法享用正常内容，您将可以享受适当折扣甚至破例全额退款补偿。"
        },
        {
          num: "6.",
          title: "责任承担的豁免、划分与边界声明",
          desc: "本协议条款没有任何意图或形式用来限制本公司因自身故意疏忽所构成的损害、诈欺、或者根据英国普通法所明确不能规避或限制的其他欺压契约。但在其他限度内，本公司不承担任何业务关联产生的间接损失、偶发性收益损失或软硬件不当加载造成的系统风险。由于反作弊对抗属于持续性博弈行为，我们无法对您在第三方运行游戏时产生的账号异常、外设识别封锁提供无限度赔偿承诺。您部署辅助插件将自行对该结果承担首要独立責任。"
        },
        {
          num: "7.",
          title: "合同法律司法辖区",
          desc: "关于本合约的签署、订单履行与数字许可的相关解释，完好受英格兰与威尔士的普通法律管辖。然而，若您的主要居住地及常设消费者权益归属是在苏格兰、爱尔兰境内，您同样可行使诉权并诉诸于您的常任地方辖区法院裁决。"
        }
      ]
    },
    developer: {
      badge: "集成指引",
      title: "UDP 串流输出模块集成指南",
      subtitle: "通过安全、物理隔离的网络中继流式传输原始硬件相对矢量。",
      sec1Title: "1. 架构总览与核心价值",
      sec1Paragraph1: "在辅助场景中，由于 IT 安全策略、兼容性问题或反作弊系统的存在，在目标主机上安装自定义内核级驱动程序或复杂的客户端代理通常是极不安全的。",
      sec1Paragraph2: "该架构通过采用硬件在环（HIL）仿真模型克服了这些限制：",
      step1Title: "步骤 1 — 数据源",
      step1Host: "Aimbot 运算端应用",
      step1Desc: "捕获输入（例如帧）并通过低延迟 UDP 数据包输出相对坐标和按键状态。",
      step2Title: "步骤 2 — 中继桥",
      step2Host: "Linux 接收端",
      step2Desc: "运行在辅助设备上（树莓派/Linux 虚拟机），监听 UDP 帧并进行合并，模拟成标准的蓝牙 HID 鼠标。",
      step3Title: "步骤 3 — 接收端",
      step3Host: "目标计算机",
      step3Desc: "通过原生蓝牙接收鼠标指令。完全免安装驱动，在 Mac、Linux 或游戏机上即插即用。",
      sysFlow: "系统业务流",
      srcNode: "物理数据源节点 (Aimbot app)",
      bridgeNode: "硬件仿真中继桥",
      targetNode: "控制器/主机接收目标",
      udpStream: "UDP 串流 (端口 5555 / 7 字节封包)",
      btStream: "蓝牙 HID 协议 (标准鼠标协议)",
      targetDesc: "PC, Mac, 游戏主机等",
      sec2RoutingTitle: "2. 无连接 UDP 网络路由设计",
      sec2RoutingDesc: "由于传输协议使用 UDP（用户数据报协议），因此辅助逻辑运算应用和 Linux 接收端之间不存在像 TCP 这样的有状态、面向连接的握手。相反，网络通信按以下方式建立：",
      routingStep1Title: "1. 接收端端口绑定",
      routingStep1Desc: "接收端侦听绑定到通配符 IPv4 接口 (0.0.0.0) 的指定端口（例如 5555），以接受来自任何有效网络源的数据包。",
      routingStep2Title: "2. 客户端端点导向",
      routingStep2Desc: "客户端应用程序不执行“连接”握手。它实例化一个标准的 UDP 套接字，并将数据报直接发送到 Linux 接收端的特定本地 IPv4 地址（例如 192.168.1.100）和指定端口（例如 5555）。",
      routingStep3Title: "3. 超低延迟无阻传输",
      routingStep3Desc: "客户端将原始数据包直接传输到目标套接字。为了防止阻塞主应用线程（例如鼠标钩子或眼动仪更新循环），应将客户端套接字配置为非阻塞模式（Non-blocking）。",
      sec2Title: "3. 自定义 UDP 负载协议规范",
      sec2Desc: "为最大程度减少网络开销、传输延迟和抖动，本协议使用了 7 字节的固定大小、紧凑型二进制结构。多字节整数（dx 和 dy）必须以小端（Little-Endian）字节序进行序列化，以匹配接收端的解析格式。",
      colOffset: "偏移量 (字节)",
      colSize: "大小",
      colField: "字段名称",
      colType: "数据类型",
      colDesc: "说明/约束条件",
      rowMagic: "帧同步魔数。必须精确为 0xAB。",
      rowDx: "有符号相对 X 轴位移（负数：向左，正数：向右）。",
      rowDy: "有符号相对 Y 轴位移（负数：向上，正数：向下）。",
      rowButtons: "代表当前鼠标点击和按键状态的位掩码 (Bitmask)。",
      rowSeq: "滚动序列号 (0-255)，每个数据包递增。",
      bitmaskTitle: "按键位掩码字段细分 (偏移量为 5)",
      leftClick: "鼠标左键点击",
      rightClick: "鼠标右键点击",
      middleClick: "鼠标中键点击",
      sec3Title: "4. 客户端集成示例模板",
      sec3Desc: "可在客户端应用程序中直接采用的生产级异步套接字发送模板。高度优化，专为不阻塞主渲染线程设计。",
      copyBtn: "复制代码模板",
      copiedBtn: "已复制!"
    }
  },
  ja: {
    nav: {
      overview: "概要",
      faq: "よくある質問 (FAQ)",
      tutorials: "ドキュメント",
      developer: "開発者ガイド",
      shop: "ショップ",
      terms: "利用規約"
    },
    footer: {
      rights: "不許複製・禁無断転載",
      audit: "セキュリティ監査済み。英国 2015年消費者権利法に準拠。"
    },
    overview: {
      marqueeTitle: "パートナーシップ・技術共同連携",
      slogan: "アクセシブルかつアシスティブ・テクノロジー",
      pill: "ハードウェア・イン・ザ・ループ支援ソリューション",
      mainTitle: "ネットワーク-Bluetooth物理橋接ブリッジ",
      mainDesc: "Antheは、精密なバーチャル入力信号を安全かつ完全にエアギャップ（物理分離）されたローカルネットワーク上で転送できるように設計された、超低遅延で非侵入型の外付け中継ソリューションです。主PC側へドライバ、フック、特殊なエージェントソフトウェア等を一切インストールすることなく、入力信号を規格に準拠したBluetooth HIDマウスレポートへと変換します。これにより、アンチチートの監視フットプリントを完全に排除したセキュアなエイムアシスト、高精度アイトラッキング、人とマシンの円滑なコパイロット入力融合をもたらします。",
      ctaStart: "構築ガイドを開始する",
      ctaShop: "ライセンス料金プランをみる",
      stats: {
        latency: "1ms未満の遅延",
        latencyDesc: "ローカルのUDPネットワークソケット伝送経由",
        conn: "有線LAN・Wi-Fi接続",
        connDesc: "物理的に回路の分離したマウス転送ブリッジ",
        footprint: "0% ターゲット常駐",
        footprintDesc: "ターゲットゲームPC側でのドライバ導入は一切不要"
      },
      parts: {
        sectionTitle: "リアルタイム・データ通信のフロー構造",
        title: "デュアルPC物理ブリッジング・トポロジー",
        desc: "マウスクラスの座標データまたはAI移動補正ベクトルは、標準のUDPネットワークチャネルを介して高頻度で中継デバイスへと送信され、Bluetooth HID仕様規格の物理ワイヤレスパケットに最終デコードされます。",
        pc1Title: "プライマリPC（ゲーム動作本体等のホスト）",
        pc1Desc: "あなたが主力として普段利用しているターゲットとなるゲームPCやモニター画面のことです。",
        pc1Rec: "正規の物理Bluetoothデバイスとしてマウス信号を入力させるため、ゲーム用PC側に受信やパケット転送用といったエージェントソフト等を入れる必要がそもそも無くなり、クリーンで安全な状態を完全維持します。",
        pc2Title: "セカンダリ・ブリッジ（PC/小型PC/ラズベリーパイなど）",
        pc2Desc: "ネットワーク経由のベクトル入力を受信し、正規の物理マウス（HID規格）信号へとリアルタイムで解算・再エンコードする隔離デバイス。",
        pc2Rec: "完全に自立して動作。DMAシステムや外部ニューラルネットワーク画像センサなどから送り出される軌道補正を受け入れるための最適なハードウェアエントリポイントとして機能します。"
      },
      parameters: [
        {
          key: "最新の強力なアンチチートを完全に回避",
          val: "Vanguard、EAC (Easy Anti-Cheat)、BattlEye など、非常に厄介なカーネルレベルのアンチチートモジュールを完全にすり抜けます。従来のようなソフトウェアによる入力エミュレーションは直ちにブロック判定となりますが、Antheはハードウェア物理層に信号を直接ねじ込むため、ゲーム側にソフトウェア上のシグニチャを絶対に残しません。"
        },
        {
          key: "DMA / AI 補助エイムを完璧に統合",
          val: "DMA(直接メモリアクセス) ボードおよび高度なディープラーニング画像解析ボットを極限まで活用するための世界的ゴールドスタンダードです。座標移動の補正ターゲット決定ロジックをホストマシンのメモリ共有領域の外へ追い出し、安全な空隙（エアギャップ）を確保します。"
        },
        {
          key: "100% 準拠のリアルBluetoothデータフレーム",
          val: "ゲームホストPC側からは、市販されている正規規格のBluetoothマウスと一切区別がつきません。移動制御は純正のHID無線パケットへと落とし込まれるため、軌道補正の軌跡は極めてナチュラルに動作します。"
        },
        {
          key: "コパイロット・リアルタイム入力フュージョン",
          val: "人間が操作する物理マウスの修正軌道と、AIが目標値として弾き出した移動補正ベクトルを、受信機側のデバイス内でシームレスにブレンドして出力する、全く新しい人とマシンの協調制御機能です。"
        }
      ],
      comps: {
        title: "従前のエミュレーションツール vs. Anthe物理網橋方式",
        headers: {
          metric: "比較の項目とパフォーマンス",
          anthe: "Anthe 物理網橋ブリッジ",
          software: "従来型のコンピュータ内ソフトウェア仮想入力"
        },
        rows: [
          {
            feature: "主要作弊検出モジュール (Vanguard、EAC等) への耐性",
            bridge: "100% 回避。すべての信号は備え付けられた外付けモジュールからの100%安全かつ適法なハードウェア入力として処理されます。",
            software: "危険度大。キーボードの SendInput 呼び出しや、不完全な仮想ドライバ署名は、ゲーム側によって起動自体が阻止、または即時BANとなる対象です。"
          },
          {
            feature: "主PCシステム内のメモリ常駐フットプリント",
            bridge: "一切のプロセスがホスト側に常駐せず。外側のサブ環境で全ての演算処理を完了させる、極限の分離設計です。",
            software: "ゲームPC内で常に制御プログラムが稼働し続けるため、メモリ常駐部分が启发式分析（ヘリスティック）やシグニチャスキャンのターゲットにされます。"
          },
          {
            feature: "AI / 畳み込みモデル (CV) 応答安定性とタイムラグ",
            bridge: "カメラ転送周期などの外部サンプリングタイミングに亞ミリ秒精度で完全シンクロナイズドした割込パケット転送設計です。",
            software: "通常のデスクトップOS側のスレッド割当待機や、OSスケジューラ側の競合により、内核入力処理の待ち行列に数十ミリ秒のラグとジッタが生じます。"
          }
        ]
      }
    },
    specs: {
      badge: "製品底盤技術",
      title: "ハード技術のFAQ",
      faqs: [
        {
          q: "なぜ Vanguard や EAC などを回避するためにこの外付け双方向連携が必須なのですか？",
          a: "一般的なエミュレート用のソフトウェアは、API関数のフックや自署名された仮想バスを 深い層に無理やり割り当てます。Valorant独自の Vanguard および Apex/Fortnite が使っている Easy Anti-Cheat は常時こういったフック動作や不審なドライバを監視しブロックします。Anthe方式では、全ての座標の決定と演算は外部で済ませ、ゲーム用PCには正規のブルートゥースアンテナからデータを出力してやることで、検知の網を物理的に遮断します。"
        },
        {
          q: "この仕組は DMA (直接メモリ操作) デバイスと直結できますか？",
          a: "もちろんです。Antheは、DMAプラットフォームから送られるエイム調整計算を受け入れるのにこれ以上ないハードウェアです。FPGAカードで転送されたメモリデータから目標位置を高速処理したものを、LANを介してAnthe稼働のセカンダリPCにシームレスに伝達し、完全な隔離状態で狙いをアシストします。"
        },
        {
          q: "自作のディープラーニング(AI)による画像処理アシストと組み合わせ可能ですか？",
          a: "はい。別の計算ノードで得られた座標補正の情報を、IPネットワークを通じて接続するだけで、Antheがハードウェア無線の制御信号へと直訳して出力します。AIでの座標分析の数学処理はゲームPC上には一切残りません。"
        },
        {
          q: "PCを2台駆動させるほうが、なぜ1台だけでソフトウェア的な回避手段を取るよりも安全なのですか？",
          a: "ホストPC上でどんなに高度なカーネル隠蔽を行っても、メモリ上に残る痕跡、通信用の特定ポートの開放は検出を免れません。2機体制による真のブリッジ構成は、プロセス、デバイス、通信すべての稼働痕跡をゲームPC上に作らないため、アンチチートの世代が変わっても絶対的な可用性を維持します。"
        }
      ]
    },
    tutorials: {
      badge: "管理・セットアップドキュメント",
      title: "公式システムドキュメント",
      desc: "デジタルブリッジの初期セットアップ手順、および発生しやすいデバイス接続トラブルシューティングのナレッジベース。",
      phasesTitle: "個別フェーズ",
      prepTitle: "準備作業について",
      prepDesc: "セットアップ中にインターネット接続が制限されるデバッグ段階などが発生する可能性があるため、事前に当マニュアルや必要なスクリプトをオフライン環境へメモ保存してください。",
      needTitle: "インストールに必要な物",
      usbTitle: "フラッシュメモリ（USB）",
      usbDesc: "容量16GB以上の市販のUSBメモリを推奨。注意：工程内でUSB内の全データが初期化消去されるため、作業前に必要なデータは必ずPCへバックアップしてください。",
      pc2Title: "中継用のセカンダリPC",
      pc2Desc: "手持ちのサブPC。このコンピュータ上で、安全でクリーンなLinux環境を動作させ、変換・マウス偽装をさせます。",
      winTitle: "USB作成・準備用PC",
      winDesc: "USBメモリへのシステム書き込みを行うための任意のPC。",
      phases: {
        prereqs: {
          title: "開始に際しての要件",
          short: "前提条件",
          desc: "全体のセットアップ前に、ハードウェアや必要なワークスペースを整理・配置します。"
        },
        phase1: {
          title: "第1フェーズ：必要なフリーソフトを取得する",
          short: "フェーズ1: ダウンロード",
          desc: "システムイメージ及びインストールに使うメディア構築ツールをPCに保存します。",
          intro: "PC上で、以下の2つの無料アイテムをあらかじめ入手します:",
          osLabel: "OS ISOイメージ",
          osTitle: "Ubuntu Linux ISO",
          osDesc: "Ubuntu公式ページから、デスクトップ環境向け標準版である「Ubuntu 24.04 LTS」をダウンロード（大容量の .iso 拡張子ファイルが手に入ります）。",
          toolLabel: "フラッシングユーティリティ",
          toolTitle: "Rufus ユーティリティ",
          toolDesc: "Rufus（ルーファス）公式ページより、ポータブルエディションをダウンロード。これは先ほどのISOをUSBに書き込み、起動用ディスクに変換する便利なツールです。"
        },
        phase2: {
          title: "第2フェーズ：永続領域「Persistence」付きUSBを作成",
          short: "フェーズ2: USB作成",
          desc: "一般的なUSBブートとは異なり、設定や保存ファイルがシャットダウン後も消えないプライベート領域を確保します。",
          whatIs: "「永続化パーティション」とは？",
          whatIsDesc: "通常のLinux起動USBは、再起動すると追加したソフトウェアやカスタマイズが完全に消滅して初期状態に戻ってしまいます（図書館のPCなどと同じです）。Persistence（永続スペース）を有効化して書き込むことで、作成されたプログラム、設定をUSB内に終身保存できます。",
          steps: [
            "準備したUSBメモリをPCの空いているスロットに差します。",
            "取得した「Rufus」をダブルクリックで開きます。",
            "「デバイス」：最上段の一覧ボックスに、対象のUSBメモリが正しく選択されていることを確認します。",
            "「ブートの種類」：「選択」ボタンを押し、ダウンロードフォルダにある「Ubuntu 24.04」の.isoファイルを指定します。",
            "「永続パーティションサイズ」：ここにスライダーバーが出現します。スライダーを右に動かし、最低でも4 GBから8 GB（またはそれ以上）を永続化用として割り当ててください。",
            "それ以外の他のすべての項目は、完全に購入初期値のまま放置してください。",
            "最下端の「スタート」ボタンを押し込みます。",
            "Syslinux等の追加ライブラリ取得確認が出た場合は、全て「はい」「OK」で続行します。",
            "書き込みタイプ（ISO / DD）を聞かれたら、「ISOイメージモードで書き込む (推奨)」を選択します。",
            "「USB内の既存のデータはすべて消去されます」という最終警告ウィンドウが出るので、「OK」を押して進行します。",
            "処理メーターがゆっくりと伸び、緑色の帯が100%になり「準備完了」と表示されるまで辛抱強く待ちます。"
          ]
        },
        phase3: {
          title: "第3フェーズ：エミュレータ用プログラムの注入",
          short: "フェーズ3: ファイルを置く",
          desc: "完成したLinuxディスクの中に、Antheの制御用Python・シェルスクリプトをごそっと配置します。",
          intro: "以下の通り、ファイルを適切なUSB領域に入れてエアギャップ中継ディスクを完成させてください：",
          steps: [
            "USBはまだPCに差したままでお待ちください。",
            "エクスプローラー等を開き、新しく認識された「Ubuntu」等のドライブフォルダをダブルクリックで展開します。",
            "そのルートフォルダの最も分かりやすい場所に、右クリックで「accessibility-project」というフォルダーを新規作成します。",
            "今回のプロジェクトパッケージ（setup.shファイルや各コアPythonプログラムが含まれる linux-hid-emulator フォルダ）をフォルダごと、先ほど作成した「accessibility-project」の中へ丸ごとコピー&ペーストします。",
            "ハードウェアの安全な取り外しを行ってからUSBドライブを抜いてください。"
          ]
        },
        phase4: {
          title: "第4フェーズ：サブPCをUSBから起動させる",
          short: "フェーズ4: セカンダリ起動",
          desc: "セカンダリマシンのブートローダー呼び出しキーを活用し、USBから強制的にシステムを立ち上げます。",
          intro: "ここからセカンダリPC（Linuxとブリッジを稼働させる実機）に席を移します。以下の手順を遂行してください：",
          steps: [
            "サブPC本体の電源を完全にオフにしてあることを確認します。",
            "そのPCのUSBスロットに、先ほど仕立て上げた永続化USBメモリを差し込みます。",
            "マシンの主電源ボタンを押し、モニターが明るくなったと同時に即座に各メーカー固有の「Boot Menu」呼び出しキーをポンポンポンと素早く連打し続けます（1秒間に2、3回のトントン打法が確実です）。",
            "呼び出し実キーはメーカーごとに異なります。標準的な例は以下です：\n• F12: Dell, Lenovo, Gigabyte, Acer\n• F11: MSI, AsRock\n• F12 又は Esc: HP\n• F8: ASUS、ROG、自作マザーボード関連",
            "認識メディア一覧メニューが表示されます。キーボードの矢印キーをガチャガチャと操作して、差し込んだUSBを選択します（「UEFI: [USBブランド名]」等と英語で書かれた項目です）そして Enterキーを押して決定します。"
          ]
        },
        phase5: {
          title: "第5フェーズ：Linuxの試用モードを安全に立ち上げる",
          short: "フェーズ5: 安全操作",
          desc: "元のハードディスクデータに全く触れず、メモリ上だけで動作するサンドボックス空間に入ります。",
          warningTitle: "必須・安全上の注意（超重要）",
          warningDesc1: "システムがロードされると、「Try Ubuntu（試用・お試し）」と「Install Ubuntu（本当にインストールする）」という非常に紛らわしい2つのボタンが現れます。",
          warningDesc2: "必ず毎回： 「Try Ubuntu (Ubuntuをお試し・Try)」 を一瞬も迷わず選択してください！",
          warningDesc3: "絶対にデスクトップ上にある「Install Ubuntu」のインストーラアイコンをダブルクリックしないでください！これを誤って進行させると、もともとサブPCにあった OSや内蔵HDDが真っ新にフォーマット消去される大惨事になります。しかし、「お試し・Try」モードで遊んでいる限りは、100%安全かつ一時的なメモリ内での作業となるため、システムが破壊されるようなリスクは絶対生じません！",
          steps: [
            "メニューをパスしOSデスクトップが映り込んだら、使用言語と好みのキーボード配置規格を選択します。",
            "オレンジ色の公式壁紙とともに通常のデスクトップ環境が出現すれば、安全設計されたお試しLinux環境の構築成功です！"
          ]
        }
      },
      prev: "前のフェーズへ",
      next: "次のフェーズへ",
      phaseCounter: "フェーズ {current} / 全 {total} フェーズ"
    },
    shop: {
      badge: "購入ライセンス開通窓口",
      title: "アシスト・エントリプランの決定",
      desc: "ライセンスは支払い完了後すぐに画面上及び自動メールで発行されます。面倒な発送手続き、実機の配送待ち、物理的な配送事故の心配は一切ありません。今すぐ双PCのハードウェアBluetooth連携を開始できます。",
      checkout: "今すぐ購入してキーを取得",
      currency: "ドル",
      lifetime: "永久ライセンスプラン",
      featuresTitle: "購入に含まれる対象範囲:",
      comparisons: {
        tag: "物理ボード(KmBox) vs. デジタル内網ブリッジ",
        title: "高価な輸入ボードは不要に",
        desc: "KmBox、Makcu といった一般的な割り込みデバイスは、海外からの長い配送期間、マイクロコントローラ側の手作業でのファームウェア焼き付けや不審なドライバ割当、ハンダ付けといった物理的・金銭的な高い壁があります。Antheはこれら全てを家庭内のローカルLANネットワークに置き換えます。",
        metricsHeader: "基準値及び比較属性",
        antheCol: "Anthe (LAN-Bluetoothソフトウェアソリューション)",
        badgeDigital: "デジタルブリッジ",
        rows: [
          {
            metric: "主力価格",
            anthe: "わずか 15ドル / 一度の購入で生涯アクティブ",
            kmbox: "およそ 45〜80米ドル + 高額な国際送料、手数料、数週間の待機"
          },
          {
            metric: "導入における配線難易度",
            anthe: "同じルーターのLANまたはWi-Fiを使い、設定2分以内で即開通。",
            kmbox: "高難度。各シリアルケーブル、配線の取り回し、ファームウェアのエラー、ダブルUSBケーブルの取り回し。",
            makcu: "提供元の閉ざされた非公開専用ドライバを常駐させる手間がある。"
          },
          {
            metric: "信号のエミュレート偽装形態",
            anthe: "セカンダリPC側の標準ハード無線を叩き、本物のBluetooth HIDとして射出します。",
            kmbox: "専用のUSBハブとコントローラ側で、二つの入出力を無理やりインターセプトして書き込みます。",
            makcu: "未署名のCOMポート（USB-シリアル）として繋ぐためシステム的に浮きます。"
          },
          {
            metric: "デバイスコード漏洩とバン耐性",
            anthe: "絶対検知不可能。ゲームをするゲームマシン側には一切プログラム、痕跡、不審なUSBデバイスは認識せず、ただ人間が動かしたマウス電波を受け止めるだけです。",
            kmbox: "低〜中リスク。ファームウェアに書き込まれたUSBベンダーID、製品コードがゲームガードのチェック項目に入ると一括BANされます。",
            makcu: "中〜高リスク。偽装シリアルPIDを都度ハックして上書きしない限り、アンチチートの稼働フックに引っかかります。"
          }
        ]
      }
    },
    terms: {
      badge: "リーガルポリシー (UK法)",
      title: "利用規約 & ライセンス同意書",
      subtitle: "最終更新日: 2026年6月20日。英国消費者保護法案（2015年消費者権利法を含む）の管轄下にあります。",
      calloutTitle: "英国消費者保護法フレームワーク",
      calloutDesc: "この契約は、貴方によるAntheデジタルライセンスの購入を規律します。英国2015年消費者権利法および2013年消費者契約規則に基づき、購入されるデジタルコンテンツの動作水準、仕様記述の相違有無、および即時利用に係るキャンセル権放棄の基準を保護します。",
      rightsTitle: "あなたの法定権利 (UK Statutory Rights)",
      rightsItems: [
        "合格品質の保証: 提供されたライセンスキーおよびプログラムは、記載された仕様に沿って正常に動作し続けます。",
        "修正パッチ取得権: バグによる起動障害等に直面した場合、無償デバッグ及び追加のアップデート配給を素早く受け取ることができます。",
        "即時提供に伴うクーリングオフ撤退権の放棄: デジタルシリアル配信商品の仕様上、決済完了から納品が完了した（画面上への提示又はメールでの送付）瞬間に、デフォルトで認められている14日間の購入取消（返金）請求権を明示的に放棄することに同意するものとみなします。"
      ],
      sections: [
        {
          num: "1.",
          title: "運営主体について",
          desc: "Antheデジタルプラットフォーム、ライセンス自動発券、並びに関連するセットアップスクリプト群（総称して「本サービス」）は、英国内法に基づき合法に登記された Anthe Digital Systems Ltd. (弊社)が完全に所有および運営管理を行っています。"
        },
        {
          num: "2.",
          title: "契約資格とお客様の身分保証",
          desc: "当社のショップを通じてシリアルを落札・決済を行われた時点で、ユーザーは契約締結に係る十全な行為能力を有し、かつ取引条件となる成年（英国：18歳以上）に達していることを当社に保証するものとします。アシスト及び無障害の目的かつ、個人私用の範疇でのみこのソリューションを操作してください。"
        },
        {
          num: "3.",
          title: "デジタルコンテンツの瑕疵保証義務 (Consumer Rights Act 2015)",
          desc: "2015年法に従い、当社はお客様に納品したデジタルプロダクトについて次の各規準を保証します。一般的な顧客が通常想定する公允かつ合格水準の動作品質であること、ユーザーが本来の利用意図（ネットワークを跨ぎ。副PCから本物のBluetoothコントロールとして転送すること）を確実に達成できる適格性を持つこと、販売ページ、セットアップ説明にて当社が正式に記述した性能の一切と差異がないこと。"
        },
        {
          num: "4.",
          title: "デジタル発券の即時履行と法制上の返金・返品権利の消失",
          desc: "欧州消費者指令（2013年規則含む）上、お客様は購入後14日間以内は自由に変更・返金請求を起すことができます。しかし本コンテンツは即時発券を要する特殊な性質上、シリアル提示またはメール送信手続きを経て商品の引渡しサービス供給が開始された場合、お客様はこの immediate な履行開始を望んだものとし、14日間のクーリングオフ・取消請求の権利（Cancellations Policy）を直ちに失効・放棄することに明示同意したものとして処理されます。"
        },
        {
          num: "5.",
          title: "製品障害への救済手続き",
          desc: "購入したプログラムに記述と著しい相違がある場合、または接続不全などを引き起こす深刻な記述バグがあった際には、速やかにサポートへ修正要求を提起できます。当社が技術的に修復不可能な場合には、お買い上げ金額の適正な一部減額または全額返金の対応を行い、お客様の不都合を可能な限り緩和します。"
        },
        {
          num: "6.",
          title: "免責細則とサードパーティ社製ソフトウェアの責任境界",
          desc: "本条項のいかなる記述も、当社の故意過失による詐欺、または英国法上（2015年消費者権利法等）の絶対免責が不可避とされる不法行為についてまで弊社の賠償責任を排除・上限設定する意図はありません。但しそれ以外の通常範囲内において、外部ゲームでのアカウントBANや外设ハードコード指定、その他ゲームPC側のハード故障等などにおいて、弊社はいかなる経済的・偶発的商業損失の弁済も免じられます。技術特性はご自身の自己責任にて検証運用してください。"
        },
        {
          num: "7.",
          title: "裁判管轄法",
          desc: "この売買規準および一切の合意は、英国内「イングランドおよびウェールズ」の法律を準拠法として解釈されます。但し、スコットランドまたは北アイルランドにお住まいの消費者は、各現地の司法へ管轄の移転を委託することができます。"
        }
      ]
    },
    developer: {
      badge: "統合ガイド群",
      title: "UDP 配信出力モジュールのインテグレーション",
      subtitle: "セキュアかつエアギャップ（物理分離）されたネットワークリレーを介して、生の相対ハードウェア移動量を配信します。",
      sec1Title: "1. アーキテクチャの概要と価値提案",
      sec1Paragraph1: "アシスタントコンテキスト下での設定において、ITセキュリティポリシー、互換性、またはアンチチートの存在などの理由により、操作対象のターゲットPC上にカスタムのカーネルレベルドライバや複雑なエージェントソフトウェアを導入することは、一般的に安全ではない、あるいは非常に警戒されます。",
      sec1Paragraph2: "本推奨システムは、ハードウェア・イン・ザ・ループ (HIL) エミュレーション・モデルを活用することで、これら厳しい制約を完全に克服します。:",
      step1Title: "ステップ 1 — ソース",
      step1Host: "Aimbot 実行コード",
      step1Desc: "入力（画像フレーム等）を検知・計算し、低遅延UDPデータパケットを通して相対座標とマウスクリック状態を送信します。",
      step2Title: "ステップ 2 — ブリッジ",
      step2Host: "Linux 受信機",
      step2Desc: "セカンダリ端末（Raspberry Pi または Linux 仮想マシン）で常時作動。UDPフレームを監視・マージし、本物のBluetooth HIDマウスとしてターゲット機器に振る舞います。",
      step3Title: "ステップ 3 — 出力ターゲット",
      step3Host: "ターゲットPC",
      step3Desc: "Bluetooth経由で標準マウス移動信号を受信します。ターゲットPCへの独自のプログラム・ドライバ導入は一切不要であり、完全にプラグアンドプレイ仕様です。",
      sysFlow: "データ通信フロー",
      srcNode: "ソース推論機構 (Aimbot app)",
      bridgeNode: "ハードウェアエミュレータブリッジ",
      targetNode: "コンソール/ホストPC（最終ターゲット、無傷出力）",
      udpStream: "UDP ストリーム (Port 5555 / 7バイト バイナリパック)",
      btStream: "Bluetooth HID (標準マウスプロトコル)",
      targetDesc: "PC, Mac, 家庭用ゲーム機 等",
      sec2RoutingTitle: "2. コネクションレス UDP ネットワークルーティング",
      sec2RoutingDesc: "伝送プロトコルは UDP (User Datagram Protocol) を使用するため、ソース側と Linux 受信側の間には TCP のようなステートフルかつ接続指向のハンドシェイクは存在しません。代わりに、以下のようにネットワーク接続が確立されます：",
      routingStep1Title: "1. 受信側のポートバインド",
      routingStep1Desc: "受信機は、任意の有効な送信元からのパケットを受け入れるため、ワイルドカード IPv4 インターフェース (0.0.0.0) 上の特定ポート (例: 5555) をリッスンしてバインドします。",
      routingStep2Title: "2. クライアントのエンドポイント指定",
      routingStep2Desc: "クライアントアプリケーションは接続ハンドシェイクを行いません。標準の UDP ソケットを生成し、Linux 受信側の特定のローカル IPv4 アドレス (例: 192.168.1.100) および指定されたポート (例: 5555) に向けてデータグラムを直接送信します。",
      routingStep3Title: "3. 低遅延かつ非ブロッキング送信",
      routingStep3Desc: "クライアントは生のパケットをターゲットソケットに直接伝送します。メインアプリケーションスレッド (マウスフックやアイトラッカー更新ループ等) のフリーズを防止するため、クライアントソケットは非ブロッキング (non-blocking) モードに設定してください。",
      sec2Title: "3. カスタム UDP ペイロード仕様",
      sec2Desc: "ネットワークオーバーヘッド、転送レイテンシ、処理ジッターを可能な限りゼロに抑え込むため、本プロトコルはきっかり「7バイト」の固定バイナリ構造を持っています。複数バイトの整数(dxおよびdy)は、受信側のパース仕様に合わせて、リトルエンディアン(LE)形式で整列されている必要があります。",
      colOffset: "オフセット (Bytes)",
      colSize: "サイズ",
      colField: "フィールド名",
      colType: "データ型",
      colDesc: "記述・制約条件",
      rowMagic: "同期確認用の固定マジック。正確に 0xAB である必要があります。",
      rowDx: "符号付き相対 X軸移動量（負は左、正は右）。",
      rowDy: "符号付き相対 Y軸移動量（負は上、正は下）。",
      rowButtons: "現在の左右中ボタンクリック状況を示すビットマスクを表します。",
      rowSeq: "順序不整合検知のためのシーケンス番号 (0–255)、パケット毎に1インクリメント。",
      bitmaskTitle: "ボタンビットマスク構成 (バイトオフセット 5)",
      leftClick: "左クリック",
      rightClick: "クリック",
      middleClick: "中クリック",
      sec3Title: "4. 各種コード言語別実装テンプレート",
      sec3Desc: "非同期スレッド処理・描画やメインフックのブロック遅延を防ぐように最適化された、すぐにサービス投入可能な高パフォーマンス送信コード群です。",
      copyBtn: "コードをコピー",
      copiedBtn: "コピー完了!"
    }
  }
};
