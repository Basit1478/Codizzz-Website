"use client";
import { useState } from "react";

const WA_NUMBER = "923332011256";
const WA_MESSAGE = encodeURIComponent("Hi! I'm interested in your AI services. Can we talk?");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function WhatsAppWidget() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip label */}
      <div
        className={`transition-all duration-300 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <div
          className="px-3 py-2 rounded-lg text-sm font-semibold text-white whitespace-nowrap"
          style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}
        >
          Chat on WhatsApp
          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#25D366]" />
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        style={{
          background: "#25D366",
          boxShadow: hovered
            ? "0 8px 30px rgba(37,211,102,0.6)"
            : "0 4px 20px rgba(37,211,102,0.4)",
        }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: "#25D366" }} />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
        >
          <path d="M16.003 0C7.165 0 0 7.164 0 16c0 2.822.737 5.463 2.026 7.757L0 32l8.518-2.004A15.93 15.93 0 0016.003 32C24.835 32 32 24.836 32 16S24.835 0 16.003 0zm0 29.3a13.22 13.22 0 01-6.74-1.843l-.482-.286-4.997 1.176 1.2-4.861-.315-.499A13.213 13.213 0 012.7 16c0-7.335 5.968-13.3 13.303-13.3S29.3 8.665 29.3 16 23.335 29.3 16.003 29.3zm7.29-9.953c-.4-.2-2.364-1.166-2.731-1.3-.366-.132-.633-.2-.9.2-.266.4-1.032 1.3-1.266 1.566-.233.267-.466.3-.866.1-.4-.2-1.689-.623-3.217-1.982-1.189-1.059-1.992-2.367-2.226-2.767-.233-.4-.025-.616.175-.815.18-.18.4-.466.6-.7.2-.233.267-.4.4-.666.133-.267.067-.5-.033-.7-.1-.2-.9-2.166-1.232-2.966-.325-.78-.657-.674-.9-.686l-.766-.013c-.267 0-.7.1-1.066.5-.366.4-1.4 1.366-1.4 3.332s1.433 3.866 1.633 4.133c.2.267 2.82 4.305 6.832 6.035.955.412 1.7.658 2.282.843.959.305 1.831.262 2.52.159.768-.114 2.364-.967 2.698-1.9.333-.934.333-1.734.233-1.9-.098-.165-.365-.265-.765-.465z" />
        </svg>
      </a>
    </div>
  );
}
