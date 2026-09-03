"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./button";
import { cn } from "./cn";

type NavItem = {
  href: string;
  label: string;
  variant: "ghost" | "pill";
};

type NavBarProps = {
  brand: string;
  items: NavItem[];
};

function getPanelFocusables(panel: HTMLElement) {
  return Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
}

function getPanelLinks(panel: HTMLElement) {
  return Array.from(panel.querySelectorAll<HTMLElement>("a[href]"));
}

export function NavBar({ brand, items }: NavBarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      if (wasOpenRef.current) {
        hamburgerRef.current?.focus();
      }
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    if (panel) getPanelLinks(panel)[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusables = getPanelFocusables(panel);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const links = getPanelLinks(panel);

      if (event.shiftKey) {
        if (active === first || !panel.contains(active)) {
          event.preventDefault();
          (links[links.length - 1] ?? last).focus();
        }
      } else if (active === last || !panel.contains(active)) {
        event.preventDefault();
        (links[0] ?? first).focus();
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      if (!panel || panel.contains(event.target as Node)) return;
      const links = getPanelLinks(panel);
      links[0]?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onContact = pathname === "/contact";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-[5vw] py-[22px] transition-colors",
          scrolled
            ? onContact
              ? "bg-contact/90 backdrop-blur-[10px]"
              : "bg-bg/90 backdrop-blur-[10px]"
            : "bg-transparent",
        )}
      >
        <Link
          href="/"
          className={cn(
            "font-serif text-[26px] font-semibold tracking-[0.5px] transition-colors",
            onContact ? "text-bg" : "text-ink",
          )}
        >
          {brand}
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Navigation principale">
          {items.map((item) => (
            <Button
              key={item.href}
              variant={item.variant}
              href={item.href}
              className={
                item.variant === "ghost"
                  ? pathname === item.href
                    ? "text-accent"
                    : onContact
                      ? "text-bg hover:text-accent"
                      : undefined
                  : undefined
              }
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <button
          ref={hamburgerRef}
          type="button"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center md:hidden",
            onContact ? "text-bg" : "text-ink",
          )}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-8 bg-bg"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <button
            type="button"
            className="absolute right-[5vw] top-[22px] inline-flex h-10 w-10 items-center justify-center text-ink"
            aria-label="Fermer"
            onClick={() => setOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {items.map((item) => (
            <Button
              key={item.href}
              variant={item.variant}
              href={item.href}
              className={item.variant === "ghost" && pathname === item.href ? "text-accent" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      ) : null}
    </>
  );
}
