import React from "react"
import Image from "next/image"

export function Logo({ className = "", variant = "default" }: { className?: string; variant?: "default" | "light" }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative mb-3">
        <Image
          src="/JS LOGO.png"
          alt="JS Live Events Logo"
          width={200}
          height={200}
          className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
          priority
        />
      </div>
    </div>
  )
}

