import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  Clock,
  Lock,
  RefreshCw,
  X,
  Scale
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import AntheLogo from './AntheLogo';
import Markdown from 'react-markdown';
import { markdownContent } from './TermsTab';

export default function ShopTab() {
  const { language, t } = useLanguage();

  // License purchase state stored locally
  const [isPurchased, setIsPurchased] = useState<boolean>(() => {
    return localStorage.getItem('anthe_license_purchased') === 'true';
  });

  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'form' | 'processing' | 'success'>('idle');
  const [showTOSModal, setShowTOSModal] = useState<boolean>(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState<boolean>(false);
  const tosScrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTOSModal) {
      const timer = setTimeout(() => {
        if (tosScrollRef.current) {
          const el = tosScrollRef.current;
          if (el.scrollHeight <= el.clientHeight) {
            setHasScrolledToBottom(true);
          }
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [showTOSModal]);

  const handleTOSScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const threshold = 15;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + threshold;
    if (isAtBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const [email, setEmail] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Save state on change
  useEffect(() => {
    if (isPurchased) {
      localStorage.setItem('anthe_license_purchased', 'true');
    } else {
      localStorage.removeItem('anthe_license_purchased');
    }
  }, [isPurchased]);

  const handleResetLicense = () => {
    setIsPurchased(false);
    setCheckoutStep('idle');
    setEmail('');
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
  };

  const shopUIText = {
    en: {
      badge: "OFFICIAL HARDWARE SUITE",
      title: "Acquire Lifetime Access",
      desc: "Unlock standard firmware suites, dual-PC HID injection channels, and direct hardware support options. One key, perpetual support.",
      perpetual: "Perpetual",
      unif: "ANTHE Liscense",
      subdesc: "A comprehensive hardware injection license covering the entire physical signal emulation stack and secure endpoint routing protocols.",
      priceDetail: "One-time payment. Zero recurring fees.",
      lifetimeText: "USD / LIFETIME",
      activeLicense: "License Currently Active",
      acquireBtn: "ACQUIRE LICENSE",
      guaranteeHeader: "The Perpetual Guarantee",
      timelineTitle: "Perpetual Support Timeline",
      timelineDesc: "Once mapped, the signature remains constant. Updates to the emulator are delivered via client side binaries for raw local hardware injection.",
      complTitle: "Compliance & Assurance",
      complDesc: "Bypass synthetic drivers cleanly using hardware-authentic protocols that fully mimic physical user setups.",
      selectTerm: "Select ACQUIRE LICENSE to access the offline simulated payment terminal.",
      secGateway: "Secure Gateway",
      chkPortal: "CHECKOUT PORTAL",
      chkPortalDesc: "The payment terminal has been updated. Perpetual licenses are processed through our secure external checkout partner. Click below to continue to the checkout gateway.",
      totalDue: "Total Due",
      proceedBtn: "PROCEED TO CHECKOUT LINK",
      goBack: "Go Back",
      valSigs: "Validating Hardware Signatures...",
      secL2CAP: "Securing direct physical L2CAP link parameters",
      successActive: "Active Perpetual License",
      payConfirmed: "Payment Confirmed",
      successDesc: "Your Anthe Liscense perpetual license is now validated on this local node. Your hardware identifier signature has been mapped and verified.",
      licType: "LICENSE TYPE:",
      nodeId: "NODE ID:",
      fwStatus: "FIRMWARE STATUS:",
      signedActive: "Signed & Active",
      simulateBtn: "Simulate New Order",
      pType: "Perpetual Hub"
    },
    zh: {
      badge: "官方硬件许可套件",
      title: "获取终身商业授权",
      desc: "解锁标准固件控制套件、双机物理 HID 模拟注入信道及专人技术顾问服务。一次买断，永久维护。",
      perpetual: "永久授权",
      unif: "Anthe Liscense 核心授权",
      subdesc: "覆盖完整实体设备仿射框架、信号拦截底层及 UDP 机间端对端高频路由协议在内的高级授权协议书。",
      priceDetail: "一次性付清。绝无任何后期二次订阅费用。",
      lifetimeText: "美元 / 终生有效",
      activeLicense: "数字证书目前处于激活状态",
      acquireBtn: "获取终身商业授权",
      guaranteeHeader: "终身维护服务承诺",
      timelineTitle: "永久性的更新支持保证",
      timelineDesc: "一旦硬件指纹完成配对，数据特征终身可维持。一切桥接层驱动更新将直接通过独立的本地应用程序自动拉取注入。",
      complTitle: "符合消费者法律合规要求",
      complDesc: "完全遵循英国 Consumer Rights Act 2015 规定，保障产品在无缝映射时的满意品质、符合描述与故障赔偿权益。",
      selectTerm: "请选择上方“获取终身商业授权”来载入内置的模拟支付中继模块。",
      secGateway: "安全局域网网关",
      chkPortal: "结账中端",
      chkPortalDesc: "网关已升级。永久数字授权密钥将自动通过我们的离线隔离付款合作商加密签署。请点击下方专属安全链接开始确认操作。",
      totalDue: "总计支付金额",
      proceedBtn: "前往外部安全账单付款链接",
      goBack: "返回上一步",
      valSigs: "正在校验硬件设备签名...",
      secL2CAP: "正在向副机加密握手专用 L2CAP 射频映射端口",
      successActive: "永久商业授权签署成功",
      payConfirmed: "中立付款已确认",
      successDesc: "您的 Anthe Liscense 终身授权证书已在本物理主机完成注册。系统已自动在本地完成您的多重网口标识特征绑定。",
      licType: "授权类别：",
      nodeId: "计算节点指纹：",
      fwStatus: "硬件级状态：",
      signedActive: "已签署并在环工作",
      simulateBtn: "模拟并下达新订单",
      pType: "Perpetual 物理节点"
    },
    ja: {
      badge: "公式ライセンス発行センター",
      title: "永続アクセス権の取得",
      desc: "标准エミュレータツール、デュアルPC用物理HID通信プロトコル、及び永続保守サポートオプションを解除。一度の購入で永年適用。",
      perpetual: "永年型",
      unif: "ANTHE Liscense ライセンス",
      subdesc: "物理信号伝送・カプセル化レイヤ全体とセキュリティ規格、UDP通信セグメントを包括的にカバーする完全なライセンス証書。",
      priceDetail: "一回限りの購入プラン。月額費用等の追加請求は絶対にありません。",
      lifetimeText: "USD / 永年利用",
      activeLicense: "ライセンスは正常にアクティブです",
      acquireBtn: "ライセンスを取得",
      guaranteeHeader: "永年購入におけるコミットメント",
      timelineTitle: "安心のロングタイム更新",
      timelineDesc: "マッピング後は信号定義が一定に保たれます。アップデートはローカル実行バイナリによって端末へ透過的に適用されます。",
      complTitle: "消費者法規を遵守",
      complDesc: "英国消費者権利法 (CRA 2015) に適合。商品の満足基準、明記仕様、不具合対策等の購入者権利が守られます。",
      selectTerm: "「ライセンスを取得」を選択して簡易シミュレーション決済画面を呼び出します。",
      secGateway: "決済用セキュアゲートウェイ",
      chkPortal: "決済画面ポータル",
      chkPortalDesc: "決済端末が更新されました。永続ライセンスの決済は弊社のセキュアな提携チェックアウトリンクへ移行します。下記をクリックして進めてください。",
      totalDue: "適用額合計",
      proceedBtn: "セキュアチェックアウトを開く",
      goBack: "前の画面へ戻る",
      valSigs: "ハードウェア固有の署名を検証中...",
      secL2CAP: "独立L2CAPペアリングアドレスを保護暗号化しています",
      successActive: "永続ライセンス登録完了",
      payConfirmed: "ご入金を検知・認証しました",
      successDesc: "Anthe Liscense ライセンスのホスト登録および認証がローカルにて安全に成立しました。ご使用機器のMACアドレス特徴とペアリングされています。",
      licType: "ライセンス区分：",
      nodeId: "ノードIDシグネチャ：",
      fwStatus: "ファームウェア状況：",
      signedActive: "署名完了・動作中",
      simulateBtn: "他の注文を模倣シミュレート",
      pType: "Perpetual ハブ"
    }
  };

  const ui = shopUIText[language as 'en' | 'zh' | 'ja'] || shopUIText.en;

  const featuresDict = {
    en: [
      'Full Signal Emulation Engine access',
      'Simulated Dual-PC coordinate merging',
      'Low-latency custom L2CAP interrupt profiles',
      'Standard device payload verification',
      'Lifetime updates on physical bridge modules'
    ],
    zh: [
      '全功能信号仿真引擎访问权',
      '多机协同 (Co-Pilot) 控制合成技术',
      '极低延迟专有 L2CAP 射频中断配置文件',
      '标准/合法外设序列号自适应验证',
      '物理双端桥接模块永久免费升级'
    ],
    ja: [
      '全シグナル・エミュレーションエンジンの永続利用',
      'デュアルPC協調座標マージ (Co-Pilot) 機能',
      '超低遅延 L2CAP 専用プロファイルサポート',
      '標準 HID デバイス定義ファイルの自動構成',
      '送信・レシーーションブリッジの終身フリーアップデート'
    ]
  };

  const features = featuresDict[language as 'en' | 'zh' | 'ja'] || featuresDict.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-16 max-w-5xl mx-auto py-4"
    >
      {/* Editorial Title Block */}
      <div className="text-center space-y-3">
        <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest block">
          {ui.badge}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-stone-950 tracking-wide font-light">
          {ui.title}
        </h2>
        <p className="text-xs text-stone-500 font-serif max-w-lg mx-auto leading-relaxed">
          {ui.desc}
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Product Showcase Card */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 14 }}
          whileHover={{ scale: 1.015, translateY: -3 }}
          className="md:col-span-5 h-full"
        >
          <div className="marble-slab-card p-8 rounded-3xl flex flex-col justify-between h-full space-y-8 min-h-[460px] relative overflow-hidden bg-white/95 border border-stone-200/60 shadow-xs">
            {/* Elegant corner pill */}
            <div className="absolute top-4 right-4 bg-stone-900 text-stone-100 text-[9px] font-mono tracking-widest px-3 py-1 rounded-full uppercase">
              {ui.perpetual}
            </div>

            <div className="space-y-6">
              <div className="h-10 w-10 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-center">
                <AntheLogo size={22} color="#1c1917" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold tracking-tight text-stone-950">{ui.unif}</h3>
                <p className="text-xs text-stone-550 leading-relaxed font-light">
                  {ui.subdesc}
                </p>
              </div>

              {/* Price Tag */}
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-extrabold text-stone-950">$15</span>
                  <span className="text-xs text-stone-400 font-mono uppercase tracking-wider">{ui.lifetimeText}</span>
                </div>
                <span className="text-[9px] text-stone-500 font-mono block mt-1">{ui.priceDetail}</span>
              </div>

              {/* Specs Check list */}
              <div className="space-y-3 pt-2">
                {features.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-600">
                    <Check className="h-4 w-4 text-stone-800 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              {isPurchased ? (
                <div className="bg-stone-50 border border-stone-200/80 p-3 rounded-2xl flex items-center justify-between animate-fade">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-stone-800" />
                    <span className="text-xs font-serif font-bold text-stone-900">{ui.activeLicense}</span>
                  </div>
                  <button 
                    onClick={handleResetLicense}
                    title="Simulate Reset"
                    className="text-stone-400 hover:text-stone-700 transition-colors p-1 hover:bg-stone-100 rounded-lg cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                checkoutStep === 'idle' && (
                  <button
                    onClick={() => {
                      setHasScrolledToBottom(false);
                      setShowTOSModal(true);
                    }}
                    className="w-full py-3.5 px-6 rounded-full bg-stone-950 hover:bg-stone-850 text-[#faf9f6] text-xs font-bold tracking-widest transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{ui.acquireBtn}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-stone-400" />
                  </button>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Transaction Terminal Grid Section */}
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            {/* Step 1: Info & Pitch (Idle) */}
            {checkoutStep === 'idle' && !isPurchased && (
              <motion.div
                key="idle-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="marble-slab-card p-8 rounded-3xl space-y-6 min-h-[460px] flex flex-col justify-between bg-white/95 border border-stone-200/60 shadow-xs hover:scale-[1.01] transition-transform"
              >
                <div className="space-y-6">
                  <h4 className="font-serif text-lg font-bold text-stone-950 border-b border-stone-100 pb-3">{ui.guaranteeHeader}</h4>
                  
                  <div className="grid gap-6">
                    <div className="flex gap-4 items-start">
                      <div className="h-8 w-8 rounded-lg bg-stone-50 border border-stone-250/20 flex items-center justify-center shrink-0">
                        <Clock className="h-4 w-4 text-stone-700" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-serif text-sm font-semibold text-stone-900">{ui.timelineTitle}</h5>
                        <p className="text-xs text-stone-500 leading-relaxed font-light">
                          {ui.timelineDesc}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="h-8 w-8 rounded-lg bg-stone-50 border border-stone-250/20 flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-4 w-4 text-stone-700" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-serif text-sm font-semibold text-stone-900">{ui.complTitle}</h5>
                        <p className="text-xs text-stone-500 leading-relaxed font-light">
                          {ui.complDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-stone-400 font-mono text-[10px] flex items-center gap-2 bg-stone-50 p-3.5 rounded-2xl border border-stone-200/50">
                  <span className="h-2 w-2 rounded-full bg-stone-500"></span>
                  <span>{ui.selectTerm}</span>
                </div>
              </motion.div>
            )}

            {/* Step 2: External Billing Link */}
            {checkoutStep === 'form' && (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="marble-slab-card p-8 rounded-3xl space-y-6 min-h-[460px] flex flex-col justify-between bg-white/95 border border-stone-200/60 shadow-xs"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <h4 className="font-serif text-lg font-bold text-stone-950">{ui.secGateway}</h4>
                    <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider">{ui.chkPortal}</span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {ui.chkPortalDesc}
                  </p>

                  <div className="bg-stone-50/70 p-4.5 rounded-2xl border border-stone-150 space-y-2.5">
                    <div className="flex justify-between text-xs text-stone-600">
                      <span>{ui.unif}</span>
                      <span className="font-mono font-semibold text-stone-900">$15.00 {t.shop.currency || 'USD'}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-stone-950 border-t border-stone-200/50 pt-2.5">
                      <span>{ui.totalDue}</span>
                      <span className="font-mono text-sm text-stone-950">$15.00</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCheckoutStep('processing');
                      setTimeout(() => {
                        setIsPurchased(true);
                        setCheckoutStep('success');
                      }, 1200);
                    }}
                    className="w-full py-3.5 px-6 rounded-full bg-stone-950 hover:bg-stone-800 text-[#faf9f6]/95 text-xs font-bold tracking-widest transition-all shadow-md active:scale-[0.98] text-center block cursor-pointer uppercase"
                  >
                    {ui.proceedBtn}
                  </a>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('idle')}
                    className="w-full py-2.5 text-stone-500 hover:text-stone-800 text-xs font-semibold tracking-wider transition-all cursor-pointer text-center"
                  >
                    {ui.goBack}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Processing Screen */}
            {checkoutStep === 'processing' && (
              <motion.div
                key="processing-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="marble-slab-card p-8 rounded-3xl flex flex-col items-center justify-center space-y-6 min-h-[460px] text-center"
              >
                <div className="relative flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full border-2 border-stone-105 border-t-stone-805 animate-spin" />
                  <AntheLogo size={24} color="#1c1917" className="absolute" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-stone-950">{ui.valSigs}</h4>
                  <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-mono uppercase tracking-wider">
                    {ui.secL2CAP}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success Message */}
            {(checkoutStep === 'success' || isPurchased) && (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="marble-slab-card p-8 rounded-3xl flex flex-col justify-between min-h-[460px] animate-fade"
              >
                <div className="space-y-6 text-center py-6">
                  <div className="h-14 w-14 bg-stone-50 border border-stone-200 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="h-7 w-7 text-stone-900" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl font-black text-stone-950 tracking-tight">{ui.successActive}</h4>
                    <span className="text-[9px] text-[#2e7d32] border border-[#2e7d32]/20 bg-[#f1f8e9] px-2.5 py-0.5 rounded-full font-mono uppercase font-semibold">
                      {ui.payConfirmed}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed max-w-md mx-auto font-light">
                    {ui.successDesc}
                  </p>

                  <div className="max-w-xs mx-auto border border-stone-200/50 rounded-2xl bg-[#fafaf9] p-4 text-left font-mono text-[10px] space-y-2.5 text-stone-605">
                    <div className="flex justify-between border-b border-stone-200/55 pb-1.55">
                      <span>{ui.licType}</span>
                      <strong className="text-stone-900">{ui.pType}</strong>
                    </div>
                    <div className="flex justify-between border-b border-stone-200/55 pb-1.55">
                      <span>{ui.nodeId}</span>
                      <strong className="text-stone-900">7A-EE-5B-E9-2C</strong>
                    </div>
                    <div className="flex justify-between pb-0.55">
                      <span>{ui.fwStatus}</span>
                      <strong className="text-stone-900">{ui.signedActive}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleResetLicense}
                    className="w-full py-3 px-6 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-605 text-xs font-semibold tracking-wider transition-all cursor-pointer text-center"
                  >
                    {ui.simulateBtn}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Comparative Section: Anthe vs KmBox vs Makcu */}
      <section className="space-y-8 max-w-5xl mx-auto px-4 mt-8 border-t border-stone-200/50 pt-16">
        <div className="text-center space-y-2">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">{t.shop.comparisons.tag}</span>
          <h3 className="font-serif text-3xl font-light text-stone-950">{t.shop.comparisons.title}</h3>
          <p className="text-xs text-stone-550 max-w-xl mx-auto font-light leading-relaxed">
            {t.shop.comparisons.desc}
          </p>
        </div>

        {/* Comparison Desktop Grid & Mobile Stack */}
        <div className="overflow-hidden border border-stone-200/65 rounded-3xl bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200/65">
                  <th className="p-4.5 font-sans font-semibold text-xs text-stone-900 tracking-wider">{t.shop.comparisons.metricsHeader}</th>
                  <th className="p-4.5 font-sans font-bold text-xs text-stone-950 tracking-wider bg-stone-100/45 relative">
                    <span className="absolute top-2 right-4 bg-stone-900 text-stone-100 font-mono text-[8px] tracking-widest px-2 py-0.5 rounded-full uppercase scale-90 text-[7px]">{t.shop.comparisons.badgeDigital}</span>
                    {t.shop.comparisons.antheCol}
                  </th>
                  <th className="p-4.5 font-sans font-semibold text-xs text-stone-600 tracking-wider">KmBox (Hardware Board)</th>
                  <th className="p-4.5 font-sans font-semibold text-xs text-stone-600 tracking-wider">Makcu (Hardware Board)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs text-stone-600">
                {t.shop.comparisons.rows.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                    <td className="p-4.5 font-semibold text-stone-850">{row.metric}</td>
                    <td className="p-4.5 text-stone-950 font-bold bg-stone-100/20">{row.anthe}</td>
                    <td className="p-4.5 text-stone-500 font-light">{row.kmbox}</td>
                    <td className="p-4.5 text-stone-500 font-light">{row.makcu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Terms of Service Popup Modal */}
      <AnimatePresence>
        {showTOSModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs"
          >
            {/* Modal Card container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white border border-stone-200/85 rounded-3xl p-6 sm:p-8 max-w-xl w-full flex flex-col max-h-[85vh] shadow-xl overflow-hidden animate-fade"
            >
              {/* Close Button top-right */}
              <button
                onClick={() => setShowTOSModal(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 transition-colors hover:bg-stone-50 rounded-full cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1.5 pr-6 border-b border-stone-200/50 pb-4 mb-4 select-none">
                <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Scale className="h-3 w-3" /> {t.terms?.badge || 'TOS'}
                </span>
                <h3 className="font-serif text-2xl font-light text-stone-950">
                  {t.terms?.title || 'Terms & Conditions'}
                </h3>
                <p className="text-[11px] text-stone-405 font-light font-serif">
                  {t.terms?.subtitle}
                </p>
              </div>

              {/* Guide prompt */}
              {!hasScrolledToBottom && (
                <div className="text-[10px] text-stone-600 font-mono uppercase bg-amber-50/70 border border-amber-200/40 p-2.5 rounded-xl mb-3 flex items-center justify-center gap-2 animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                  <span>Please scroll to the bottom to agree and confirm</span>
                </div>
              )}

              {/* Scrollable TOS Area */}
              <div
                ref={tosScrollRef}
                onScroll={handleTOSScroll}
                className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs text-stone-650 leading-relaxed font-light bg-stone-50/50 p-4 rounded-2xl border border-stone-200/40"
              >
                <div className="markdown-body text-stone-700 font-light prose-headings:font-serif prose-headings:font-normal prose-h1:text-xl prose-h2:text-sm prose-a:text-stone-900 prose-a:underline prose-strong:font-bold prose-strong:text-stone-900 prose-hr:border-stone-200 text-[11px] prose-p:text-[11px] prose-li:text-[11px]">
                  <Markdown>{markdownContent}</Markdown>
                </div>
              </div>

              {/* Bottom Buttons / Confirms */}
              <div className="pt-4 border-t border-stone-200/40">
                <AnimatePresence mode="wait">
                  {hasScrolledToBottom ? (
                    <motion.div
                      key="confirm-btn"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                    >
                      <a
                        href="https://discord.gg/FwYt3j9kyN"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowTOSModal(false)}
                        className="w-full py-3 px-6 rounded-full bg-stone-950 hover:bg-stone-850 text-[#faf9f6]/95 text-xs font-bold tracking-widest transition-all shadow-md text-center block cursor-pointer uppercase flex items-center justify-center gap-2"
                      >
                        <span>Agree and Confirm</span>
                        <ArrowRight className="h-3.5 w-3.5 text-stone-400" />
                      </a>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="disabled-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      disabled
                      className="w-full py-3 px-6 rounded-full bg-stone-100 text-stone-400 text-xs font-bold tracking-widest transition-all cursor-not-allowed text-center block uppercase select-none opacity-60"
                    >
                      Agree and Confirm
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
