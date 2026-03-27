"use client";

import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="">
      <div className="container grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h1 className="title-xl">Smart Printing, Simplified</h1>

          <p className="paragraph-lg max-w-xl">
            Manage your print jobs, control your balance, and print securely —
            all in one modern platform.
          </p>

          <div className="flex gap-4">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
          <Image
            src="/mainPage/hero/hero.png"
            alt="Printer Hero"
            fill
            priority
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
