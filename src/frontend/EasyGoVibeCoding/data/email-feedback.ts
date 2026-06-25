export interface EmailFeedbackItem {
  id: string
  displayName: string
  role: string
  excerpt: string
  receivedAt: string
  source: "email"
}

// Only add feedback here after the sender explicitly allows public display.
// Remove private details such as full email, company secrets, project names,
// phone numbers, or exact internal workflows before publishing.
export const emailFeedbackItems: EmailFeedbackItem[] = []
