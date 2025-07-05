"use client"; 

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { quotes } from "@/data/quotesData";

export default function QuoteForm() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // ### Track search state

  const suggestions = [
    "Life", "Success", "Love", "Wisdom", "Motivation",
    "Happiness", "Friendship", "Courage", "Faith", "Hope"
  ];

  const handleSearch = (searchTopic) => {
    const filtered = quotes.filter(
      (quote) => quote.topic.toLowerCase() === searchTopic.toLowerCase()
    );

    const randomQuotes = filtered;

    setResults(randomQuotes);
    setHasSearched(true); // ### Mark search as done
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim() !== "") {
      handleSearch(topic);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      {/* form*/}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter a topic (e.g. Life, Success)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button className="cursor-pointer" type="submit">Get Quotes</Button>
      </form>

      {/* --- suggestions!! --- */}
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {suggestions.map((tag, index) => (
          <Button className="cursor-pointer"
            key={index}
            variant="outline"
            size="sm"
            onClick={() => {
              setTopic(tag);
              handleSearch(tag);
            }}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* results on  ui */}
      {hasSearched && ( // ### Show only after search
        <div className="space-y-4">
          {results.length === 0 ? (
            <p className="text-sm text-gray-500">No quotes found for this topic.</p>
          ) : (
            results.map((quote, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <p className="font-medium text-base text-gray-800">{quote.text}</p>
                  <Separator className="my-2" />
                  <p className="text-sm text-gray-500">Topic: {quote.topic}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
