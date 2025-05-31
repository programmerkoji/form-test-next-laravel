// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()

  // ここで任意の処理（バリデーションや保存など）を行う
  console.log("受け取ったデータ:", body)

  return NextResponse.json({ message: "受け取りました！" })
}
