"use client";
import { navbar } from "@/data";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div className="border-b border-gray-100 py-6">
        <nav className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              <Link href="/">MiniMart</Link>
            </h2>
            <ul className="hidden gap-8 md:flex">
              {navbar.map((menu) => (
                <li key={menu.id}>
                  <Link
                    href={menu.url}
                    className="font-medium text-gray-700 transition-colors hover:text-black"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* mobile menu toggle */}
            <button
              className="block md:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="size-8" /> : <Menu className="size-8" />}
            </button>
          </div>
        </nav>

        {/* dropdown */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute left-0 top-20 w-full bg-black p-10 text-white md:hidden`}
        >
          {navbar.map((menu) => (
            <Link
              key={menu.id}
              href={menu.url}
              className="flex flex-col pb-6 pr-4 text-lg font-semibold"
              onClick={() => setIsOpen(false)}
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
