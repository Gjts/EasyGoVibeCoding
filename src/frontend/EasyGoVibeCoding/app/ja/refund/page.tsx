import type { Metadata } from "next"
import { JaLegalPage } from "@/components/ja/ja-legal-page"

export const metadata: Metadata = {
  title: "返金ポリシー ｜ AI アプリ設計道場",
  description: "デジタルコンテンツの返金ポリシー。",
  robots: { index: false, follow: true },
}

export default function RefundPage() {
  return (
    <JaLegalPage title="返金ポリシー" draft lastUpdated="2026 年 4 月 21 日">
      <p>
        当サービス「AI アプリ設計道場」はデジタルコンテンツの提供を行っています。デジタルコンテンツという性質上、原則として返品・キャンセルはお受けしておりません。ただし、以下の条件をすべて満たす場合、例外的に返金に対応いたします。
      </p>

      <h2>返金可能な条件</h2>
      <ol>
        <li>購入日から起算して 14 日以内であること</li>
        <li>教材全体に対する進捗が 30% 未満であること（閲覧ログで判定）</li>
        <li>
          お客様のご都合（教材内容とのミスマッチ・期待との差）ではなく、当社の責に帰すべき重大な事由（記載の章が存在しない、代金分の教材が提供されない等）によるものであること
        </li>
      </ol>

      <h2>返金不可となるケース</h2>
      <ul>
        <li>「思ったより難しかった」「知っている内容だった」等、主観的な理由によるもの</li>
        <li>進捗が 30% 以上進んでいる場合</li>
        <li>購入から 14 日を超過した場合</li>
        <li>法人プランの一部席を消化している場合</li>
      </ul>

      <h2>返金手続き</h2>
      <ol>
        <li>
          下記連絡先まで、ご購入時のメールアドレスから「返金希望」とご連絡ください。
        </li>
        <li>
          当社にて購入履歴と進捗を確認の上、返金可否をご連絡します（通常 5 営業日以内）。
        </li>
        <li>
          返金可と判断された場合、決済事業者を通じて原則として同一の決済方法にて返金します。
          銀行振込でお支払いの場合、振込手数料はお客様のご負担となります。
        </li>
      </ol>

      <h2>連絡先</h2>
      <p>
        （準備中）メール: support[at]ai-app-design-dojo.jp ／ 正式販売開始時に確定します。
      </p>
    </JaLegalPage>
  )
}
