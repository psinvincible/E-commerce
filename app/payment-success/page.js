"use client";

import { Suspense } from "react";
import PaymentSuccessContent from "./PaymentSuccessContent";

export const dynamic = "force-dynamic";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
      <h1 className="text-xl font-semibold">Loading...</h1>
    </div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
