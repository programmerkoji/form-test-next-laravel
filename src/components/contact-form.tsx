"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { submitContactForm } from "@/api/contact"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "名前は2文字以上で入力してください",
  }),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  subject: z.string().min(5, {
    message: "件名は5文字以上で入力してください",
  }),
  message: z.string().min(10, {
    message: "メッセージは10文字以上で入力してください",
  }),
})

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      await submitContactForm(values);

      toast({
        title: "送信完了",
        description: "お問い合わせを受け付けました。折り返しご連絡いたします。",
      })

      form.reset()
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "送信に失敗しました。後ほど再度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  お名前 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="山田 太郎" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  メールアドレス <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                件名 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="お問い合わせの件名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                メッセージ <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="お問い合わせ内容を入力してください" className="min-h-[150px]" {...field} />
              </FormControl>
              <FormDescription>できるだけ詳細にお問い合わせ内容をご記入ください。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                送信中...
              </>
            ) : (
              "送信する"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
