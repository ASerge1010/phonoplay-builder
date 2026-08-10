"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <Link
        href="/"
        className="logo"
        onClick={closeMenu}
      >
        🔊 PhonoPlay
      </Link>

      {/* Desktop navigation */}

      <nav
        className="navLinks"
        aria-label="Main navigation"
      >

        <Link href="/" onClick={closeMenu}>
          Home
        </Link>

        <Link href="/wordle" onClick={closeMenu}>
          Wordle
        </Link>

        <Link href="/word-search" onClick={closeMenu}>
          Word Search
        </Link>

        <Link href="/about" onClick={closeMenu}>
          About
        </Link>

        <Link href="/settings" onClick={closeMenu}>
          Settings
        </Link>

      </nav>

      {/* Mobile menu button */}

      <button
        className="menuButton"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile navigation */}

      {menuOpen && (

<nav
id="mobile-navigation"
className="mobileMenu"
aria-label="Mobile navigation"
>

          <Link
            href="/"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            href="/wordle"
            onClick={closeMenu}
          >
            Wordle
          </Link>

          <Link
            href="/word-search"
            onClick={closeMenu}
          >
            Word Search
          </Link>

          <Link
            href="/about"
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            href="/settings"
            onClick={closeMenu}
          >
            Settings
          </Link>

        </nav>

      )}

    </header>
  );
}