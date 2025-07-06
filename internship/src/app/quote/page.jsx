"use client";

import { useState } from "react"; 
import { quotes } from "@/data/quotesData"; 
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// i  added some  google  fonts here!!
import { Merriweather } from 'next/font/google';
const merriweather = Merriweather({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-quote' });

import { Playfair_Display } from 'next/font/google';
const playfair = Playfair_Display({ subsets: ['latin'], weight: '400', style: 'italic' });

export default function QuotesPage({ searchParams }) {
  const topic = searchParams.topic?.toLowerCase() || "";

  // flter quotes based on selected topic
  const filteredQuotes = quotes.filter(
    (quote) => quote.topic.toLowerCase() === topic
  );

  const [copiedIndex, setCopiedIndex] = useState(null); // to track which quote is copied

  // Copy quote text to clipboard logic!!
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // Pagination setup (1 quote per page)
  const quotesPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredQuotes.length / quotesPerPage);
  const startIndex = (currentPage - 1) * quotesPerPage;
  const paginatedQuotes = filteredQuotes.slice(
    startIndex,
    startIndex + quotesPerPage
  );

  // Native share API (mostly works on mobile)
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
      <div className="min-h-screen w-full bg-gradient-to-t from-black via-blue-950 to-black">
        <div className="px-4 sm:px-6 lg:px-8">
          {/*warnin if  not found...     */}
          {filteredQuotes.length === 0 ? (
            <p
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1500"
              className="text-center sm:text-[40px] text-gray-600 font-medium px-6 py-3 rounded-xl shadow-sm max-w-lg mx-auto animate-fade-in pt-20"
            >
              Please Select your topic form suggested topics only!
            </p>
          ) : (
            <>
              {paginatedQuotes.map((quote, index) => (
                <div
                  key={index + startIndex}
                  className="flex justify-center items-center min-h-[60vh] px-2 sm:px-6 lg:px-12"
                >
                  {/* Quote Card */}
                  <Card
                    className="w-full mt-15 h-auto sm:w-[500px] sm:h-[500px] max-w-full sm:max-w-3xl mx-auto rounded-3xl border border-blue-200/20 
                    hover:scale-[1.015] transition-transform duration-500 ease-in-out relative overflow-hidden 
                    bg-gradient-to-tr from-blue-100/50 via-gray-50 to-blue-100/50 backdrop-blur-[2px] 
                    shadow-[0_30px_84px_rgba(0,0,70,0.10)]"
                  >
                    <CardContent className="p-4 sm:p-10 md:p-14 space-y-8 relative z-10">
                      {/* Quote Text */}
                      <div className={`${merriweather.className} text-base sm:text-2xl italic text-center text-gray-800 leading-relaxed tracking-wide`}>
                        <div className="relative text-center px-2 sm:px-6 py-6 sm:py-8">
                          <span
                            data-aos="fade-right"
                            className={`${playfair.className} absolute text-5xl sm:text-9xl text-gray-800 top-2 left-2 -translate-x-full`}
                          >“</span>
                          <p
                            data-aos="fade-right"
                            data-aos-offset="300"
                            data-aos-easing="ease-in-sine"
                            className="relative z-10 mt-4 text-base sm:text-2xl italic text-gray-800 leading-relaxed tracking-wide"
                          >
                            {quote.text}
                          </p>
                          <span
                            data-aos="fade-down-right"
                            className={`${playfair.className} absolute text-5xl sm:text-9xl text-gray-800 bottom-2 right-2 translate-x-full`}
                          >”</span>
                        </div>
                      </div>

                      <Separator className="my-4 bg-pink-200" />

                      {/* Author & Topic Info */}
                      <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm sm:text-base text-gray-700 font-medium">
                        <div className="text-sm text-gray-700 flex items-center gap-1">
                          <span className="font-semibold text-gray-800">Author:</span>
                          <span className="italic text-gray-900">{quote.author}</span>
                        </div>

                        <div className="text-sm text-black flex items-center gap-1">
                          <span>Topic</span>: <span className="ml-1 text-red-900 font-medium underline">{quote.topic}</span>
                        </div>
                      </div>

                      {/* cpy Quote Button */}
                      <button 
                        onClick={() => handleCopy(`"${quote.text}" - ${quote.author}`, index)}
                        className={`absolute top-4 right-4 text-xs font-medium px-4 py-1.5 rounded-full shadow-sm text-white cursor-pointer
                          bg-gradient-to-r from-green-950 via-black to-gray-700 hover:to-yellow-900 hover:font-bold
                          transition-all duration-300 ease-in-out ring-1 ring-gray-600 active:scale-95`}
                      >
                        {copiedIndex === index ? "✓ Copied!" : " Copy Quote"}
                      </button>

                      {/* Share Quote Button */}
                      <button
                        onClick={() => handleShare(quote)}
                        className="block w-full mt-4 text-center text-sm font-semibold text-white/90
                          bg-gradient-to-r from-green-950 via-gray-950 to-green-950
                          hover:bg-gradient-to-r hover:from-gray-950 hover:via-black hover:to-gray-950 hover:font-bold cursor-pointer
                          active:scale-[0.98] transform-gpu
                          rounded-full py-2.5 px-4
                          transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]
                          shadow-lg shadow-blue-900/30
                          border border-white/10
                          hover:shadow-emerald-900/40
                          relative overflow-hidden
                          before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-transparent before:to-transparent before:opacity-0
                          hover:before:opacity-100 before:transition-opacity before:duration-300"
                      >
                        <span className="relative z-10 drop-shadow-sm">Share Quote</span>
                      </button>
                    </CardContent>

                    {/* Light Background Watermark */}
                    <div className="absolute inset-0 bg-[url('/quote-bg.jpg')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-multiply"></div>
                  </Card>
                </div>
              ))}

              {/* Pagination  stuff  */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 text-sm text-white px-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-900 to-gray-800 hover:from-blue-800 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
                >
                  ← Prev Quote
                </button>

                <span className="text-gray-500 font-medium text-lg text-center">
                  Quote <span className="font-extrabold text-red-900"> {currentPage}</span> of <span className="font-extrabold text-red-900">{totalPages}</span>
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 cursor-pointer rounded-full bg-gradient-to-r from-blue-900 to-gray-800 hover:from-blue-800 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Next Quote →
                </button>
              </div>
            </>
          )}

          {/* Back to Home Button */}
          <a
            href="/"
            className="inline-block text-white text-sm px-5 py-2 mt-10 sm:mt-20 rounded-full bg-gradient-to-r from-blue-900 to-gray-800 hover:from-blue-800 hover:to-gray-700 transition-all duration-300 text-center shadow-md w-full sm:w-auto text-center"
          >
            ← Back to Home
          </a>
        </div>
      </div>
      {/* %%% Outer wrapper ends here */}
    </>
  );
}
