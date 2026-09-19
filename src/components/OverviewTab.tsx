import React, { useState } from 'react';
import { motion, Variants } from 'motion/react';
import { Cpu, ArrowRight, Zap, Bluetooth, Network, Monitor, MousePointer, Sliders, RefreshCw, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Part } from '../types';
import AntheLogo from './AntheLogo';
import BrandMarquee from './BrandMarquee';

interface OverviewTabProps {
  onTabChange: (tab: 'overview' | 'faq' | 'tutorials' | 'shop' | 'terms') => void;
}

export default function OverviewTab({ onTabChange }: OverviewTabProps) {
  const [activeStage, setActiveStage] = useState<'all' | 'forwarder' | 'emulator'>('all');
  const { language, t } = useLanguage();

  const flowchartText = {
    en: {
      schema: "ARCHITECTURE SCHEMA",
      tit: "How the Anthe Bridge Operates",
      sub: "Select a stage below to see how coordinates move from your source application, through the isolated bridge, to Bluetooth injection.",
      path: "Full Signal Path",
      fwd: "Source App",
      emu: "Linux Emulator",
      s1: "Stage 1",
      s1Tit: "Your Source (E.g. Aimbot)",
      s1Desc: "Your tracking script or vision model calculates coordinate offsets, bypassing local input queues entirely.",
      s1Items: [
        { label: "Direct Streaming: ", text: "Coordinates stream directly via UDP from your script to the bridge." },
        { label: "Clean Host: ", text: "No background software or forwarder utilities run on your primary PC." },
        { label: "Lightweight UDP: ", text: "Compact network packets transmit asynchronously over your local network." }
      ],
      s1Foot: "No local hooks or forwarders required",
      
      netLink: "LOCAL NETWORK LINK",
      netLinkDesc: "Sub-millisecond UDP streaming over Wi-Fi or Ethernet.",
      noInternet: "No Internet Required",

      s2: "Stage 2",
      s2Tit: "The Linux Emulator",
      s2Desc: "An independent node that receives UDP packets and outputs genuine physical Bluetooth HID reports.",
      s2Items: [
        { label: "Input Blending: ", text: "Seamlessly merges incoming coordinates with your physical mouse input." },
        { label: "Standard HID: ", text: "Outputs compliant Bluetooth mouse packets identical to a retail peripheral." },
        { label: "Zero Footprint: ", text: "Leaves no process traces or driver signatures on the target machine." }
      ],
      s2Foot: "Generates real Bluetooth HID reports",

      deepDive: "Deep-Dive: ",
      fwdDeep: "NATIVE INTEGRATION",
      emuDeep: "LINUX EMULATOR & INJECTION CORE",
      fwdDeepText: "Scripts securely stream relative offsets over UDP directly to the bridge. With no forwarder required on the primary host, there is zero target footprint—just send lightweight packets to the bridge IP.",
      emuDeepText: "The bridge receives UDP packets and transmits them through a dedicated Bluetooth transceiver, smoothly blending algorithmic corrections with your physical mouse without cursor jitter.",
      
      hwTitle: "Recommended Twin Computer Setup",
      hwSetup: "HARDWARE SETUP",
      hwRec: "Deployment Advantage",
      
      topoLabel: "HOW IT WORKS",
      topoTitle: "Straightforward Connection Benefits",
      
      compLabel: "SAFETY METRICS",
      compTitle: "Software vs. Physical Forwarding",
      compApproach: "Approach",
      compAnthe: "Anthe Physical Bridge",
      compSoft: "Software Input Emulators",
      
      speedLabel: "TECHNICAL STABILITY",
      speedTitle: "Simple Speed Indicators",
      
      speed1Label: "FORWARDING LAG",
      speed1Title: "Sub-Millisecond Speed",
      speed1Desc: "Coordinates are transmitted at high polling rates (125Hz–1000Hz) with sub-millisecond network transit, providing an instantaneous, lag-free feel.",
      
      speed2Label: "TRANSMISSION",
      speed2Title: "Pure Bluetooth Wireless",
      speed2Desc: "Connects via native OS Bluetooth pairing. No virtual drivers, custom software, or system modifications are ever installed.",
      
      speed3Label: "STABLE HOOK",
      speed3Title: "Direct Network Cable Or WiFi",
      speed3Desc: "Runs over your local Wi-Fi or a direct Ethernet cable. The isolated network channel keeps coordinate traffic fully contained."
    },
    zh: {
      schema: "架构原理解析",
      tit: "天御 数据链路如何运作",
      sub: "点击下方模块，查看坐标数据如何从源端脚本经由隔离网桥，安全注入至目标主机的蓝牙底层。",
      path: "完整物理路径",
      fwd: "数据源程序",
      emu: "Linux 实体网桥",
      s1: "第 1 阶段",
      s1Tit: "数据源端 (如脚本/视觉模型)",
      s1Desc: "自研追踪脚本或视觉模型直接输出位移量，完全绕过主机本地的输入队列。",
      s1Items: [
        { label: "直连推流：", text: "目标坐标通过轻量 UDP 数据包直接发送至网桥节点。" },
        { label: "纯净主机：", text: "主游戏机无需运行任何本地转发或钩子程序。" },
        { label: "极简发包：", text: "紧凑的 UDP 数据帧在局域网内异步流转，开销极低。" }
      ],
      s1Foot: "无需安装任何本地钩子或转发软件",

      netLink: "本地局域网连线",
      netLinkDesc: "通过局域网 Wi-Fi 或直连网线，实现亚毫秒级 UDP 极速传输。",
      noInternet: "无需连接外部互联网",

      s2: "第 2 阶段",
      s2Tit: "Linux 实体网桥",
      s2Desc: "独立运行的接收节点，将接收到的 UDP 数据包还原为真实蓝牙 HID 硬件报告。",
      s2Items: [
        { label: "协同融合：", text: "将网络坐标与连接在副机上的实体鼠标轨迹平滑拟合。" },
        { label: "标准 HID：", text: "输出与市售无线鼠标完全一致的标准蓝牙报告格式。" },
        { label: "零特征残留：", text: "在目标主机上完全透明，反作弊引擎无从感知。" }
      ],
      s2Foot: "输出符合规范的真实蓝牙 HID 报告",

      deepDive: "深度技术视界：",
      fwdDeep: "原生无缝集成",
      emuDeep: "LINUX 物理桥接与蓝牙注入核心",
      fwdDeepText: "脚本直接通过原生 UDP 接口将相对位移发送至网桥。由于主系统无需运行任何中继客户端，系统特征完全为零，仅需向网桥 IP 发送轻量数据包。",
      emuDeepText: "副机通过专用蓝牙适配器直接对外发包，将算法输入与物理鼠标轨迹无缝叠合，兼顾微秒级响应与零抖动平滑度。",
      
      hwTitle: "推荐的硬件双系统搭配",
      hwSetup: "硬件要求",
      hwRec: "系统部署优势",

      topoLabel: "基本优势",
      topoTitle: "物尽其用的连接收益",

      compLabel: "安全性分析对照",
      compTitle: "纯软件模拟与物理网桥的区别",
      compApproach: "对比机制",
      compAnthe: "天御 物理双机桥",
      compSoft: "普通本地软件模拟",

      speedLabel: "核心速度面板",
      speedTitle: "微秒级性能指标",

      speed1Label: "传输固有衰减",
      speed1Title: "微秒级无感开销",
      speed1Desc: "数据传输保持高回报率（125Hz–1000Hz），局域网亚毫秒级抵达，全程毫无迟滞感。",

      speed2Label: "物理输送通道",
      speed2Title: "纯蓝牙无线广播",
      speed2Desc: "利用系统原生蓝牙标准握手配对，无需向主系统注册表或驱动库添加任何第三方驱动。",

      speed3Label: "底层传输依赖",
      speed3Title: "普通 Wi-Fi 或者是网线直连",
      speed3Desc: "支持家庭 Wi-Fi 或网线双机直连。数据流完全局限于本地局域网，与外部互联网彻底物理隔离。"
    },
    ja: {
      schema: "アーキテクチャ概要",
      tit: "Anthe データ伝送の仕組み",
      sub: "下のステージを選択して、座標データが元のアプリから隔離ブリッジを経由し、Bluetooth注入に至る流れを確認できます。",
      path: "完全シグナル経路",
      fwd: "元のアプリ",
      emu: "Linux 物理レシーバー",
      s1: "フェーズ 1",
      s1Tit: "ソース・アプリ（例：画像AI類）",
      s1Desc: "トラッキングスクリプトや画像認識モデルが相対移動量を計算し、ローカルの入力キューを完全にバイパスします。",
      s1Items: [
        { label: "直接ストリーミング：", text: "スクリプトからブリッジへUDPパケットで座標を直接転送します。" },
        { label: "クリーンなホスト：", text: "ゲーム動作PC上で中継ユーティリティを動かす必要はありません。" },
        { label: "軽量パケット：", text: "LAN経由でネットワーク負荷の極めて少ない小型UDPデータを送信します。" }
      ],
      s1Foot: "ローカルフックや転送ソフトの常駐は不要",

      netLink: "ホームローカルネットワーク",
      netLinkDesc: "Wi-Fiまたは直結LANケーブルによるサブミリ秒未満のUDP高速転送。",
      noInternet: "インターネット非接続で稼働可能",

      s2: "フェーズ 2",
      s2Tit: "Linux 受信エミュレータ",
      s2Desc: "独立したノードがUDPパケットを受信し、本物のBluetooth HIDマウスレポートを出力します。",
      s2Items: [
        { label: "コパイロット合成：", text: "ネットワーク座標と手元の物理マウス操作を滑らかに融合します。" },
        { label: "標準HID準拠：", text: "市販のワイヤレスマウスと完全に同一のHIDフォーマットを出力します。" },
        { label: "検知フットプリント皆無：", text: "ターゲットマシン上にプロセスやドライバの痕跡を残しません。" }
      ],
      s2Foot: "正規Bluetooth規格準拠の HID マウス制御信号を出力",

      deepDive: "深層テクニカル詳細：",
      fwdDeep: "ネイティブ・インテグレーション",
      emuDeep: "LINUX 物理エミュレータとシグナル統合",
      fwdDeepText: "スクリプトは生のUDP層を介して相対オフセットをブリッジへ直接送信します。メインPC側での中継ソフトが不要なため、ターゲット上の痕跡は実質ゼロです。",
      emuDeepText: "専用Bluetoothアダプタを通じてパケットを送信し、アルゴリズムの補正と物理マウスの動きをカーソルのブレなく調和させます。",
      
      hwTitle: "推奨されるダブルPCハード構成",
      hwSetup: "ハードウェア構成",
      hwRec: "システム配置の利点",

      topoLabel: "基本機能",
      topoTitle: "安定した中継によるメリット",

      compLabel: "安全性チェック表",
      compTitle: "仮想入力系ツールと物理ブリッジ方式の違い",
      compApproach: "比較の観点",
      compAnthe: "Anthe 物理双機ブリッジ",
      compSoft: "PC内ソフトウェアエミュレーション",

      speedLabel: "遅延スピード判定",
      speedTitle: "測定上の実測応答スピード",

      speed1Label: "転送中継レイテンシ",
      speed1Title: "1ミリ秒未満の即応性",
      speed1Desc: "125Hz–1000Hzの高サイクル通信により、遅延を感じさせない瞬時の反応速度を提供します。",

      speed2Label: "ペアリング形態",
      speed2Title: "本物のBluetoothペアリング",
      speed2Desc: "OS標準のBluetooth機能でペアリング。サードパーティ製ドライバのインストールは不要です。",

      speed3Label: "ネットワーク要求",
      speed3Title: "Wi-Fi 又は有線LANでの近距離結線",
      speed3Desc: "家庭内Wi-FiまたはLANケーブル直結に対応。外部インターネットを介さず安全に完結します。"
    }
  };

  const currentFlow = flowchartText[language as 'en' | 'zh' | 'ja'] || flowchartText.en;

  const partList: Part[] = [
    {
      name: t.overview.parts.pc1Title,
      category: "Core",
      price: 0,
      description: t.overview.parts.pc1Desc,
      recommendation: t.overview.parts.pc1Rec
    },
    {
      name: t.overview.parts.pc2Title,
      category: "Interface",
      price: 0,
      description: t.overview.parts.pc2Desc,
      recommendation: t.overview.parts.pc2Rec
    }
  ];

  const parameters = t.overview.parameters;
  const COMPARISONS = t.overview.comps.rows;

  // Motion animation parameters
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 85, 
        damping: 14 
      } 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-24"
    >
      {/* Large Title Header */}
      <section className="flex flex-col items-center justify-center text-center py-12 md:py-20 space-y-4 border-b border-stone-200/40 relative">
        <motion.h1 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={
            language === 'zh'
              ? "font-serif-sc text-7xl sm:text-8xl md:text-9xl tracking-[0.35em] font-black text-stone-950 mr-[-0.35em] select-none"
              : "font-serif text-7xl sm:text-8xl md:text-9xl tracking-[0.25em] font-extrabold text-stone-950 mr-[-0.25em] select-none uppercase"
          }
        >
          {t.brandName || (language === 'zh' ? '天御' : 'ANTHE')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-[10px] sm:text-xs text-stone-400 font-mono uppercase tracking-[0.4em] font-medium max-w-lg leading-relaxed animate-pulse"
        >
          {t.overview.slogan}
        </motion.p>
      </section>

      {/* Simplified Straightforward Description Section */}
      <section className="max-w-4xl mx-auto space-y-8 text-center px-4">
        {/* Category Pill Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-stone-200 text-stone-605 rounded-full shadow-xs text-xs font-light tracking-wide mx-auto animate-fade"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-stone-500 animate-pulse"></span>
          <span className="font-serif font-medium">{t.overview.pill}</span>
        </motion.div>

        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif font-light text-5xl md:text-6xl text-stone-950 tracking-wide leading-tight"
          >
            {t.overview.mainTitle}
          </motion.h2>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-3xl mx-auto"
        >
          {t.overview.mainDesc}
        </motion.p>

        {/* Actions Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-1 animate-fade"
        >
          <button
            onClick={() => onTabChange('tutorials')}
            className="px-7 py-4 rounded-full text-xs font-bold tracking-widest text-[#faf9f6] bg-stone-950 hover:bg-stone-850 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-stone-950/10 z-20 cursor-pointer flex items-center gap-2 group"
          >
            <span>{t.overview.ctaStart}</span>
            <ArrowRight className="h-3.5 w-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onTabChange('shop')}
            className="px-7 py-4 rounded-full text-xs font-bold tracking-widest text-stone-950 bg-white border-2 border-stone-200 hover:border-stone-900 hover:bg-stone-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <ShoppingBag className="h-4 w-4 text-stone-900" />
            <span>{t.overview.ctaShop}</span>
          </button>
        </motion.div>
      </section>

      {/* Grid Specs Row */}
      <section className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {[
          { metric: t.overview.stats.latency, text: t.overview.stats.latencyDesc },
          { metric: t.overview.stats.conn, text: t.overview.stats.connDesc },
          { metric: t.overview.stats.footprint, text: t.overview.stats.footprintDesc }
        ].map((item, id) => (
          <div key={id} className="p-6 bg-white border border-stone-200/50 rounded-2xl shadow-xs text-center space-y-1">
            <div className="font-serif text-3xl font-light text-stone-950">{item.metric}</div>
            <p className="text-xs text-stone-500 font-light">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Endless Horizontal Rolling Collaborations/Partnerships Marquee */}
      <BrandMarquee title={t.overview.marqueeTitle} />

      {/* Interactive Flowchart Diagram Section */}
      <section className="space-y-8 max-w-5xl mx-auto px-4">
        <div className="text-center space-y-2">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">{currentFlow.schema}</span>
          <h3 className="font-serif text-3xl font-light text-stone-950">{currentFlow.tit}</h3>
          <p className="text-xs text-stone-550 max-w-xl mx-auto font-light leading-relaxed">
            {currentFlow.sub}
          </p>
        </div>

        {/* Dynamic Selector Buttons */}
        <div className="flex justify-center gap-2 bg-stone-100/60 p-1.5 rounded-full max-w-md mx-auto border border-stone-205">
          <button
            onClick={() => setActiveStage('all')}
            className={`px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
              activeStage === 'all' 
                ? 'bg-stone-900 text-stone-100 shadow-xs' 
                : 'text-stone-605 hover:text-stone-900'
            }`}
          >
            {currentFlow.path}
          </button>
          <button
            onClick={() => setActiveStage('forwarder')}
            className={`px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
              activeStage === 'forwarder' 
                ? 'bg-stone-900 text-stone-100 shadow-xs' 
                : 'text-stone-605 hover:text-stone-900'
            }`}
          >
            {currentFlow.fwd}
          </button>
          <button
            onClick={() => setActiveStage('emulator')}
            className={`px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
              activeStage === 'emulator' 
                ? 'bg-stone-900 text-stone-100 shadow-xs' 
                : 'text-stone-605 hover:text-stone-900'
            }`}
          >
            {currentFlow.emu}
          </button>
        </div>

        {/* Visual Map Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch relative">
          
          {/* STAGE 1: Windows Host Player */}
          <motion.div
            animate={{ 
              scale: activeStage === 'forwarder' ? 1.02 : activeStage === 'all' ? 1 : 0.96,
              opacity: activeStage === 'forwarder' || activeStage === 'all' ? 1 : 0.4
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={`p-6 rounded-3xl bg-white border transition-colors flex flex-col justify-between space-y-6 ${
              activeStage === 'forwarder' 
                ? 'border-stone-950 ring-1 ring-stone-900/5 shadow-md shadow-stone-200/50' 
                : 'border-stone-200/60 shadow-xs'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-stone-100 rounded-2xl flex items-center justify-center border border-stone-200 shrink-0">
                  <Monitor className="h-4.5 w-4.5 text-stone-705" />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase bg-stone-100 px-2 py-0.5 rounded text-stone-500 font-bold border border-stone-200">{currentFlow.s1}</span>
                  <h4 className="font-serif text-base font-bold text-stone-950 mt-1">{currentFlow.s1Tit}</h4>
                </div>
              </div>

              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {currentFlow.s1Desc}
              </p>

              <div className="space-y-2 border-t border-stone-100 pt-4">
                {currentFlow.s1Items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[11px] text-stone-600 font-light">
                    <div className="h-1.5 w-1.5 rounded-full bg-stone-800 mt-1.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-stone-850">{item.label}</span> {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] font-mono text-stone-600 bg-stone-50/80 p-2.5 rounded-xl border border-stone-200/50 flex items-center gap-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.015)]">
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse shrink-0"></span>
               <span className="font-medium">{currentFlow.s1Foot}</span>
             </div>
           </motion.div>
 
           {/* TRANSIT CONNECTOR COLUMN: High-Speed Networking */}
           <div className="flex flex-col items-center justify-center p-2 relative md:h-auto py-8">
             <div className="absolute inset-y-0 w-[1px] bg-dashed border-l border-stone-300 left-1/2 -translate-x-1/2 hidden md:block"></div>
             <div className="absolute inset-x-0 h-[1px] bg-dashed border-t border-stone-300 top-1/2 -translate-y-1/2 md:hidden"></div>
 
             <motion.div 
               animate={{
                 rotate: activeStage !== 'all' ? 0 : 360
               }}
               transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
               className="relative p-5 bg-stone-900 text-[#faf9f6] rounded-full shadow-lg z-10"
             >
               <Network className="h-5 w-5" />
             </motion.div>
 
             <div className="mt-4 text-center z-10 max-w-[200px] space-y-1.5 bg-stone-50/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200/90 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
               <span className="text-[9px] font-mono tracking-widest text-[#8c7853] block uppercase font-bold">{currentFlow.netLink}</span>
               <p className="text-[10px] text-stone-600 font-light leading-snug">{currentFlow.netLinkDesc}</p>
               <div className="inline-block mt-0.5 px-2 py-0.5 bg-amber-50/70 border border-amber-200/40 rounded-md text-[#8c7853] font-mono text-[9px] font-semibold">{currentFlow.noInternet}</div>
             </div>
           </div>
 
           {/* STAGE 2: Secondary Emulator Node */}
           <motion.div
             animate={{ 
               scale: activeStage === 'emulator' ? 1.02 : activeStage === 'all' ? 1 : 0.96,
               opacity: activeStage === 'emulator' || activeStage === 'all' ? 1 : 0.4
             }}
             transition={{ type: "spring", stiffness: 100, damping: 15 }}
             className={`p-6 rounded-3xl bg-white border transition-colors flex flex-col justify-between space-y-6 ${
               activeStage === 'emulator' 
                 ? 'border-stone-950 ring-1 ring-stone-900/5 shadow-md shadow-stone-200/50' 
                 : 'border-stone-200/60 shadow-xs'
             }`}
           >
             <div className="space-y-4">
               <div className="flex items-center gap-3">
                 <div className="h-9 w-9 bg-stone-100 rounded-2xl flex items-center justify-center border border-stone-200 shrink-0">
                   <Bluetooth className="h-4.5 w-4.5 text-stone-705" />
                 </div>
                 <div>
                   <span className="text-[9px] font-mono uppercase bg-stone-100 px-2 py-0.5 rounded text-stone-500 font-bold border border-stone-200">{currentFlow.s2}</span>
                   <h4 className="font-serif text-base font-bold text-stone-950 mt-1">{currentFlow.s2Tit}</h4>
                 </div>
               </div>
 
               <p className="text-xs text-stone-600 font-light leading-relaxed">
                 {currentFlow.s2Desc}
               </p>
 
               <div className="space-y-2 border-t border-stone-100 pt-4">
                 {currentFlow.s2Items.map((item, idx) => (
                   <div key={idx} className="flex items-start gap-2.5 text-[11px] text-stone-600 font-light">
                     <div className="h-1.5 w-1.5 rounded-full bg-stone-800 mt-1.5 shrink-0" />
                     <div>
                       <span className="font-semibold text-stone-850">{item.label}</span> {item.text}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
 
             <div className="text-[10px] font-mono text-stone-600 bg-stone-50/80 p-2.5 rounded-xl border border-stone-200/50 flex items-center gap-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.015)]">
               <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)] animate-pulse shrink-0"></span>
               <span className="font-medium">{currentFlow.s2Foot}</span>
             </div>
           </motion.div>

        </div>

        {/* Highlight details on active selection */}
        {activeStage !== 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-stone-50 border border-stone-150 max-w-2xl mx-auto space-y-2 text-center"
          >
            <span className="text-[9px] font-mono font-bold tracking-widest text-stone-400 uppercase">
              {currentFlow.deepDive}{activeStage === 'forwarder' ? currentFlow.fwdDeep : currentFlow.emuDeep}
            </span>
            <p className="text-xs text-stone-650 leading-relaxed font-light">
              {activeStage === 'forwarder' ? currentFlow.fwdDeepText : currentFlow.emuDeepText}
            </p>
          </motion.div>
        )}
      </section>

      {/* Recommended Hardware Core */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-1 border-b border-stone-200/40 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">{currentFlow.hwSetup}</span>
            <h3 className="font-serif text-2xl font-semibold text-stone-950">{currentFlow.hwTitle}</h3>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {partList.map((part, i) => (
            <motion.div 
              key={i}
              variants={cardItemVariants}
              whileHover={{ scale: 1.015, translateY: -3 }}
              className="p-6 rounded-2xl bg-white marble-slab-card-interactive flex flex-col justify-between space-y-4 h-full"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider font-mono text-stone-400 font-bold bg-stone-50 px-2.5 py-0.5 rounded-full border border-stone-200">
                    {part.category} DEVICE
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900">{part.name}</h4>
                <p className="text-xs text-stone-605 leading-relaxed font-light">{part.description}</p>
              </div>

              <div className="bg-stone-50/50 p-3.5 rounded-xl border border-stone-100 text-[11px] text-stone-500 leading-relaxed">
                <span className="font-bold text-stone-800 font-serif block text-xs mb-0.5">{currentFlow.hwRec}</span>
                {part.recommendation}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Product Topology Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">{currentFlow.topoLabel}</span>
          <h3 className="font-serif text-2xl font-semibold text-stone-950">
            {currentFlow.topoTitle}
          </h3>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {parameters.map((param, index) => (
            <motion.div 
              key={index}
              variants={cardItemVariants}
              whileHover={{ scale: 1.015, translateY: -2 }}
              className="p-5 rounded-2xl bg-white/95 border border-stone-200/60 shadow-xs flex gap-4 marble-slab-card"
            >
              <div className="h-6 w-6 rounded-full bg-stone-900 text-[#faf9f6] text-[10px] flex items-center justify-center font-mono font-bold shrink-0">
                0{index + 1}
              </div>
              <div className="space-y-1">
                <h5 className="font-serif text-sm font-bold text-stone-950">{param.key}</h5>
                <p className="text-xs text-stone-600 leading-relaxed font-light">{param.val}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Comparison Grid */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">{t.overview.comps.title ? t.overview.comps.title : currentFlow.compLabel}</span>
          <h3 className="font-serif text-2xl font-semibold text-stone-950">{currentFlow.compTitle}</h3>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white marble-slab-card overflow-x-auto"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[10px] uppercase text-stone-500 tracking-wider">
                <th className="p-4 font-bold">{currentFlow.compApproach}</th>
                <th className="p-4 font-bold text-stone-800">{currentFlow.compAnthe}</th>
                <th className="p-4 text-stone-400 font-medium">{currentFlow.compSoft}</th>
              </tr>
            </thead>
            <tbody className="text-xs text-stone-600 divide-y divide-stone-100 bg-white">
              {COMPARISONS.map((comp, i) => (
                <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900">{comp.feature}</td>
                  <td className="p-4 text-stone-700 bg-stone-50/40 font-light">{comp.bridge}</td>
                  <td className="p-4 text-stone-400 font-light">{comp.software}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* Hardware Alternatives Comparison: Anthe vs KmBox vs Makcu */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">
            {t.shop.comparisons.tag}
          </span>
          <h3 className="font-serif text-2xl font-semibold text-stone-950">
            {t.shop.comparisons.title}
          </h3>
          <p className="text-xs text-stone-550 max-w-2xl font-light leading-relaxed">
            {t.shop.comparisons.desc}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white marble-slab-card overflow-x-auto"
        >
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[10px] uppercase text-stone-500 tracking-wider">
                <th className="p-4 font-bold text-stone-800">{t.shop.comparisons.metricsHeader}</th>
                <th className="p-4 font-bold text-stone-950 bg-stone-100/50 relative">
                  <span className="inline-block bg-stone-900 text-stone-100 font-mono text-[8px] tracking-widest px-2 py-0.5 rounded-full uppercase mr-2 align-middle">
                    {t.shop.comparisons.badgeDigital}
                  </span>
                  {t.shop.comparisons.antheCol}
                </th>
                <th className="p-4 font-medium text-stone-500">KmBox (Hardware Board)</th>
                <th className="p-4 font-medium text-stone-500">Makcu (Hardware Board)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs text-stone-600 bg-white">
              {t.shop.comparisons.rows.map((row: any, idx: number) => (
                <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900 whitespace-nowrap">{row.metric}</td>
                  <td className="p-4 text-stone-950 font-semibold bg-stone-50/40 leading-relaxed">{row.anthe}</td>
                  <td className="p-4 text-stone-500 font-light leading-relaxed">{row.kmbox}</td>
                  <td className="p-4 text-stone-500 font-light leading-relaxed">{row.makcu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* Technical Specifications Matrix */}
      <section id="technical-specifications" className="space-y-6 scroll-mt-24">
        <div className="space-y-1">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">{currentFlow.speedLabel}</span>
          <h3 className="font-serif text-2xl font-semibold text-stone-950">{currentFlow.speedTitle}</h3>
        </div>

        {/* Featured Specification Cards with Icons */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          <motion.div 
            variants={cardItemVariants}
            whileHover={{ scale: 1.02, translateY: -4 }}
            className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4 hover:shadow-md transition-all marble-slab-card"
          >
            <div className="h-10 w-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center">
              <Zap className="h-4 w-4 text-stone-800" />
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">{currentFlow.speed1Label}</div>
              <h4 className="font-serif text-sm font-bold text-stone-900 font-semibold">{currentFlow.speed1Title}</h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {currentFlow.speed1Desc}
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={cardItemVariants}
            whileHover={{ scale: 1.02, translateY: -4 }}
            className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4 hover:shadow-md transition-all marble-slab-card"
          >
            <div className="h-10 w-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center">
              <Bluetooth className="h-4 w-4 text-stone-800" />
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">{currentFlow.speed2Label}</div>
              <h4 className="font-serif text-sm font-bold text-stone-900 font-semibold">{currentFlow.speed2Title}</h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {currentFlow.speed2Desc}
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={cardItemVariants}
            whileHover={{ scale: 1.02, translateY: -4 }}
            className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4 hover:shadow-md transition-all marble-slab-card"
          >
            <div className="h-10 w-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center">
              <Network className="h-4 w-4 text-stone-800" />
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">{currentFlow.speed3Label}</div>
              <h4 className="font-serif text-sm font-bold text-stone-900 font-semibold">{currentFlow.speed3Title}</h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {currentFlow.speed3Desc}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

    </motion.div>
  );
}
