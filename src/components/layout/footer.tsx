"use client";

import { FavouriteIcon, Github01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-semibold text-foreground text-sm">
              Disclaimer
            </h3>
            <p className="text-muted-foreground text-sm">
              This calculator is an independent tool and is not affiliated with,
              endorsed by, or connected to the CPF Board, Ministry of Manpower,
              or any government agency.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-foreground text-sm">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-foreground text-sm">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.cpf.gov.sg"
                  className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CPF Official Website
                </a>
              </li>
              <li>
                <a
                  href="https://www.mom.gov.sg"
                  className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ministry of Manpower
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between space-y-4 border-border border-t pt-8 md:flex-row md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} CPF Calculator. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HugeiconsIcon
                icon={Github01Icon}
                className="size-5"
                strokeWidth={2}
              />
              <span className="sr-only">GitHub</span>
            </a>
            <span className="flex items-center text-muted-foreground text-sm">
              Made with{" "}
              <HugeiconsIcon
                icon={FavouriteIcon}
                className="mx-1 size-4 text-red-500"
                strokeWidth={2}
              />{" "}
              in Singapore
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
