// src/mocks/handlers.ts
import * as http from "msw"

export const handlers = [
  http.http.post("/api/contact", async ({ request }) => {
    const body = await request.json()

    console.log("📨 Mock received:", body)

    return new Response(
      JSON.stringify({ message: "Mocked: お問い合わせ完了しました" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  }),
]
