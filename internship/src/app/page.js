"use client";
import { useRouter } from "next/navigation";
import QuoteForm from "@/components/QuoteForm";

export default function HomePage() {
  return (
<main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
  <div className="w-full max-w-xl flex flex-col items-center">

    {/* Black-colored PNG logo using filter */}
    <img
      src="/logo.png"
      alt="Logo"
      className="w-[250px] mt-4 mb-6 filter brightness-20"
    />

    {/* Quote form goes here */}
    <QuoteForm />

  </div>
</main>


  );
}
