"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function QuoteForm({ onSubmit }) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic);
      setTopic("");
    }
  };

  return (
    //form  will  have an input btn whose value=user input(text),that on  submit  will  be  sent  to  home.jsx!
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <Input
        type="text"
        placeholder="Enter a topic like love, success..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <Button className="hover:cursor-pointer" type="submit">Generate Quote</Button>
    </form>
  );
}
