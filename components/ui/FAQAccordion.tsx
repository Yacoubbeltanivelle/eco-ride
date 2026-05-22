"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQ } from "@/types/offer";
import { cn } from "@/lib/utils";

interface Props {
  items: FAQ[];
  category?: FAQ["category"];
}

export default function FAQAccordion({ items, category }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const filtered = category ? items.filter(i => i.category === category || i.category === "general") : items;

  return (
    <div className="flex flex-col gap-2">
      {filtered.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="font-medium text-gray-900 pr-4">{item.question}</span>
            <ChevronDown className={cn("w-5 h-5 text-gray-400 shrink-0 transition-transform", open === i && "rotate-180")} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-50">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
