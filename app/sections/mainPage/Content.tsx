"use client";

import Card from "@/app/components/ui/card/Card";
import Link from "next/link";
import Hero from "./sections/Hero";
import Features from "./sections/features/Features";
import Button from "@/app/components/ui/button/Button";

const Content = () => {
  return (
    <div className="container ">
      <Hero />
      <Features />

      {/* Existing Cards */}
      <div className="space-y-15 mt-15">
        {[
          { name: "How It Works", link: "#how-it-works" },
          { name: "Web Print", link: "#web-print" },
          { name: "Pricing", link: "#pricing" },
          { name: "FAQ", link: "#faq" },
          { name: "Contact", link: "#contact" },
        ].map((card) => (
          <Card
            key={card.name}
            className="items-center flex justify-center h-52"
          >
            {card.name}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Content;
