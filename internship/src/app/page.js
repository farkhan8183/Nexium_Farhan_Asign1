"use client";

import { useRouter } from "next/navigation"; // Not used here but likely for future routing needs
import QuoteForm from "@/components/QuoteForm";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-t from-black via-gray-950 to-black p-4">
      <div className="w-full max-w-xl flex flex-col items-center p-6 border-2 border-gray-950 rounded-3xl shadow-lg backdrop-blur-md transition-all duration-300 bg-gradient-to-t from-gray-400 via-white to-white">
        
        {/* added logo  here!*/}
        <img
          data-aos="fade-up"
          data-aos-duration="2000"
          src="/logo.png"
          alt="Logo"
          className="w-[250px] mt-4 mb-6 filter brightness-20"
        />

        {/* Form component to submit a new quote (check out in  components!!!)    */}
        <QuoteForm />
      </div>
    </main>
  );
}