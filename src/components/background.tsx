import type { ReactNode } from "react"

export function Background({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[#0a0a0f]" />
      <div className="fixed inset-0 -z-10 [background-image:linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] [background-size:50px_50px]" />
      <div className="fixed top-20 -left-48 w-96 h-96 bg-blue-500 rounded-full blur-[80px] opacity-30 animate-float" />
      <div className="fixed top-1/3 right-0 w-80 h-80 bg-purple-500 rounded-full blur-[80px] opacity-30 animate-float [animation-delay:2s]" />
      <div className="fixed bottom-1/4 left-1/4 w-72 h-72 bg-pink-500 rounded-full blur-[80px] opacity-30 animate-float [animation-delay:4s]" />
      {children}
    </>
  )
}
