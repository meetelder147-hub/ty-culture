"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      return;
    }

    fetch(`/api/verify-payment?reference=${reference}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          localStorage.removeItem("lastOrderId"); // Clean up
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [reference]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 size={48} className="text-gold animate-spin mb-6" />
        <h1 className="font-serif text-3xl text-cacao">Verifying your payment...</h1>
        <p className="text-muted mt-2">Please do not close this page.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-6">
        <XCircle size={64} className="text-red-500 mb-6" />
        <h1 className="font-serif text-3xl text-cacao mb-4">Payment Verification Failed</h1>
        <p className="text-muted max-w-md mb-8">
          If you were debited, please contact us on WhatsApp with your order details and we will resolve it immediately.
        </p>
        <Link href="/contact" className="btn-primary">Contact Support</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-32 text-center px-6">
      <CheckCircle2 size={64} className="text-green-500 mb-6" />
      <h1 className="font-serif text-4xl text-cacao mb-4">Thank you for your order!</h1>
      <p className="text-muted max-w-md mb-2">
        Your payment was successful. We have received your order and will begin processing it right away.
      </p>
      <p className="text-sm font-medium text-gold mb-8">Order Reference: {reference}</p>
      
      <div className="flex gap-4">
        <Link href="/shop" className="btn-primary">Continue Shopping</Link>
        <Link href="/" className="btn-outline">Back to Home</Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-cacao">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}