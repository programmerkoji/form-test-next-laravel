// src/lib/msw-client.ts
export async function enableMocking() {
  if (process.env.NODE_ENV !== "development") return

  const { worker } = await import("@/mocks/browser")
  await worker.start()
}
