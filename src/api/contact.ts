export type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // credentials: "include", // Laravel Sanctum使用時
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("送信に失敗しました")
  }
}