"use client"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function QuoteForm() {
  const [topic, setTopic] = useState("");
  const router = useRouter();

  const suggestions = [
    "Life", "Success", "Love", "Wisdom", "Motivation",
    "Happiness", "Friendship", "Courage", "Faith", "Hope"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    router.push(`/quote?topic=${topic}`);
  };

  return (
    <div className="max-w-md mx-auto mt-none space-y-4">
      {/* form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input  className="bg-gray-100 hover:bg-white"
          type="text"
          placeholder="Select topic from the list below and get 3 quotes!            "
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button className="cursor-pointer hover:bg-white    hover:text-black  hover:border-1 hover:border-black  hover:font-bold " type="submit">Get Quotes</Button>
      </form>

      {/* suggestions */}
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {suggestions.map((tag, index) => (
          <Button   className="cursor-pointer hover:bg-black  hover:text-white                           "
            key={index}
            variant="outline"
            size="sm"
            onClick={() => router.push(`/quote?topic=${tag}`)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Quote of the Day */}
      <div className="flex justify-center mt-4">
        <Button
          className="bg-gray-950 hover:bg-gray-800  hover:cursor-pointer text-white font-bold"
          onClick={() => router.push("/quote-of-day")}
        >
          🌟 Quote of the Day
        </Button>
        
      </div>
    </div>
  );
}
