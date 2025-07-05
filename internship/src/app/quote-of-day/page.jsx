// app/quote-of-day.jsx
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
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold mb-4"> Quote of the Day</h1>
      {quote && (
        <Card>
          <CardContent className="p-6">
            <p className="text-lg italic">"{quote.text}"</p>
            <p className="mt-2 font-semibold text-right">– {quote.author}</p>
          </CardContent>
        </Card>
        
      )}
      
      <a href="/" className="block text-center mt-6 text-indigo-500 underline">
        ← Back to Home
      </a>
    </div>
  );
}
