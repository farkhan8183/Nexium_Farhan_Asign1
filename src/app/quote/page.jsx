"use client";

import { useState } from "react"; // ***(for  copy)
import { quotes } from "@/data/quotesData";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function QuotesPage({ searchParams }) {
  const topic = searchParams.topic?.toLowerCase() || "";

  const filteredQuotes = quotes.filter(
    (quote) => quote.topic.toLowerCase() === topic
  );

  // ***
  const [copiedIndex, setCopiedIndex] = useState(null);

  // ***
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // 3&&& Pagination logic (1 quote per page)
  const quotesPerPage = 1; // Show 1 quote only
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredQuotes.length / quotesPerPage);
  const startIndex = (currentPage - 1) * quotesPerPage;
  const paginatedQuotes = filteredQuotes.slice(
    startIndex,
    startIndex + quotesPerPage
  );

  // 3*** share function for mobile
  const handleShare = async (quote) => {
    const shareText = `"${quote.text}" - ${quote.author}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Quote",
          text: shareText,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Sharing only supported on mobile browsers!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Results for: <span className="text-indigo-600">{topic}</span>
      </h2>

      {filteredQuotes.length === 0 ? (
        <p className="text-center text-gray-500">
          Please Enter quotes from suggested topics only!
        </p>
      ) : (
        <>
          {paginatedQuotes.map((quote, index) => (
            <Card
              key={index + startIndex}
              className="shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100 relative" // ***
            >
              <CardContent className="p-6 bg-gradient-to-br from-white via-indigo-50 to-white rounded-xl space-y-4">
                <p className="text-lg italic leading-relaxed text-center text-gray-700">
                  “{quote.text}”
                </p>
                <Separator className="my-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="font-semibold">Author:</span>
                  <span className="italic">{quote.author}</span>
                </div>
                <div className="text-xs text-center font-semibold text-indigo-600 uppercase tracking-wider">
                  Topic: {quote.topic}
                </div>

                {/* Copy Button *** */}
                <button
                  onClick={() =>
                    handleCopy(`"${quote.text}" - ${quote.author}`, index)
                  }
                  className="cursor-pointer absolute top-3 right-3 text-xs px-3 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full transition"
                >
                  {copiedIndex === index ? "Quote Copied!" : "Copy Quote"}
                </button>

                {/* 3*** Share Button (mobile) */}
                <button
                  onClick={() => handleShare(quote)}
                  className="block w-full mt-3 text-center text-sm text-white bg-green-500 hover:bg-green-600 rounded-full py-1  cursor-pointer"
                >
                  Share Quote
                </button>
              </CardContent>
            </Card>
          ))}

          {/* 3&&& Pagination Buttons */}
          <div className="flex justify-between items-center mt-6 text-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded disabled:opacity-50  cursor-pointer"
            >
              ← Previous
            </button>
            <span className="text-gray-600">
              Quote {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded disabled:opacity-50 cursor-pointer"
            >
              Next →
            </button>
          </div>
        </>
      )}

      <a href="/" className="block text-center mt-6 text-indigo-500 underline">
        ← Back to Home
      </a>
    </div>
  );
}
