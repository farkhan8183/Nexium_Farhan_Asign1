"use client";
import { useState } from "react";
import QuoteForm from "@/components/QuoteForm";

export default function HomePage() {
  const [selectedTopic, setSelectedTopic] = useState("");//SetSelectedTopic=what  user  has typed??

  //the ui starts  from  here!!
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Quote Generator</h1>
        <QuoteForm onSubmit={setSelectedTopic} />{/* show on  ui  whatever he has typed */}
        {selectedTopic && (
          <p className="mt-6 text-lg text-gray-700">
            Showing quote for topic: <strong>{selectedTopic}</strong>
          </p>
        )}
      </div>
    </main>
  );
}
