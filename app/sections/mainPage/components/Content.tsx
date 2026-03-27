"use client";

import GlowButton from "@/app/components/ui/button/GlowButton";
import Card from "@/app/components/ui/card/Card";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import Hero from "./Hero";

const Content = () => {
  return (
    <div className="container ">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/sections/user/print" className="btn-primary">
          Go to User
        </Link>

        <Link href="/sections/admin/dashboard" className="btn-secondary">
          Go to Admin
        </Link>
      </div>

      <Hero />

      {/* Existing Cards */}
      <div className="space-y-15 mt-15">
        {[
          { name: "Features", link: "#features" },
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
