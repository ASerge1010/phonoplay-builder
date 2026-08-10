"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const phonemes = [
  { symbol: "/θ/", letters: "TH", example: "thin" },
  { symbol: "/ɪ/", letters: "I", example: "sit" },
  { symbol: "/n/", letters: "N", example: "no" },
  { symbol: "/ʃ/", letters: "SH", example: "ship" },
  { symbol: "/m/", letters: "M", example: "man" },
  { symbol: "/æ/", letters: "A", example: "cat" },
];

const targetWord = ["/θ/", "/ɪ/", "/n/"];

export default function Wordle() {
  const [difficulty, setDifficulty] = useState("Easy");
  const [selectedPhonemes, setSelectedPhonemes] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const generateHTML = () => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PhonoPlay - Phoneme Wordle</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: #f8fafc;
      color: #172033;
    }

    .container {
      max-width: 700px;
      margin: 0 auto;
      padding: 40px 20px;
      text-align: center;
    }

    h1 {
      color: #312e81;
      margin-bottom: 10px;
    }

    .subtitle {
      color: #64748b;
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .difficulty {
      display: inline-block;
      padding: 7px 12px;
      border-radius: 20px;
      background: #eef2ff;
      color: #4f46e5;
      font-weight: bold;
      margin-bottom: 25px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 90px);
      justify-content: center;
      gap: 10px;
      margin: 30px 0;
    }

    .tile {
      width: 90px;
      height: 90px;
      border: 2px solid #cbd5e1;
      border-radius: 10px;
      display: grid;
      place-items: center;
      font-size: 1.4rem;
      font-weight: bold;
      background: white;
    }

    .keyboard {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      max-width: 500px;
      margin: 30px auto;
    }

    .key {
      padding: 15px 8px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 1rem;
    }

    .key:hover {
      background: #eef2ff;
      border-color: #4f46e5;
    }

    .key strong {
      display: block;
      font-size: 1.2rem;
    }

    .key span {
      display: block;
      margin-top: 5px;
      color: #64748b;
      font-size: 0.75rem;
    }

    .hint {
      margin: 25px auto;
      padding: 18px;
      max-width: 500px;
      background: #eef2ff;
      border-left: 4px solid #4f46e5;
      text-align: left;
      line-height: 1.6;
    }

    .result {
      margin-top: 20px;
      padding: 15px;
      border-radius: 10px;
      font-weight: bold;
      display: none;
    }

    .correct {
      display: block;
      background: #dcfce7;
      color: #166534;
    }

    .incorrect {
      display: block;
      background: #fee2e2;
      color: #991b1b;
    }

    .reset {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      background: #4f46e5;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .reset:hover {
      background: #4338ca;
    }

    @media (max-width: 500px) {
      .grid {
        grid-template-columns: repeat(3, 75px);
      }

      .tile {
        width: 75px;
        height: 75px;
        font-size: 1.1rem;
      }

      .keyboard {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
</head>

<body>

  <main class="container">

    <h1>PhonoPlay Wordle</h1>

    <p class="subtitle">
      Build the phoneme sequence that matches the target word.
    </p>

    <div class="difficulty">
      Difficulty: ${difficulty}
    </div>

    <div class="grid">
      <div class="tile" id="tile0">?</div>
      <div class="tile" id="tile1">?</div>
      <div class="tile" id="tile2">?</div>
    </div>

    <div class="keyboard">

      <button class="key" title="TH — as in thin" onclick="addPhoneme('/θ/')">
        <strong>/θ/</strong>
        <span>TH — thin</span>
      </button>

      <button class="key" title="I — as in sit" onclick="addPhoneme('/ɪ/')">
        <strong>/ɪ/</strong>
        <span>I — sit</span>
      </button>

      <button class="key" title="N — as in no" onclick="addPhoneme('/n/')">
        <strong>/n/</strong>
        <span>N — no</span>
      </button>

      <button class="key" title="SH — as in ship" onclick="addPhoneme('/ʃ/')">
        <strong>/ʃ/</strong>
        <span>SH — ship</span>
      </button>

      <button class="key" title="M — as in man" onclick="addPhoneme('/m/')">
        <strong>/m/</strong>
        <span>M — man</span>
      </button>

      <button class="key" title="A — as in cat" onclick="addPhoneme('/æ/')">
        <strong>/æ/</strong>
        <span>A — cat</span>
      </button>

    </div>

    <div class="hint">
      <strong>Hint:</strong>
      The first phoneme is <strong>/θ/</strong>, which corresponds
      to <strong>TH</strong> as in "thin".
    </div>

    <div id="result" class="result"></div>

    <button class="reset" onclick="resetGame()">
      Reset
    </button>

  </main>

  <script>

    const target = ['/θ/', '/ɪ/', '/n/'];

    let selected = [];

    function addPhoneme(phoneme) {

      if (selected.length >= 3) {
        return;
      }

      selected.push(phoneme);

      updateGrid();

      if (selected.length === 3) {
        checkAnswer();
      }
    }

    function updateGrid() {

      for (let i = 0; i < 3; i++) {

        const tile = document.getElementById('tile' + i);

        tile.textContent = selected[i] || '?';

      }

    }

    function checkAnswer() {

      const result = document.getElementById('result');

      const correct =
        selected.length === target.length &&
        selected.every(
          (phoneme, index) => phoneme === target[index]
        );

      if (correct) {

        result.className = 'result correct';

        result.innerHTML =
          'Correct! /θɪn/ = THIN';

      } else {

        result.className = 'result incorrect';

        result.innerHTML =
          'Not quite. Try again.';

      }
    }

    function resetGame() {

      selected = [];

      updateGrid();

      const result = document.getElementById('result');

      result.className = 'result';

      result.innerHTML = '';

    }

  </script>

</body>
</html>
`;

    const blob = new Blob([html], {
      type: "text/html",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "phonoplay-wordle.html";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const selectPhoneme = (phoneme: string) => {
    if (selectedPhonemes.length >= 3) {
      return;
    }

    setSelectedPhonemes([...selectedPhonemes, phoneme]);
    setMessage("");
  };

  const removePhoneme = (index: number) => {
    setSelectedPhonemes(
      selectedPhonemes.filter((_, phonemeIndex) => phonemeIndex !== index)
    );
  };

  const checkAnswer = () => {
    if (selectedPhonemes.length !== targetWord.length) {
      setMessage("Please enter three phonemes.");
      return;
    }

    const correct = selectedPhonemes.every(
      (phoneme, index) => phoneme === targetWord[index]
    );

    if (correct) {
      setMessage("Correct! /θɪn/ = THIN");
    } else {
      setMessage("Not quite. Try again.");
    }
  };

  const resetGame = () => {
    setSelectedPhonemes([]);
    setMessage("");
  };

  return (
    <div className="site">
      <Navigation />

      <main>
        <section className="pageHero">
          <p className="eyebrow">ACTIVITY BUILDER</p>

          <h1>Phoneme Wordle</h1>

          <p>
            Create a Wordle-style classroom activity using phoneme symbols
            rather than standard spelling.
          </p>
        </section>

        <section className="builderLayout">
          <div className="builderPanel">
            <div className="panelHeader">
              <div>
                <p className="eyebrow">1. CONFIGURE</p>
                <h2>Activity Settings</h2>
              </div>
            </div>

            <div className="settingGroup">
              <label htmlFor="difficulty">Difficulty</label>

              <select
                id="difficulty"
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
              >
                <option value="Easy">Easy — 6 attempts</option>
                <option value="Medium">Medium — 5 attempts</option>
                <option value="Hard">Hard — 4 attempts</option>
              </select>
            </div>

            <div className="settingGroup">
              <div className="settingLabel">
                <span>Target phonemes</span>
                <span>{selectedPhonemes.length}/3</span>
              </div>

              <div className="selectedPhonemes">
                {selectedPhonemes.length === 0 ? (
                  <p className="emptyState">
                    Select phonemes below to create your guess.
                  </p>
                ) : (
                  selectedPhonemes.map((phoneme, index) => (
                    <button
                      key={`${phoneme}-${index}`}
                      className="selectedPhoneme"
                      onClick={() => removePhoneme(index)}
                      aria-label={`Remove ${phoneme}`}
                    >
                      {phoneme}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="settingGroup">
              <label>Phoneme keyboard</label>

              <div className="phonemeKeyboard">
                {phonemes.map((phoneme) => (
                  <button
                  key={phoneme.symbol}
                  className="phonemeButton"
                  title={`${phoneme.letters} — as in "${phoneme.example}"`}
                  aria-label={`${phoneme.symbol}, ${phoneme.letters}, as in ${phoneme.example}`}
                  onClick={() => selectPhoneme(phoneme.symbol)}
                >
                    <strong>{phoneme.symbol}</strong>
                    <span>{phoneme.letters}</span>
                  </button>
                ))}
              </div>

              <p className="keyboardHelp">
                Hover over a phoneme to see its English letter equivalent.
              </p>
            </div>

            <div className="buttonRow">
              <button
                className="primaryButton"
                onClick={checkAnswer}
              >
                Check Answer
              </button>

              <button
                className="secondaryButton"
                onClick={resetGame}
              >
                Reset
              </button>
            </div>

            {message && (
  <div
    className={`feedback ${
      message.startsWith("Correct")
        ? "feedbackSuccess"
        : "feedbackError"
    }`}
    role="status"
    aria-live="polite"
  >
    {message}
  </div>
)}
          </div>

          <div className="builderPanel previewPanel">
            <div className="panelHeader">
              <div>
                <p className="eyebrow">2. PREVIEW</p>
                <h2>Activity Preview</h2>
              </div>

              <span className="previewBadge">{difficulty}</span>
            </div>

            <div className="gamePreview">
              <div className="gameTitle">
                <span>PHONEME WORDLE</span>
                <span className="attemptBadge">
                  {difficulty === "Easy"
                    ? "6"
                    : difficulty === "Medium"
                    ? "5"
                    : "4"}{" "}
                  attempts
                </span>
              </div>

              <p className="gameInstruction">
                Build the phoneme sequence that matches the target word.
              </p>

              <div className="wordleGrid">
                {[0, 1, 2].map((index) => (
                  <div className="wordleTile" key={index}>
                    {selectedPhonemes[index] || "?"}
                  </div>
                ))}
              </div>

              <div className="targetHint">
                <span>Target length</span>
                <strong>3 phonemes</strong>
              </div>

              <div className="phonemeHint">
                <strong>Hint</strong>

                <p>
                  The first phoneme is <strong>/θ/</strong>, which corresponds
                  to <strong>TH</strong> as in "thin".
                </p>
              </div>

              {message.startsWith("Correct") && (
                <div className="answerReveal">
                  <span>Correct answer</span>
                  <strong>/θɪn/</strong>
                  <strong>THIN</strong>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="generateSection">
          <div>
            <p className="eyebrow">3. GENERATE</p>
            <h2>Ready to create your activity?</h2>
            <p>
              Generate a standalone HTML file that can be opened and played
              in a normal web browser.
            </p>
          </div>

          <button
  className="primaryButton generateButton"
  onClick={generateHTML}
>
  Generate HTML
</button>
        </section>
      </main>

      <Footer />
    </div>
  );
}