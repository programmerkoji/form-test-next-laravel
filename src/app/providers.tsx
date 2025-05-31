"use client"

import { useEffect } from "react"
import { enableMocking } from "@/lib/msw-client"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    enableMocking()
  }, [])

  return <>{children}</>
}
