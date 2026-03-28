"use client";

import Button from "@/app/components/ui/button/Button";
import { motion } from "motion/react";
import { LayoutTextFlip } from "../components/ui/layout-text-flip";
import Link from "next/link";
import { Spotlight } from "lucide-react";

const Hero = () => {
  return (
    <section className="section relative overflow-hidden">
      {/* Spotlight background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in srgb, var(--border) 65%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--border) 65%, transparent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <Spotlight className="-top-56" fill="var(--color-brand-400)" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LayoutTextFlip
                text="Smart Printing,"
                words={["Simplified", "Secure", "Organized", "Made for KFUPM"]}
              />
            </motion.div>

            <p className="paragraph mx-auto max-w-2xl">
              Manage your print jobs, upload files easily, and print with a
              modern experience designed to be simple, secure, and efficient.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button>
              <Link href="/sections/user/print">Go to User</Link>
            </Button>

            <Button variant="secondary">
              <Link href="/sections/admin/dashboard">Go to Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
