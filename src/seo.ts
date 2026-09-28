import { Language } from './LanguageContext';
import { TabKey } from './App';

export interface TabSeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  robots: string;
  schema?: Record<string, unknown>;
}

export function getTabSeo(tab: TabKey, language: Language, currentPath: string): TabSeoConfig {
  const isZh = language === 'zh';
  const isJa = language === 'ja';

  switch (tab) {
    case 'overview':
      return {
        title: isZh
          ? '天御 (ANTHE) — 硬件级蓝牙物理网桥与双机隔离系统'
          : isJa
          ? 'ANTHE — 物理Bluetooth HIDネットワークブリッジ'
          : 'ANTHE — Hardware-in-the-Loop Assistive Solution & Physical HID Bridge',
        description: isZh
          ? '天御 是一款非侵入式物理信号桥接系统。将局域网指令转换为标准蓝牙HID报告，在游戏主机上零软件驱动特征。'
          : isJa
          ? 'ソフトウェア入力をBluetooth HID規格レポートに直接変換し、ゲームホストPCに一切のドライバ・フックを要さない非侵入型物理ブリッジ。'
          : 'Non-intrusive physical bridge that routes input signals across an isolated local network. Translates software inputs into standard Bluetooth HID reports with zero host drivers.',
        canonicalPath: '/',
        robots: 'index, follow',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: isZh ? '天御' : 'ANTHE',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Linux, Windows, macOS',
          description: 'Network-to-Bluetooth physical HID input bridge providing non-intrusive signal routing with zero kernel drivers.',
          url: 'https://anthetech.me/',
          publisher: {
            '@type': 'Organization',
            name: 'Anthe Digital Systems Ltd.',
            url: 'https://anthetech.me',
            email: 'support@anthetech.me'
          }
        }
      };

    case 'faq':
      return {
        title: isZh
          ? '概念解析与硬件规格参数 · 天御 (ANTHE)'
          : isJa
          ? 'よくある質問とハードウェア仕様 · ANTHE'
          : 'Conceptual FAQ & Technical Specifications · ANTHE',
        description: isZh
          ? '深入了解物理蓝牙重定向工程设计、内核级反作弊规避机制（Vanguard、EAC、BattlEye）与推荐硬件配置规格。'
          : isJa
          ? '物理Bluetoothリダイレクトのアーキテクチャ、アンチチート対策原理、推奨ハードウェア構成を解説。'
          : 'Explore the engineering behind hardware-level Bluetooth redirection, kernel anti-cheat bypass mechanisms (Vanguard, EAC, BattlEye), and hardware recommendations.',
        canonicalPath: '/faq',
        robots: 'index, follow',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Why is physical hardware redirection required to bypass kernel anti-cheat systems?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Conventional virtual input techniques rely on kernel-level hooks or virtual bus drivers, which modern anti-cheat solutions flag. Anthe routes raw coordinates across a local network to an isolated machine that broadcasts authentic Bluetooth HID packets directly to the host.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can Anthe be paired with Direct Memory Access (DMA) hardware?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Anthe serves as the isolated physical injection endpoint for DMA cards and computer vision pipelines, keeping targeting logic entirely off the primary host machine.'
              }
            }
          ]
        }
      };

    case 'tutorials':
      return {
        title: isZh
          ? '系统部署与使用文档 · 天御 (ANTHE)'
          : isJa
          ? 'ドキュメントと構築ガイド · ANTHE'
          : 'Documentation & Setup Guide · ANTHE',
        description: isZh
          ? 'Linux 物理网桥部署与端到端配置教程，涵盖无状态 UDP 套接字绑定与硬件在环鼠标信号注入。'
          : isJa
          ? 'Linuxエミュレータノード構築、UDPソケットバインド、ハードウェアインザループ接続の完全マニュアル。'
          : 'Step-by-step setup guides for Linux emulator nodes, UDP socket bindings, and hardware-in-the-loop mouse injection.',
        canonicalPath: '/documentation',
        robots: 'index, follow',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'Anthe Linux Bridge Setup and Integration Guide',
          description: 'Step-by-step instructions for deploying the Linux HID emulator node and configuring UDP network input relay.',
          author: {
            '@type': 'Organization',
            name: 'Anthe Digital Systems Ltd.'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Anthe Digital Systems Ltd.',
            url: 'https://anthetech.me'
          }
        }
      };

    case 'developer':
      return {
        title: isZh
          ? '开发者接口与 7 字节 UDP 协议规范 · 天御 (ANTHE)'
          : isJa
          ? '開発者向け7バイトUDP通信プロトコル仕様 · ANTHE'
          : 'Developer API & 7-Byte UDP Protocol · ANTHE',
        description: isZh
          ? '7 字节紧凑型无状态 UDP 二进制通信协议规范，提供开箱即用的 C#、C++ 与 Python 异步客户端代码模板。'
          : isJa
          ? '7バイト固定長UDPバイナリパケット仕様およびC#、C++、Python対応の非同期クライアント実装コード。'
          : 'Technical specification of the compact 7-byte packed UDP binary payload with ready-to-use C#, C++, and Python client integration templates.',
        canonicalPath: '/developer',
        robots: 'index, follow',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'Anthe UDP Binary Protocol Specification',
          articleBody: '7-byte packed binary structure with 0xAB sentinel byte, little-endian dx/dy coordinates, button bitmask, and rolling sequence counter.',
          publisher: {
            '@type': 'Organization',
            name: 'Anthe Digital Systems Ltd.',
            url: 'https://anthetech.me'
          }
        }
      };

    case 'shop':
      return {
        title: isZh
          ? '官方商店与永久软件授权 · 天御 (ANTHE)'
          : isJa
          ? 'ショップ・永久ライセンス購入 · ANTHE'
          : 'Shop & Perpetual Licenses · ANTHE',
        description: isZh
          ? '选购天御 HID 物理网桥官方永久许可密钥与精选硬件套件，数字密钥即时交付，合规安全。'
          : isJa
          ? 'Anthe HIDブリッジの正規パーペチュアルライセンスおよび検証済みハードウェアキットをご購入いただけます。'
          : 'Purchase official perpetual licenses and verified hardware kits for the Anthe HID Bridge. Instant digital delivery and UK CRA 2015 compliant.',
        canonicalPath: '/shop',
        robots: 'index, follow',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Anthe HID Bridge Perpetual License',
          description: 'Perpetual commercial license key for the Anthe Linux HID emulator software stack.',
          offers: {
            '@type': 'Offer',
            price: '60.00',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'Anthe Digital Systems Ltd.'
            }
          }
        }
      };

    case 'terms':
      return {
        title: isZh
          ? '服务条款与最终用户许可协议 · 天御 (ANTHE)'
          : isJa
          ? '販売規約およびエンドユーザー使用許諾契約 · ANTHE'
          : 'Terms of Sale & End-User License Agreement · ANTHE',
        description: isZh
          ? 'Anthe Digital Systems Ltd. 最终用户许可协议 (EULA)、永久授权规范及英国 2015 年消费者权利法案条款。'
          : isJa
          ? 'Anthe Digital Systems Ltd. のエンドユーザー使用許諾契約（EULA）および英国2015年消費者権利法に基づく規約。'
          : 'Anthe Digital Systems Ltd. End-User License Agreement (EULA), perpetual license terms, and statutory consumer rights under UK CRA 2015.',
        canonicalPath: '/terms',
        robots: 'index, follow'
      };

    case '404':
    default:
      return {
        title: isZh
          ? '404 页面未找到 · 端点超出作用域 · 天御 (ANTHE)'
          : isJa
          ? '404 ページが見つかりません · 未解決のエンドポイント · ANTHE'
          : '404 Not Found · Route Unresolved · ANTHE',
        description: isZh
          ? '所请求的网络路由未能解析到任何活跃的物理硬件网桥或虚拟节点。'
          : isJa
          ? '要求されたネットワークパスは稼働中のハードウェアブリッジに解決できませんでした。'
          : 'The requested route does not resolve to an active hardware bridge or virtual node. Check your URL address or return to the overview.',
        canonicalPath: currentPath || '/404',
        robots: 'noindex, follow'
      };
  }
}
