import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { VisitTracker } from '@/components/learning/visit-tracker'
import { LearningProgressControl } from '@/components/learning/learning-progress-control'
import { siteLocale } from '@/lib/i18n-routing'
import { languagePreferenceRedirectScript } from '@/lib/language-preference'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: 'EasyGoVibeCoding | 企业级 AI 编程工具与架构培训平台',
  description: 'AI 编程工具不是魔法，是工程。理解机制才能驾驭工具。企业级 AI 编程工具与架构培训平台。',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={siteLocale}>
      <head>
        {siteLocale === "zh-CN" ? (
          <script dangerouslySetInnerHTML={{ __html: languagePreferenceRedirectScript }} />
        ) : null}
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <VisitTracker />
        <LearningProgressControl />
        <Analytics />
      </body>
    </html>
  )
}
