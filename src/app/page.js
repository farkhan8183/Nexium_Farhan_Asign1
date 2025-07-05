"use client";

import QuoteForm from "@/components/QuoteForm";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-xl">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8">
          Quote Generator
        </h1>

        {/* Quote Form + Results */}
        <QuoteForm />
      </div>
    </main>
  );
}
