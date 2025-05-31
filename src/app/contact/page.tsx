import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-4">お問い合わせ</h1>
        <p className="text-muted-foreground mb-8">
          ご質問やお問い合わせがございましたら、以下のフォームからお気軽にご連絡ください。
        </p>
        <ContactForm />
      </div>
    </div>
  )
}
