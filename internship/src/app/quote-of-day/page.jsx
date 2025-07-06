"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const quotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "F. D. Roosevelt" },
  { text: "Do what you can, with what you have, where you are.", author: "T. Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
];

export default function QuoteOfDay() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const randomIndex = new Date().getDate() % quotes.length;
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4   bg-gradient-to-t from-black via-blue-950 to-black  ">
      <div className="max-w-xl w-full text-center">
        {quote && (
          <Card className=" shadow-md rounded-xl   bg-gradient-to-tr from-blue-100/50 via-gray-50 to-blue-100/50                 ">
            <CardContent  >
              <p  data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" 
               className="text-lg italic text-gray-800">"{quote.text}"</p>
              <p className="mt-2 font-semibold text-right text-gray-600">– {quote.author}</p>
            </CardContent>
          </Card>
        )}

        <a
          href="/"
          className="inline-block text-white text-sm px-6 py-2 mt-10 rounded-full bg-gradient-to-r from-blue-900 to-gray-800 hover:from-blue-800 hover:to-gray-700 transition-all duration-300 shadow-md"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
