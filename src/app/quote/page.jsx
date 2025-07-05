"use client";

import { useState } from "react"; // ***(for  copy)
import { quotes } from "@/data/quotesData";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
//i imported  some  g-fonts here!!!
import { Merriweather } from 'next/font/google';
const merriweather = Merriweather({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-quote' });
import { Playfair_Display } from 'next/font/google';
const playfair = Playfair_Display({ subsets: ['latin'], weight: '400', style: 'italic' });

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
    <>
    {/* %%% outer background wrapper added here */}
<div className="min-h-screen w-full bg-gradient-to-t from-gray-950 via-blue-950/100 to-gray-900">
      <div className="px-4 sm:px-6 lg:px-8">
        {filteredQuotes.length === 0 ? (
          <p className="text-center text-gray-500">
            Please Enter quotes from suggested topics only!
          </p>
        ) : (
          <>
            {paginatedQuotes.map((quote, index) => (
              <div
                key={index + startIndex}
                className="flex justify-center items-center min-h-[60vh] px-2 sm:px-6 lg:px-12"
              >
                {/* Cards */}
               
<Card className="w-full mt-15  h-110 sm:w-[500px] sm:h-[500px] max-w-full sm:max-w-3xl mx-auto shadow-2xl rounded-3xl border border-blue-200/20 hover:scale-[1.015] transition-transform duration-500 ease-in-out relative overflow-hidden bg-gradient-to-tr from-blue-100/50 via-gray-50 to-blue-100/50 backdrop-blur-[2px]">
  

                  <CardContent className="p-6 sm:p-10 md:p-14 space-y-8 relative z-10">
                    <div className={`${merriweather.className} text-base sm:text-2xl italic text-center text-gray-800 leading-relaxed tracking-wide`}>
                      <div className="relative text-center px-2 sm:px-6 py-6 sm:py-8">
                        <span className={`${playfair.className} absolute text-6xl sm:text-9xl text-gray-300 top-2 left-2 -translate-x-full`}>“</span>
                        <p className="relative z-10 mt-4 text-base sm:text-2xl italic text-gray-800 leading-relaxed tracking-wide">
                          {quote.text}
                        </p>
                        <span className={`${playfair.className} absolute text-6xl sm:text-9xl text-gray-300 bottom-2 right-2 translate-x-full`}>”</span>
                      </div>
                    </div>

                    <Separator className="my-4 bg-pink-200" />

                    <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm sm:text-base text-gray-700 font-medium">
                      <div className="text-sm text-gray-700 flex items-center gap-1">
                        <span className="font-semibold text-gray-800">Author:</span>
                        <span className="italic text-gray-900">{quote.author}</span>
                      </div>

                      <div className="text-sm text-black flex items-center gap-1">
                        <span>Topic</span>: <span className="ml-1 text-red-900 font-medium underline">{quote.topic}</span>
                      </div>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(`"${quote.text}" - ${quote.author}`, index)}
                      className={`
                        absolute top-4 right-4 text-xs font-medium px-4 py-1.5
                        rounded-full shadow-sm
                        bg-gradient-to-r from-gray-800 to-blue-900 text-white cursor-pointer
                        hover:to-yellow-900 hover:font-bold
                        transition-all duration-300 ease-in-out
                        ring-1 ring-gray-600 active:scale-95
                      `}
                    >
                      {copiedIndex === index ? "✓ Copied!" : " Copy Quote"}
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={() => handleShare(quote)}
                      className="block cursor-pointer w-full mt-4 text-center text-sm font-semibold text-white bg-gradient-to-r from-blue-950 to-gray-800 hover:from-blue-900 hover:to-gray-700 rounded-full py-2.5 px-4 transition-all duration-300 shadow-md"
                    >
                      Share Quote
                    </button>
                  </CardContent>

                  {/* Watercolor background overlay */}
                  <div className="absolute inset-0 bg-[url('/quote-bg.jpg')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-multiply"></div>
                </Card>
              </div>
            ))}

            {/* 3&&& Pagination Buttons */}
            <div className="flex flex-col sm:flex-row sm:ml-147 items-center gap-6 mt-6 text-sm text-white">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-900 to-gray-800 hover:from-blue-800 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
              >
                ← Prev Quote
              </button>

              <span className="text-gray-500 font-medium text-lg">
                Quote <span className="font-extrabold text-red-900"> {currentPage}</span> of <span className="font-extrabold text-red-900">{totalPages}</span>
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 cursor-pointer rounded-full bg-gradient-to-r from-blue-900 to-gray-800 hover:from-blue-800 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                Next Quote→
              </button>
            </div>
          </>
        )}

        <a
          href="/"
          className="inline-block text-white   text-sm px-5 py-2 mt-20 sm:ml-180 rounded-full bg-gradient-to-r from-blue-900 to-gray-800 hover:from-blue-800 hover:to-gray-700 transition-all duration-300 text-center shadow-md"
        >
          ← Back to Home
        </a>
      </div>
    </div>
    {/* %%% outer wrapper ends here */}
    </>
  );
}
