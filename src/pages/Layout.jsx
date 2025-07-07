import type React from "react";
export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return <div className="min-h-screen bg-zinc-900">{children}</div>;
}
