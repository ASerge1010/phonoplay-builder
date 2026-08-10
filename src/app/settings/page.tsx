"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [compactLayout, setCompactLayout] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedTheme = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme="))
      ?.split("=")[1];

    const savedLayout = document.cookie
      .split("; ")
      .find((row) => row.startsWith("compactLayout="))
      ?.split("=")[1];

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }

    if (savedLayout) {
      setCompactLayout(savedLayout === "true");
    }
  }, []);

  const saveSettings = () => {
    document.cookie = `theme=${theme}; path=/; max-age=31536000`;
    document.cookie = `compactLayout=${compactLayout}; path=/; max-age=31536000`;

    document.documentElement.setAttribute("data-theme", theme);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="site">

<Navigation />

      <main>

        <section className="pageHero">

          <p className="eyebrow">
            PREFERENCES
          </p>

          <h1>
            Settings
          </h1>

          <p>
            Adjust the appearance and layout of the
            PhonoPlay activity builder.
          </p>

        </section>

        <section className="settingsContainer">

          <div className="settingsCard">

            <div className="settingsCardHeader">

              <div>

                <p className="eyebrow">
                  APPEARANCE
                </p>

                <h2>
                  Colour Theme
                </h2>

                <p>
                  Choose a light or dark interface.
                  Your preference will be saved for
                  future visits.
                </p>

              </div>

            </div>

            <div className="themeOptions">

              <button
                className={
                  theme === "light"
                    ? "themeOption activeTheme"
                    : "themeOption"
                }
                onClick={() =>
                  handleThemeChange("light")
                }
                aria-pressed={theme === "light"}
              >

                <span className="themeIcon">
                  ☀️
                </span>

                <span>
                  <strong>
                    Light
                  </strong>

                  <small>
                    Light background and dark text
                  </small>
                </span>

              </button>

              <button
                className={
                  theme === "dark"
                    ? "themeOption activeTheme"
                    : "themeOption"
                }
                onClick={() =>
                  handleThemeChange("dark")
                }
                aria-pressed={theme === "dark"}
              >

                <span className="themeIcon">
                  🌙
                </span>

                <span>
                  <strong>
                    Dark
                  </strong>

                  <small>
                    Dark background and light text
                  </small>
                </span>

              </button>

            </div>

          </div>

          <div className="settingsCard">

            <div>

              <p className="eyebrow">
                LAYOUT
              </p>

              <h2>
                Display Preferences
              </h2>

              <p>
                Choose how much space is used by
                the activity builder interface.
              </p>

            </div>

            <label className="toggleSetting">

              <span>

                <strong>
                  Compact layout
                </strong>

                <small>
                  Reduce spacing between builder
                  components.
                </small>

              </span>

              <input
                type="checkbox"
                checked={compactLayout}
                onChange={(event) =>
                  setCompactLayout(event.target.checked)
                }
              />

            </label>

          </div>

          <div className="settingsCard accessibilityCard">

            <div>

              <p className="eyebrow">
                ACCESSIBILITY
              </p>

              <h2>
                Accessibility
              </h2>

              <p>
                PhonoPlay uses clear labels, keyboard
                controls, colour contrast and
                descriptive feedback to support
                different users.
              </p>

            </div>

            <ul>
              <li>
                Keyboard-accessible controls
              </li>

              <li>
                Descriptive button labels
              </li>

              <li>
                Visible feedback messages
              </li>

              <li>
                Responsive mobile layout
              </li>
            </ul>

          </div>

          <div className="saveSettings">

            <button
              className="primaryButton"
              onClick={saveSettings}
            >
              Save Settings
            </button>

            {saved && (
              <span
                className="savedMessage"
                role="status"
              >
                ✓ Settings saved
              </span>
            )}

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}