import type { Metadata } from "next"
import { JaLegalPage } from "@/components/ja/ja-legal-page"

export const metadata: Metadata = {
  title: "プライバシーポリシー ｜ AI アプリ設計道場",
  description: "「AI アプリ設計道場」におけるプライバシーポリシー。",
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <JaLegalPage
      title="プライバシーポリシー"
      draft
      lastUpdated="2026 年 4 月 21 日"
    >
      <p>
        当サービス「AI アプリ設計道場」（以下「当サービス」）は、ユーザーの個人情報を適切に保護することを社会的責務と認識し、以下のとおりプライバシーポリシーを定め遵守いたします。
      </p>

      <h2>取得する情報</h2>
      <p>当サービスは、以下の情報を取得することがあります。</p>
      <ul>
        <li>
          <strong>予約登録時:</strong> メールアドレス（必須）、会社名、役職、興味のあるプラン、ひとこと備考
        </li>
        <li>
          <strong>購入時（正式販売後）:</strong> 氏名、請求先情報、決済情報（決済情報自体は Stripe 等の決済事業者が直接取得し、当社は保管しません）
        </li>
        <li>
          <strong>自動取得:</strong> アクセスログ、Cookie、閲覧ページ、デバイス情報（分析・UX 改善目的）
        </li>
      </ul>

      <h2>利用目的</h2>
      <ul>
        <li>先行予約のご案内、コース提供のご連絡</li>
        <li>お問い合わせ・サポート対応</li>
        <li>コース品質の改善、統計的な利用分析</li>
        <li>法令に基づく対応</li>
      </ul>

      <h2>第三者提供</h2>
      <p>
        法令に基づく場合を除き、ユーザーの同意なしに個人情報を第三者へ提供することはありません。
      </p>
      <p>
        なお、決済事業者（Stripe 等）、メール配信事業者、アクセス解析ツール（Vercel Analytics 等）に対しては、サービス提供のために必要な範囲で情報を委託することがあります。
      </p>

      <h2>Cookie の利用</h2>
      <p>
        当サービスは、ユーザー体験の向上および利用状況の分析のために Cookie を使用することがあります。ブラウザの設定により Cookie を無効化することは可能ですが、一部機能が利用できなくなる場合があります。
      </p>

      <h2>個人情報の開示・訂正・削除</h2>
      <p>
        ユーザーは、ご自身の個人情報について、開示・訂正・削除を請求することができます。ご請求は下記連絡先までお願いいたします。
      </p>

      <h2>お問い合わせ窓口</h2>
      <p>
        （準備中）メール: privacy[at]ai-app-design-dojo.jp ／ 正式販売開始時に確定します。
      </p>

      <h2>改定</h2>
      <p>
        当社は本ポリシーを必要に応じて改定します。重要な変更がある場合は当サービス上で通知します。
      </p>
    </JaLegalPage>
  )
}
