import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Usb, 
  Download, 
  Layers, 
  Settings, 
  FolderPlus, 
  Power, 
  ShieldAlert, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight, 
  Check, 
  AlertTriangle,
  Copy
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering list checking when clicking copy
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button 
      onClick={handleCopy}
      type="button" 
      className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono tracking-wider text-stone-400 hover:text-stone-100 bg-stone-800/80 hover:bg-stone-800 border border-stone-700/50 rounded transition-all cursor-pointer select-none shrink-0"
    >
      <Copy className="h-2.5 w-2.5 text-stone-500" />
      {copied ? 'COPIED!' : 'COPY'}
    </button>
  );
}

export default function DocumentationTab() {
  const [activePhase, setActivePhase] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [activeTroubleTab, setActiveTroubleTab] = useState<'bluetooth' | 'wifi'>('bluetooth');
  const { t, language } = useLanguage();

  const toggleStep = (stepKey: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  interface TroubleshootTabContent {
    shortTitle: string;
    title: string;
    desc: string;
    causeTitle: string;
    causeDesc: string;
    handshakeTitle?: string;
    handshakeSteps?: string[];
    wipeRecordsDesc: string;
    steps: {
      title: string;
      desc: string;
      bullets: string[];
      commands?: Record<string, string>;
    }[];
    readyPrompt: string;
  }

  interface TroubleshootData {
    bluetooth: TroubleshootTabContent;
    wifi: TroubleshootTabContent;
  }

  const getTroubleshootContent = (): TroubleshootData => {
    if (language === 'zh') {
      return {
        bluetooth: {
          shortTitle: "蓝牙配对重置",
          title: "蓝牙配对重置故障排查 (连接断开修复)",
          desc: "解决由于 Windows 游戏 PC 与 Linux 副机安全密匙不匹配导致的连接即时中断等非故障行为。",
          causeTitle: "故障成因解析",
          causeDesc: "因为您在 Windows 主机上删除了配对记录，Windows 删除了其与 Linux 电脑的加密安全密钥。然而，由于您的 Linux 电脑运行在持久化 USB 上，它的物理系统文件中仍然保存着旧的安全密钥。",
          handshakeTitle: "握手校验校验流程",
          handshakeSteps: [
            "物理信号握手初始化且保持绿通（Linux 副机顶部蓝牙浮现配对成功几秒）。",
            "Windows 主机与 Linux 副机交换底层的加密安全校对密钥。",
            "Windows 宣称: '我这里配对被除名了，让我们重新生成一个吧'，而 Linux 回应: '不对，我本地已经存有一份旧钥匙，且你的配对对不上'。",
            "安全校验协商失败，系统核心自动中断物理通道连接以维护网口隔离安全。"
          ],
          wipeRecordsDesc: "要解决此问题，我们必须强力清除两台 PC 的配对历史缓存，促成两台硬件完美同步交换全新的配对信任密钥。",
          steps: [
            {
              title: "步骤 1: 抹除 Windows 游戏 PC 的相关缓存设备",
              desc: "在 Windows 系统级设置中执行擦除操作：",
              bullets: [
                "打开 Windows 按钮面板，选择 \"设置 > 蓝牙和其他设备\"。",
                "在配对项内寻觅 \"ANTHE\"、\"HID MOUSE BRIDGE\" 或任何带有 Linux 图标的桥接键鼠外设，点击右侧的 \"三个点\"，将其完全删除。",
                "关键点：关闭 Windows 蓝牙总闸，空置大概 5 秒，此后再度开启蓝牙总闸 (这会迫使 Windows 物理内存深度重建其蓝牙连接数据库)。"
              ],
              commands: {}
            },
            {
              title: "步骤 2: 抹除 Linux 目标系统上的物理旧密钥",
              desc: "我们必须进入 Linux 底层蓝牙交互面板强制移除特定的主配置记录：",
              bullets: [
                "在 Linux 桌面，按快捷键组合或点选顶部寻找终端工具 (Terminal)。",
                "运行以下指令，获取蓝牙终端特权并启动交互面板：",
                "在交互命令行行尾指示符处输入 \"devices\" (不含引号) 并回车：",
                "寻阅列印打印出的设备历史 MAC 链路地址 (例如: 5C:F3:FC:0A:12:3B)。",
                "通过 remove 命令及对应 MAC 地址将其完全抹掉：",
                "注: 示范操作如: remove 5C:F3:FC:0A:12:3B",
                "注销并输入 \"exit\" 按下回车，退出交互特权控制面板。"
              ],
              commands: {
                step2: "sudo bluetoothctl",
                step3: "devices",
                step5: "remove YOUR_WINDOWS_MAC_ADDRESS"
              }
            },
            {
              title: "步骤 3: 重启 Linux 主体蓝牙控制服务",
              desc: "重启底层守护进程可以完美修复由于多次非法握手造成的硬件挂起：",
              bullets: [
                "执行服务强制重置重载内核指令："
              ],
              commands: {
                step1: "sudo systemctl restart bluetooth"
              }
            },
            {
              title: "步骤 4: 执行全新无污染的加密配对",
              desc: "此时双机皆已处于纯机械清空状态，执行最终的快速握手配对：",
              bullets: [
                "在 Linux 终端中再度唤起命令行控制模块：",
                "依次输入以下这三行指令令以便对外广播 Linux 它的开放可搜寻性：",
                "前往您的 Windows 游戏电脑，进入 \"添加设备 > 蓝牙\" 搜索接口。",
                "点选点击检测到的可用外设 \"ANTHE\" (遇到严重缓存可能临时显示 \"HID MOUSE BRIDGE\"，皆属于正常现象请放心选取)。",
                "此刻紧盯 Linux 指令行面板——您会接收到一个配对授权 (Passkey / Confirm) 问题流。请立即输入 \"yes\" 并敲击回车。",
                "最后输入并信任 Windows 主机，使后续物理信号可以永远自动化通过：",
                "操作结束后，输入 exit 回车即代表流程终结。"
              ],
              commands: {
                step1: "sudo bluetoothctl",
                step2: "power on\npairable on\ndiscoverable on",
                step6: "trust YOUR_WINDOWS_MAC_ADDRESS"
              }
            }
          ],
          readyPrompt: "两侧配对已重建！您随时可以在 Linux 上跑 sudo ./run.sh 并在您的主控机（来源端）启动包含 UDP 直接发射代码逻辑的脚本或源程序。桥接传输永远安全、绝不掉线。"
        },
        wifi: {
          shortTitle: "Wi-Fi 连接异常",
          title: "Linux 无线网络无法连接排查",
          desc: "解决由于 Windows 快速启动（Fast Startup）锁死无线网卡、导致二级 Linux 系统无法检测或连接 Wi-Fi 网络的问题。",
          causeTitle: "为什么 Wi-Fi 无法载入",
          causeDesc: "当 Windows 正常关机时，通常会启用默认的「快速启动」功能。这会将内核驱动挂起，导致 Wi-Fi网卡保持在被 Windows 独占/锁定的状态。因此，进入 Linux 系统时，无线网卡便无法被正常识别与驱动。",
          handshakeTitle: "",
          handshakeSteps: [],
          wipeRecordsDesc: "要解决此问题，我们必须要在 Windows 系统上执行一次携带 Shift 键的“硬件深层冷关机”，以释放被独占的无线网卡控制权。",
          steps: [
            {
              title: "步骤 1: 物理断开 Linux 连接介质",
              desc: "安全拆卸启动硬件介质：",
              bullets: [
                "关闭您的笔记本电脑。",
                "拔掉并断开插在电脑上的 Linux 启动盘 (USB)。"
              ],
              commands: {}
            },
            {
              title: "步骤 2: 引导正常登录 Windows 系统",
              desc: "在 Windows 系统上完成桥接网卡的前置状态清理：",
              bullets: [
                "重新打开电源，不要进入 Boot 菜单，直接正常引导并开机进入 Windows 系统，等系统完全加载完毕。"
              ],
              commands: {}
            },
            {
              title: "步骤 3: 触发 SHIFT 强制硬级冷关机",
              desc: "在 Windows 系统级电源管理中触发底层电气断电：",
              bullets: [
                "在 Windows 正常加载后，点击左下角的「开始菜单」，并点击「电源」图标按钮。",
                "在键盘上按住「SHIFT」按键千万不要放开，随后用鼠标点击菜单里的「关机」选项。",
                "持续保持按住 SHIFT 键直到屏幕黑色并完全关机（确保所有的电源指示灯、键盘灯以及风扇全部停止）。"
              ],
              commands: {}
            },
            {
              title: "步骤 4: 重插启动盘引导进入 Linux 进行验证",
              desc: "回到 Linux 测试网卡载入情况：",
              bullets: [
                "将您的 Linux 启动盘 (USB) 重新插回笔记本电脑。",
                "开启笔记本电脑，引导进入 Ubuntu，检查您的 Wi-Fi 网络是否能被正常发现和连接。"
              ],
              commands: {}
            }
          ],
          readyPrompt: "Shift强制硬级冷关机完美释放了硬件网卡的控制锁定！当前 Linux 能够完美支配物理网卡，并恢复 Wi-Fi 网络的发现及畅连功能。"
        }
      };
    } else if (language === 'ja') {
      return {
        bluetooth: {
          shortTitle: "Bluetooth接続復旧",
          title: "Bluetooth暗号化キーの完全同期トラブルクリア",
          desc: "WindowsおよびLinux間の暗号化キー齟齬から生じるBluetooth物理瞬断を一掃します。",
          causeTitle: "なぜ数秒で切断されるのか",
          causeDesc: "Windows 側でペアリング削除を行った事で、ゲーミングPCに存在した対Linux端末キーがパージされました。対して、Linux側は永続USBメモリ経由のため、システムに古い暗号鍵が維持され、検証摩擦を起こしています。",
          handshakeTitle: "ハンドシェイクの決裂ステップ",
          handshakeSteps: [
            "物理Bluetooth接続は一旦成立（Linux上の接続インジケータが点滅）。",
            "WindowsとLinux両者間でセキュリティ通信キー（暗号スタンプ）の持ち寄り試験が始まります。",
            "Windowsが「手元に合鍵が無いです、新しく創り直しましょう」と申し出ます。",
            "Linuxは「私の手元にはペアリング合鍵が。しかし、君のものとは形が合わない」と却下します。",
            "認証交渉決裂のため、システム安全上その場で通信シャットダウンが発生します。"
          ],
          wipeRecordsDesc: "完全に解決するためには、両マシンのBluetoothキャッシュを一掃し、まっさらの状態から鍵交換手順を踏む必要があります。",
          steps: [
            {
              title: "ステップ 1: Windows（ゲーミングPC）ペアリング履歴の清掃",
              desc: "Windows側で古いスタックプロセスデータを取り除きます：",
              bullets: [
                "「設定 > Bluetooth とデバイス」に飛びます。",
                "「ANTHE」、「HID MOUSE BRIDGE」、あるいは対象デバイス項目を見つけ、3点リーダーボタンより「デバイスの削除」を選択しゴミ箱へと送ります。",
                "非常に重要：Bluetooth 機能を一旦OFFに戻し、最低5秒待機後、再びONに戻します。(これによりBluetoothスタックからアクティブな切断キャッシュが徹底リセットされます)。"
              ],
              commands: {}
            },
            {
              title: "ステップ 2: Linux（アシスト副機）内の古い鍵の破棄",
              desc: "Linux側のシステムにスタックしている無効な証明鍵をコマンドラインから強制廃棄します：",
              bullets: [
                "Linuxのインターフェースより、端末（ターミナル）を表示させます。",
                "以下の最高権限コマンドを通じて、Bluetooth制御シェルに入ります：",
                "プロンプト上で「devices」とキーボード入力し、Enterキーを押してください：",
                "出力に並んだWindows PCのマシン識別MACコード（例: 5C:F3:FC:0A:12:3B）を特定します。",
                "特有の remove コマンドで相手MACアドレスを消去執行します：",
                "応用例: remove 5C:F3:FC:0A:12:3B",
                "お疲れ様でした。「exit」をタイピングしてEnterキーを押し、コントロールパネルから切断退出します。"
              ],
              commands: {
                step2: "sudo bluetoothctl",
                step3: "devices",
                step5: "remove YOUR_WINDOWS_MAC_ADDRESS"
              }
            },
            {
              title: "ステップ 3: Linux側 Bluetooth システムプロセスの再起動",
              desc: "スタックした未承認接続サービスをスレッドごと安全に殺して仕切り直します：",
              bullets: [
                "以下のコマンドによりサービスのリビルド実行を行います："
              ],
              commands: {
                step1: "sudo systemctl restart bluetooth"
              }
            },
            {
              title: "ステップ 4: まっさらな相互ペアリング交換確立",
              desc: "両名がお互いを新品として認識できるようになったため、本物の高精度ペアリングを接続します：",
              bullets: [
                "再度ターミナル上でBluetoothマネージャーを叩きます：",
                "この3つの待機指示を続けて実行し、Linux無線機器を検索解放します：",
                "Windows ゲーミングPCに戻り、「デバイスの追加 > Bluetooth」を実行してください。",
                "検出される名前「ANTHE」を選択（旧名のキャッシュにより一時的に「HID MOUSE BRIDGE」と表示されるケースもありますがそのままタップして結構です）。",
                "Linux側シェル画面にペアリングのパスコード合意応答（yes/no）が現れます。そのまま「yes」を入力してEnterをおしてください。",
                "最後に、次回の無線起動から自動的ログイン許可されるため、相手を恒久信頼します：",
                "※ MAC部分は先ほどの特定アドレス。すべて終えたら exit でシェルを終了します。"
              ],
              commands: {
                step1: "sudo bluetoothctl",
                step2: "power on\npairable on\ndiscoverable on",
                step6: "trust YOUR_WINDOWS_MAC_ADDRESS"
              }
            }
          ],
          readyPrompt: "暗号鍵の再構築に成功しました！あとはLinuxで「sudo ./run.sh」を起動し、ホスト側で対象スクリプトなどUDP発信源を実行開始させれば、瞬断を完全に克服した超高速デジタル橋が継続維持されます。"
        },
        wifi: {
          shortTitle: "Wi-Fi接続復旧",
          title: "Linux Wi-Fi接続エラーの解消",
          desc: "Windowsの高速スタートアップ機能がネットワークカードをロックすることにより、Linux側でWi-Fiが検出または接続できない不具合を解決します。",
          causeTitle: "Wi-Fiが認識されない原因",
          causeDesc: "Windowsが通常のシャットダウンを行う際、「高速スタートアップ」が機能していると、カーネルとハードウェアの状態を保存するためWi-FiカードがWindows側でロックされたままになります。その状態でLinuxを起動すると、カードの制御権が得られずWi-Fiが使用不能になります。",
          handshakeTitle: "",
          handshakeSteps: [],
          wipeRecordsDesc: "このハードウェア排他ロックを解除するために、Windows上でShiftキーを用いた完全シャットダウン（完全な電源オフ）を実行する必要があります。",
          steps: [
            {
              title: "ステップ 1: Linuxデバイス起動メディアの取り外し",
              desc: "起動用USBストレージを一時的にオフにします：",
              bullets: [
                "ノートPCの電源を一旦完全に切ります。",
                "PCに差し込まれているLinuxインストール（起動用）USBメモリを取り外します。"
              ],
              commands: {}
            },
            {
              title: "ステップ 2: 通常通り Windows にログイン",
              desc: "Windowsシステム上でワイヤレスカードのロッククリア事前準備を行います：",
              bullets: [
                "ノートPCの電源をONにし、何もしないで通常どおり Windows を起動させ、デスクトップが完全に表示されるまで待ちます。"
              ],
              commands: {}
            },
            {
              title: "ステップ 3: SHIFT キーを押しながらの完全シャットダウン",
              desc: "完全なる電源シャットダウン（冷シャットダウン）を実行します：",
              bullets: [
                "Windows画面左下の「スタートメニュー」を開き、「電源」アイコンをクリックします。",
                "キーボードの『Shiftキー』を押しっぱなしの状態で、画面上の『シャットダウン』メニューをクリックします。",
                "PCが完全に終了し、インジケータ灯やファンの音が100%停止するまで、Shiftキーを離さずにシャットダウン処理を進行させます。"
              ],
              commands: {}
            },
            {
              title: "ステップ 4: USB を再挿入したうえで Linux を起動し確認",
              desc: "Linuxで Wi-Fi 電波の検出確認を行います：",
              bullets: [
                "先ほど抜いた Linux 起動用 USB メモリを再度ポートに差し込みます。",
                "ノートPCを起動させ、お試しの Ubuntu システムを立ち上げます。",
                "デスクトップ上で Wi-Fi が検知され、アクセスポイントに正常接続可能か確認します。"
              ],
              commands: {}
            }
          ],
          readyPrompt: "Shiftキーを用いた完全シャットダウンにより、ネットワークハードウェア of 占有ロックが完全に解除されました！これで Linux がWi-Fiアダプターを正しく起動し、スムーズに接続できるようになります。"
        }
      };
    } else {
      return {
        bluetooth: {
          shortTitle: "Bluetooth Pairing Clear",
          title: "Bluetooth Pairing Reset (Correction of Connection Drops)",
          desc: "Resolve immediate pairing drops caused by Windows and Linux cryptographic key mismatch.",
          causeTitle: "Understanding the Mismatch",
          causeDesc: "Because you deleted the pairing record on your Windows PC, Windows deleted its cryptographic security key for the Linux PC. However, because your Linux PC is running on a persistent USB, it still has the old security key saved in its system files.",
          handshakeTitle: "Handshake Rejection Lifecycle",
          handshakeSteps: [
            "Physical connection succeeded briefly for a few seconds (Bluetooth icon on Linux).",
            "Windows host and Linux target attempt a secure exchange of Bluetooth pairing security keys.",
            "Windows states: 'I do not have a paired record, let's negotiate a brand new cryptographic pair!'",
            "Linux replies: 'Denied. I have an old cryptographic key saved locally, and your requested signature mismatches.'",
            "Security check fails; the Linux kernel drops the pairing connection promptly to protect system integrity."
          ],
          wipeRecordsDesc: "To resolve this permanently, we must completely purge the cached pairing logs on both systems to allow them to exchange complete, fresh, perfectly synchronised matching keys.",
          steps: [
            {
              title: "Step 1: Wipe the pairing records on Windows (Gaming Host)",
              desc: "Wipe connection traces within the Windows system interface:",
              bullets: [
                "Open Windows settings menu, go to \"Settings > Bluetooth & Devices\".",
                "If \"ANTHE\", \"HID MOUSE BRIDGE\", or any device associated with your Linux PC is listed, click the three dots and select Remove Device.",
                "Turn Bluetooth OFF, wait 5 seconds, and toggle it back ON (this forces a deep flush of active Windows bluetooth hardware adapter connections)."
              ],
              commands: {}
            },
            {
              title: "Step 2: Wipe the pairing records on Linux (Secondary Computer)",
              desc: "Forcibly delete cached cryptographic keys from the persistent directories on Linux:",
              bullets: [
                "In your Linux OS, open the Terminal application from the launcher or shortcuts.",
                "Start the interactive Bluetooth management tool in administrator mode:",
                "List all current registered devices remembered by the Linux bluetooth subsystem:",
                "Locate the entry pointing to your Windows PC and retrieve its MAC address (e.g., 5C:F3:FC:0A:12:3B).",
                "Remove the old signature record using your PC's exact MAC address:",
                "Example command: remove 5C:F3:FC:0A:12:3B",
                "Type exit and hit Enter to gracefully close the command shell."
              ],
              commands: {
                step2: "sudo bluetoothctl",
                step3: "devices",
                step5: "remove YOUR_WINDOWS_MAC_ADDRESS"
              }
            },
            {
              title: "Step 3: Restart the Linux Bluetooth Service daemon",
              desc: "To ensure any stuck connection processes in the kernel are cleared out, restart the driver daemon:",
              bullets: [
                "Execute a clean platform reload with this command:"
              ],
              commands: {
                step1: "sudo systemctl restart bluetooth"
              }
            },
            {
              title: "Step 4: Establish a Fresh, Coordinated Re-Pairing",
              desc: "Now that both computers have completely forgotten each other, pair them freshly:",
              bullets: [
                "Re-enter the Bluetooth interactive control console in the Linux terminal:",
                "Type these three commands consecutively to initialize and expose the Linux target to search radios:",
                "On your Windows PC, navigate to \"Add Device > Bluetooth\".",
                "Select \"ANTHE\" (if Windows shows cached names, select \"HID MOUSE BRIDGE\" as it points to the same interface).",
                "Watch your Linux terminal carefully—it will print a Passkey / Confirm console request. Simply type yes and press Enter in the terminal to authorize.",
                "Once handshake succeeds, run the trust command with your exact MAC to allow automatic reconnects in the future:",
                "Type exit and press Enter to complete the playbook."
              ],
              commands: {
                step1: "sudo bluetoothctl",
                step2: "power on\npairable on\ndiscoverable on",
                step6: "trust YOUR_WINDOWS_MAC_ADDRESS"
              }
            }
          ],
          readyPrompt: "Pairing completely synchronized! Now, boot up your scripts with 'sudo ./run.sh' on Linux and start sending UDP coordinate outputs from your aim application on the Host. Your air-gapped system stays highly active, robust, and completely responsive without drops!"
        },
        wifi: {
          shortTitle: "Wi-Fi Connection Fix",
          title: "Linux Wi-Fi Connection Fix",
          desc: "Resolve issues where the Linux secondary system is unable to detect or connect to Wi-Fi networks due to Windows Fast Startup locking the wireless card.",
          causeTitle: "Why Wi-Fi fails on boot",
          causeDesc: "When Windows shuts down normally, it often uses 'Fast Startup' which hibernates kernel session drivers, leaving the Wi-Fi card in a locked state. As a result, when you boot your USB into Linux, the wireless card is unreachable/locked.",
          handshakeTitle: "",
          handshakeSteps: [],
          wipeRecordsDesc: "To resolve this, we must trigger a cold, full shutdown on Windows using the SHIFT key, which forces Windows to fully release hardware controls.",
          steps: [
            {
              title: "Step 1: Turn off your laptop and unplug your Linux USB",
              desc: "Remove secondary operating system medium safety:",
              bullets: [
                "Turn off your laptop completely.",
                "Unplug your Linux bootable USB drive as well."
              ],
              commands: {}
            },
            {
              title: "Step 2: Boot into Windows normally",
              desc: "Prepare to clear fast startup hardware holds on the main system:",
              bullets: [
                "Power on your laptop, boot normally into Windows, and wait for it to fully load."
              ],
              commands: {}
            },
            {
              title: "Step 3: Shut down using the SHIFT key force method",
              desc: "Trigger system-level electrical hardware discharge/reset:",
              bullets: [
                "Once Windows is fully loaded, click the Start Menu and click the Power icon.",
                "Hold down the SHIFT key on your keyboard and keep holding it while clicking \"Shut Down\".",
                "Keep holding the SHIFT key until the laptop powers down completely (all lights and fan noise should be fully off)."
              ],
              commands: {}
            },
            {
              title: "Step 4: Re-insert your USB and verify Linux network",
              desc: "Reboot secondary OS and verify network availability:",
              bullets: [
                "Plug your Linux USB back into the laptop.",
                "Turn the laptop on, boot into Ubuntu, and check your Wi-Fi interface connections."
              ],
              commands: {}
            }
          ],
          readyPrompt: "Cold shutdown completely released the network hardware lock! Linux can now control the physical card and scan/connect to Wi-Fi normally."
        }
      };
    }
  };

  const phaseConfigs = [
    {
      id: "prereqs",
      title: t.tutorials.phases.prereqs.title,
      shortTitle: t.tutorials.phases.prereqs.short,
      icon: BookOpen,
      desc: t.tutorials.phases.prereqs.desc,
      renderContent: () => (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/50 flex gap-3 text-xs text-amber-850 leading-relaxed font-light">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-amber-900 mb-0.5">{t.tutorials.prepTitle}</span>
              {t.tutorials.prepDesc}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-stone-900">{t.tutorials.needTitle}</h4>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-3">
                <div className="h-8 w-8 bg-stone-100 rounded-xl flex items-center justify-center border border-stone-200 text-stone-800">
                  <Usb className="h-4 w-4" />
                </div>
                <h5 className="font-serif font-bold text-sm text-stone-950">{t.tutorials.usbTitle}</h5>
                <p className="text-[11px] text-stone-605 leading-relaxed font-light">
                  {t.tutorials.usbDesc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-3">
                <div className="h-8 w-8 bg-stone-100 rounded-xl flex items-center justify-center border border-stone-200 text-stone-850">
                  <Power className="h-4 w-4" />
                </div>
                <h5 className="font-serif font-bold text-sm text-stone-950">{t.tutorials.pc2Title}</h5>
                <p className="text-[11px] text-stone-605 leading-relaxed font-light">
                  {t.tutorials.pc2Desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-3">
                <div className="h-8 w-8 bg-stone-100 rounded-xl flex items-center justify-center border border-stone-200 text-stone-850">
                  <Settings className="h-4 w-4" />
                </div>
                <h5 className="font-serif font-bold text-sm text-stone-950">{t.tutorials.winTitle}</h5>
                <p className="text-[11px] text-stone-605 leading-relaxed font-light">
                  {t.tutorials.winDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "phase1",
      title: t.tutorials.phases.phase1.title,
      shortTitle: t.tutorials.phases.phase1.short,
      icon: Download,
      desc: t.tutorials.phases.phase1.desc,
      renderContent: () => (
        <div className="space-y-6">
          <p className="text-xs text-stone-605 leading-relaxed font-light">
            {t.tutorials.phases.phase1.intro}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60 hover:border-stone-400 transition-colors space-y-3">
              <span className="text-[9px] font-mono uppercase bg-stone-200 px-2 py-0.5 rounded text-stone-605 font-bold">
                {t.tutorials.phases.phase1.osLabel}
              </span>
              <h5 className="font-serif font-bold text-base text-stone-950">
                {t.tutorials.phases.phase1.osTitle}
              </h5>
              <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                {t.tutorials.phases.phase1.osDesc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60 hover:border-stone-400 transition-colors space-y-3">
              <span className="text-[9px] font-mono uppercase bg-stone-200 px-2 py-0.5 rounded text-stone-605 font-bold">
                {t.tutorials.phases.phase1.toolLabel}
              </span>
              <h5 className="font-serif font-bold text-base text-stone-950">
                {t.tutorials.phases.phase1.toolTitle}
              </h5>
              <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                {t.tutorials.phases.phase1.toolDesc}
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "phase2",
      title: t.tutorials.phases.phase2.title,
      shortTitle: t.tutorials.phases.phase2.short,
      icon: Settings,
      desc: t.tutorials.phases.phase2.desc,
      renderContent: () => (
        <div className="space-y-6">
          <div className="p-4.5 bg-stone-50 rounded-2xl border border-stone-200/60 text-xs text-stone-650 leading-relaxed font-light">
            <span className="font-semibold text-stone-900 block mb-1">
              {t.tutorials.phases.phase2.whatIs}
            </span>
            {t.tutorials.phases.phase2.whatIsDesc}
          </div>

          <div className="space-y-3">
            {t.tutorials.phases.phase2.steps.map((text: string, idx: number) => {
              const stepKey = `p2-s${idx}`;
              const isDone = completedSteps[stepKey];
              return (
                <div 
                  key={idx}
                  onClick={() => toggleStep(stepKey)}
                  className={`p-3.5 rounded-xl border flex gap-3 items-start transition-all cursor-pointer ${
                    isDone 
                      ? 'bg-stone-50/50 border-stone-300' 
                      : 'bg-white hover:bg-stone-50/40 border-stone-200/60 hover:border-stone-300'
                  }`}
                >
                  <button className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isDone ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-300 bg-white'
                  }`}>
                    {isDone && <Check className="h-3 w-3" />}
                  </button>
                  <div className="text-xs text-stone-705 leading-relaxed font-sans">
                    <span className="font-mono font-bold text-stone-900 mr-1.5">{idx + 1}.</span>
                    <span className={isDone ? 'line-through text-stone-400 font-light' : 'font-light'}>{text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    {
      id: "phase3",
      title: t.tutorials.phases.phase3.title,
      shortTitle: t.tutorials.phases.phase3.short,
      icon: FolderPlus,
      desc: t.tutorials.phases.phase3.desc,
      renderContent: () => (
        <div className="space-y-4">
          <p className="text-xs text-stone-605 leading-relaxed font-light mb-4">
            {t.tutorials.phases.phase3.intro}
          </p>

          <div className="space-y-3">
            {t.tutorials.phases.phase3.steps.map((text: string, idx: number) => {
              const stepKey = `p3-s${idx}`;
              const isDone = completedSteps[stepKey];
              return (
                <div 
                  key={idx}
                  onClick={() => toggleStep(stepKey)}
                  className={`p-3.5 rounded-xl border flex gap-3 items-start transition-all cursor-pointer ${
                    isDone 
                      ? 'bg-stone-50/50 border-stone-300' 
                      : 'bg-white hover:bg-stone-50/40 border-stone-200/60 hover:border-stone-300'
                  }`}
                >
                  <button className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isDone ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-300 bg-white'
                  }`}>
                    {isDone && <Check className="h-3 w-3" />}
                  </button>
                  <div className="text-xs text-stone-705 leading-relaxed font-sans">
                    <span className="font-mono font-bold text-stone-900 mr-1.5">{idx + 1}.</span>
                    <span className={isDone ? 'line-through text-stone-400 font-light' : 'font-light'}>{text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    {
      id: "phase4",
      title: t.tutorials.phases.phase4.title,
      shortTitle: t.tutorials.phases.phase4.short,
      icon: Power,
      desc: t.tutorials.phases.phase4.desc,
      renderContent: () => (
        <div className="space-y-6">
          <p className="text-xs text-stone-605 leading-relaxed font-light">
            {t.tutorials.phases.phase4.intro}
          </p>

          <div className="space-y-3">
            {t.tutorials.phases.phase4.steps.map((text: string, idx: number) => {
              const stepKey = `p4-s${idx}`;
              const isDone = completedSteps[stepKey];
              return (
                <div 
                  key={idx}
                  onClick={() => toggleStep(stepKey)}
                  className={`p-4 rounded-xl border flex gap-3 items-start transition-all cursor-pointer ${
                    isDone 
                      ? 'bg-stone-50/50 border-stone-300' 
                      : 'bg-white hover:bg-stone-50/40 border-stone-200/60 hover:border-stone-300'
                  }`}
                >
                  <button className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isDone ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-300 bg-white'
                  }`}>
                    {isDone && <Check className="h-3 w-3" />}
                  </button>
                  <div className="text-xs text-stone-705 leading-relaxed font-sans">
                    <span className="font-mono font-bold text-stone-900 mr-1.5">{idx + 1}.</span>
                    <span className={isDone ? 'line-through text-stone-400 font-light' : 'font-light whitespace-pre-line'}>{text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    {
      id: "phase5",
      title: t.tutorials.phases.phase5.title,
      shortTitle: t.tutorials.phases.phase5.short,
      icon: ShieldAlert,
      desc: t.tutorials.phases.phase5.desc,
      renderContent: () => (
        <div className="space-y-6">
          {/* Critical warning banner */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-4 text-xs text-red-950 leading-relaxed font-light">
            <AlertTriangle className="h-5 w-5 text-red-650 shrink-0 mt-0.5" />
            <div className="space-y-1 font-sans">
              <span className="font-serif font-bold text-sm block text-red-950">{t.tutorials.phases.phase5.warningTitle}</span>
              <p>{t.tutorials.phases.phase5.warningDesc1}</p>
              <div className="space-y-1 mt-2 pl-1 border-l-2 border-red-200 text-red-900 font-medium font-sans">
                <p>• {t.tutorials.phases.phase5.warningDesc2}</p>
                <p>• {t.tutorials.phases.phase5.warningDesc3}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {t.tutorials.phases.phase5.steps.map((text: string, idx: number) => {
              const stepKey = `p5-s${idx}`;
              const isDone = completedSteps[stepKey];
              return (
                <div 
                  key={idx}
                  onClick={() => toggleStep(stepKey)}
                  className={`p-3.5 rounded-xl border flex gap-3 items-start transition-all cursor-pointer ${
                    isDone 
                      ? 'bg-stone-50/50 border-stone-300' 
                      : 'bg-white hover:bg-stone-50/40 border-stone-200/60 hover:border-stone-300'
                  }`}
                >
                  <button className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isDone ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-300 bg-white'
                  }`}>
                    {isDone && <Check className="h-3 w-3" />}
                  </button>
                  <div className="text-xs text-stone-705 leading-relaxed font-sans">
                    <span className="font-mono font-bold text-stone-900 mr-1.5">{idx + 1}.</span>
                    <span className={isDone ? 'line-through text-stone-400 font-light' : 'font-light'}>{text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    {
      id: "troubleshoot",
      title: language === 'zh' ? "故障排查与重置" : language === 'ja' ? "トラブルシューティング" : "Troubleshoot & Reset",
      shortTitle: language === 'zh' ? "故障重置" : language === 'ja' ? "トラブル復旧" : "Troubleshoot",
      icon: ShieldAlert,
      desc: language === 'zh' ? "解决硬件连接中断与网卡占用异常等行为。" : language === 'ja' ? "Bluetooth瞬断やWi-Fi占有ロックなどの不具合を解消します。" : "Resolve immediate pairing drops and network hardware locks.",
      renderContent: () => {
        const allData = getTroubleshootContent();
        const data = activeTroubleTab === 'bluetooth' ? allData.bluetooth : allData.wifi;
        return (
          <div className="space-y-6">
            {/* Sub-tab Switcher */}
            <div className="flex gap-2 border-b border-stone-200/60 pb-3">
              <button 
                onClick={() => setActiveTroubleTab('bluetooth')}
                className={`px-4 py-2 text-xs font-serif font-bold rounded-lg border transition-all cursor-pointer ${
                  activeTroubleTab === 'bluetooth' 
                    ? 'bg-stone-900 border-stone-900 text-stone-100 shadow-sm' 
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {language === 'zh' ? '蓝牙配对重置' : language === 'ja' ? 'Bluetooth接続復旧' : 'Bluetooth pairing reset'}
              </button>
              <button 
                onClick={() => setActiveTroubleTab('wifi')}
                className={`px-4 py-2 text-xs font-serif font-bold rounded-lg border transition-all cursor-pointer ${
                  activeTroubleTab === 'wifi' 
                    ? 'bg-stone-900 border-stone-900 text-stone-100 shadow-sm' 
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {language === 'zh' ? 'Wi-Fi 连接异常' : language === 'ja' ? 'Wi-Fi接続復旧' : 'Wi-Fi connection fix'}
              </button>
            </div>

            {/* Context/Explanation Row */}
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 space-y-4">
                <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/50 space-y-3 shadow-xs">
                  <h5 className="font-serif font-bold text-xs text-stone-900 flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {data.causeTitle}
                  </h5>
                  <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                    {data.causeDesc}
                  </p>
                </div>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                  {data.wipeRecordsDesc}
                </p>
              </div>

              {/* Dynamic Panel (Handshake for Bluetooth / Fast Startup Insights for Wi-Fi) */}
              <div className="md:col-span-2 p-5 rounded-2xl bg-stone-50 border border-stone-200/60 flex flex-col justify-between space-y-3">
                {activeTroubleTab === 'bluetooth' ? (
                  <>
                    <h5 className="font-mono text-[9px] tracking-widest text-stone-400 font-bold uppercase font-sans">
                      {data.handshakeTitle}
                    </h5>
                    <div className="space-y-2 text-[10.5px] leading-relaxed text-stone-650 font-sans">
                      {data.handshakeSteps?.map((step, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start">
                          <span className="font-mono font-bold text-[#8c7853] min-w-[15px]">{idx + 1}.</span>
                          <span className="text-[11px] font-light">{step}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h5 className="font-mono text-[9px] tracking-widest text-[#8c7853] font-bold uppercase font-sans">
                      {language === 'zh' ? "快速启动科普" : language === 'ja' ? "高速起動について" : "Fast Startup Insights"}
                    </h5>
                    <p className="text-[10.5px] text-stone-600 leading-relaxed font-light">
                      {language === 'zh' 
                        ? "Windows 的「快速启动」类似于休眠状态，它会将内核状态保存到 NVMe 固态硬盘中。当您引导至 Linux 系统时，无线网卡由于未正确断电并重置，将卡死在 Windows 的内核控制中而不可见。执行 Shift+关机 是免拆机释放所有硬件锁的唯一系统级指令。" 
                        : language === 'ja' 
                        ? "Windowsの「高速スタートアップ」は一種のサスペンド状態であり、カーネル情報をSSDに保持します。次にLinuxへ起動した際、Wi-Fiカードの通電シャットダウンや初期化が行われていないため、Linux上から不可視化されてしまいます。Shift+シャットダウンを行えば、完全にハードウェアが解放されます。" 
                        : "Windows 'Fast Startup' works similarly to hibernation, saving the kernel state onto the SSD. When you boot into Linux, the wireless card remains trapped under Windows' controller lease since it never fully powered down. Initiating a Shift-Shutdown completely cuts power to all physical PCIe lanes, forcing a hard reset and liberating the wireless board."
                      }
                    </p>
                    <div className="h-px bg-stone-200/60 my-2" />
                    <span className="text-[9px] tracking-wider text-stone-400 font-mono">
                      HOTKEYS: Shift + Shut Down
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Step-by-step Interactive Sub-cards */}
            <div className="space-y-4 pt-2">
              {data.steps.map((step, stepIdx) => (
                <div 
                  key={stepIdx} 
                  className="rounded-2xl border border-stone-200/60 bg-white shadow-xs overflow-hidden"
                >
                  {/* Step Header */}
                  <div className="bg-stone-50/50 border-b border-stone-150 px-5 py-4 flex items-center justify-between">
                    <h5 className="font-serif font-bold text-xs text-stone-900">
                      {step.title}
                    </h5>
                    <span className="font-mono text-[10px] tracking-widest text-[#8c7853] font-bold">
                      0{stepIdx + 1} / 0{data.steps.length}
                    </span>
                  </div>

                  {/* Step Details */}
                  <div className="p-5.5 space-y-4">
                    {step.desc && (
                      <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                        {step.desc}
                      </p>
                    )}

                    <div className="space-y-3 font-sans">
                      {step.bullets.map((bullet, bIdx) => {
                        let cmdText = '';
                        if (activeTroubleTab === 'bluetooth') {
                          if (stepIdx === 1) { 
                            if (bIdx === 1) cmdText = step.commands?.step2 || '';
                            if (bIdx === 2) cmdText = step.commands?.step3 || '';
                            if (bIdx === 4) cmdText = step.commands?.step5 || '';
                          } else if (stepIdx === 2) { 
                            if (bIdx === 0) cmdText = step.commands?.step1 || '';
                          } else if (stepIdx === 3) { 
                            if (bIdx === 0) cmdText = step.commands?.step1 || '';
                            if (bIdx === 1) cmdText = step.commands?.step2 || '';
                            if (bIdx === 5) cmdText = step.commands?.step6 || '';
                          }
                        }

                        const stepKey = `tro-${activeTroubleTab}-s${stepIdx}-b${bIdx}`;
                        const isDone = completedSteps[stepKey];

                        return (
                          <div key={bIdx} className="space-y-2">
                            <div 
                              onClick={() => toggleStep(stepKey)}
                              className="flex gap-3 items-start select-none cursor-pointer group"
                            >
                              <button className={`h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                isDone ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-300 group-hover:border-stone-400 bg-white'
                              }`}>
                                {isDone && <Check className="h-2.5 w-2.5" />}
                              </button>
                              <p className={`text-[11px] text-stone-700 leading-relaxed ${
                                isDone ? 'line-through text-stone-400 font-light' : 'font-light'
                              }`}>
                                {bullet}
                              </p>
                            </div>
                            
                            {cmdText && (
                              <div className="ml-7.5 flex items-center bg-stone-900 rounded-xl p-3 pl-4 border border-stone-800 text-stone-100 font-mono text-[10.5px] leading-relaxed shadow-sm relative group overflow-hidden max-w-full">
                                <span className="text-stone-500 mr-2 shrink-0 select-none">$</span>
                                <span className="font-medium text-stone-100 whitespace-pre">{cmdText}</span>
                                <CopyButton text={cmdText} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ready Callout Alert */}
            <div className="p-5.5 bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-950 rounded-2xl text-stone-300 flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 text-amber-100 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed font-light font-sans text-stone-300">
                {data.readyPrompt}
              </p>
            </div>
          </div>
        );
      }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8 max-w-5xl mx-auto px-2 sm:px-0 w-full min-w-0 overflow-hidden"
    >
      <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/95 border border-stone-200/60 shadow-xs marble-slab-card w-full max-w-full min-w-0 overflow-hidden">
        <div className="space-y-2 border-b border-stone-200/40 pb-5 mb-8">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest font-bold">{t.tutorials.badge}</span>
          <h3 className="font-serif text-3xl font-light text-stone-950">
            {t.tutorials.title}
          </h3>
          <p className="text-xs text-stone-405 font-light max-w-xl">
            {t.tutorials.desc}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid md:grid-cols-4 gap-8 w-full max-w-full min-w-0">
          {/* Phase selector tabs list (Desktop or mobile accordion-esque buttons) */}
          <div className="md:col-span-1 space-y-2 w-full max-w-full min-w-0 overflow-hidden">
            <span className="text-[9px] font-mono tracking-widest text-stone-400 font-bold block uppercase mb-3">{t.tutorials.phasesTitle}</span>
            <div className="flex overflow-x-auto md:flex-col pb-2 md:pb-0 gap-1.5 scrollbar-thin border-b md:border-b-0 border-stone-100">
              {phaseConfigs.map((phase, idx) => {
                const PhaseIcon = phase.icon;
                const isSelected = activePhase === idx;
                return (
                  <button
                    key={phase.id}
                    onClick={() => setActivePhase(idx)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[11px] font-serif font-semibold tracking-wide transition-all uppercase shrink-0 md:w-full cursor-pointer border ${
                      isSelected 
                        ? 'bg-stone-950 text-[#faf9f6] border-stone-950 shadow-xs' 
                        : 'text-stone-500 border-transparent hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <PhaseIcon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-stone-300' : 'text-stone-405'}`} />
                    <span className="truncate">{phase.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Phase Card details */}
          <div className="md:col-span-3 w-full max-w-full min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-serif text-xl font-bold text-stone-950">
                    {phaseConfigs[activePhase].title}
                  </h4>
                  <p className="text-[11px] text-stone-400 font-light mt-1">
                    {phaseConfigs[activePhase].desc}
                  </p>
                </div>

                <div className="pt-2">
                  {phaseConfigs[activePhase].renderContent()}
                </div>

                {/* Bottom interactive navigation footer */}
                <div className="flex justify-between items-center border-t border-stone-100 pt-6 mt-8">
                  <button
                    disabled={activePhase === 0}
                    onClick={() => setActivePhase(prev => Math.max(0, prev - 1))}
                    className={`px-4 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest border transition-all ${
                      activePhase === 0
                        ? 'opacity-30 cursor-not-allowed border-stone-200 text-stone-300'
                        : 'border-stone-300 hover:bg-stone-100 text-stone-705 cursor-pointer'
                    }`}
                  >
                    {t.tutorials.prev}
                  </button>

                  <div className="text-[10px] text-stone-404 font-mono">
                    {t.tutorials.phaseCounter.replace('{current}', String(activePhase + 1)).replace('{total}', String(phaseConfigs.length))}
                  </div>

                  <button
                    disabled={activePhase === phaseConfigs.length - 1}
                    onClick={() => setActivePhase(prev => Math.min(phaseConfigs.length - 1, prev + 1))}
                    className={`px-4 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest border transition-all ${
                      activePhase === phaseConfigs.length - 1
                        ? 'opacity-30 cursor-not-allowed border-stone-200 text-stone-300'
                        : 'border-stone-950 bg-stone-950 hover:bg-stone-850 text-[#faf9f6] text-white cursor-pointer'
                    }`}
                  >
                    {t.tutorials.next}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
