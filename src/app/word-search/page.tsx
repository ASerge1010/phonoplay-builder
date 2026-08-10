"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const words = [
  {
    phonemes: "/θɪn/",
    english: "THIN",
  },
  {
    phonemes: "/ʃɪp/",
    english: "SHIP",
  },
  {
    phonemes: "/mæn/",
    english: "MAN",
  },
  {
    phonemes: "/sɪt/",
    english: "SIT",
  },
  {
    phonemes: "/kæt/",
    english: "CAT",
  },
];

const grid = [
  ["T", "H", "I", "N", "M", "A", "N", "S"],
  ["S", "H", "I", "P", "C", "A", "T", "E"],
  ["M", "A", "N", "S", "I", "T", "R", "L"],
  ["C", "A", "T", "T", "H", "I", "N", "O"],
  ["P", "H", "O", "N", "E", "M", "E", "S"],
  ["S", "I", "T", "W", "O", "R", "D", "S"],
  ["T", "H", "I", "N", "A", "C", "T", "I"],
  ["S", "H", "I", "P", "M", "A", "N", "X"],
];

export default function WordSearch() {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [message, setMessage] = useState("");

  const selectCell = (index: number) => {
    if (selectedCells.includes(index)) {
      setSelectedCells(
        selectedCells.filter((cell) => cell !== index)
      );
      return;
    }

    setSelectedCells([...selectedCells, index]);
    setMessage("");
  };

  const checkSelection = () => {
    if (selectedCells.length === 0) {
      setMessage("Select letters from the grid first.");
      return;
    }

    const selectedLetters = selectedCells
      .map((index) => {
        const row = Math.floor(index / 8);
        const column = index % 8;

        return grid[row][column];
      })
      .join("");

    const matchingWord = words.find(
      (word) => word.english === selectedLetters
    );

    if (matchingWord) {
      if (!foundWords.includes(matchingWord.english)) {
        setFoundWords([...foundWords, matchingWord.english]);
      }

      setMessage(
        `Correct! ${matchingWord.phonemes} = ${matchingWord.english}`
      );
    } else {
      setMessage("That selection does not match a target word.");
    }

    setSelectedCells([]);
  };

  const resetActivity = () => {
    setSelectedCells([]);
    setFoundWords([]);
    setMessage("");
  };

  const generateHTML = () => {
    const html = `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

<title>PhonoPlay - Phoneme Word Search</title>

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
  max-width: 850px;
  margin: auto;
  padding: 40px 20px;
  text-align: center;
}

h1 {
  color: #312e81;
}

.subtitle {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(8, 48px);
  justify-content: center;
  gap: 6px;
  margin: 30px auto;
}

.cell {
  width: 48px;
  height: 48px;
  border: 1px solid #cbd5e1;
  background: white;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.cell:hover {
  background: #eef2ff;
  border-color: #4f46e5;
}

.cell.selected {
  background: #4f46e5;
  color: white;
}

.words {
  max-width: 550px;
  margin: 30px auto;
  display: grid;
  gap: 10px;
}

.word {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.word strong {
  color: #312e81;
}

button.action {
  padding: 13px 20px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button.reset {
  margin-left: 10px;
  background: #64748b;
}

.hint {
  margin: 25px auto;
  max-width: 550px;
  padding: 15px;
  background: #eef2ff;
  border-left: 4px solid #4f46e5;
  text-align: left;
  line-height: 1.5;
}

.feedback {
  margin: 20px auto;
  padding: 14px;
  max-width: 550px;
  border-radius: 8px;
  background: #dcfce7;
  color: #166534;
  font-weight: bold;
}

@media (max-width: 600px) {

  .grid {
    grid-template-columns: repeat(8, 34px);
    gap: 4px;
  }

  .cell {
    width: 34px;
    height: 34px;
    font-size: 0.8rem;
  }

}

</style>

</head>

<body>

<main class="container">

<h1>PhonoPlay Word Search</h1>

<p class="subtitle">
Find the target words in the phoneme-based word search.
</p>

<div class="grid" id="grid"></div>

<div class="hint">

<strong>Phoneme hint:</strong>

Find the word represented by
<strong>/θɪn/</strong>.
It corresponds to <strong>THIN</strong>.

</div>

<div class="words">

<div class="word">
<strong>/θɪn/</strong>
<span>THIN</span>
</div>

<div class="word">
<strong>/ʃɪp/</strong>
<span>SHIP</span>
</div>

<div class="word">
<strong>/mæn/</strong>
<span>MAN</span>
</div>

<div class="word">
<strong>/sɪt/</strong>
<span>SIT</span>
</div>

<div class="word">
<strong>/kæt/</strong>
<span>CAT</span>
</div>

</div>

<p id="feedback"></p>

<button class="action" onclick="checkWord()">
Check Selection
</button>

<button class="action reset" onclick="resetGame()">
Reset
</button>

</main>

<script>

const letters = [
"T","H","I","N","M","A","N","S",
"H","I","P","C","A","T","E","L",
"A","N","S","I","T","R","L","C",
"A","T","T","H","I","N","O","P",
"H","O","N","E","M","E","S","S",
"I","T","W","O","R","D","S","T",
"H","I","N","A","C","T","I","V",
"S","H","I","P","M","A","N","X"
];

const targetWords = [
"THIN",
"SHIP",
"MAN",
"SIT",
"CAT"
];

let selected = [];

const gridElement = document.getElementById("grid");

letters.forEach((letter, index) => {

const button = document.createElement("button");

button.className = "cell";

button.textContent = letter;

button.onclick = () => {

button.classList.toggle("selected");

if (selected.includes(index)) {

selected = selected.filter(
item => item !== index
);

} else {

selected.push(index);

}

};

gridElement.appendChild(button);

});

function checkWord() {

const selectedLetters = selected
.map(index => letters[index])
.join("");

const feedback =
document.getElementById("feedback");

if (targetWords.includes(selectedLetters)) {

feedback.className = "feedback";

feedback.textContent =
"Correct! " + selectedLetters;

} else {

feedback.className = "feedback";

feedback.textContent =
"Try again. Select a target word.";

}

}

function resetGame() {

selected = [];

document
.querySelectorAll(".cell")
.forEach(cell => {
cell.classList.remove("selected");
});

document.getElementById("feedback").textContent = "";

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

    link.download = "phonoplay-word-search.html";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="site">

<Navigation />

      <main>

        <section className="pageHero">

          <p className="eyebrow">
            ACTIVITY BUILDER
          </p>

          <h1>
            Phoneme Word Search
          </h1>

          <p>
            Create a classroom word search using
            phoneme-based vocabulary.
          </p>

        </section>

        <section className="builderLayout">

          <div className="builderPanel">

            <div className="panelHeader">

              <div>

                <p className="eyebrow">
                  1. CONFIGURE
                </p>

                <h2>
                  Activity Settings
                </h2>

              </div>

            </div>

            <div className="settingGroup">

              <label htmlFor="searchDifficulty">
                Difficulty
              </label>

              <select
                id="searchDifficulty"
                value={difficulty}
                onChange={(event) =>
                  setDifficulty(event.target.value)
                }
              >

                <option value="Easy">
                  Easy — 5 words
                </option>

                <option value="Medium">
                  Medium — 5 words
                </option>

                <option value="Hard">
                  Hard — 5 words
                </option>

              </select>

            </div>

            <div className="wordList">

              <label>
                Target words
              </label>

              {words.map((word) => (

                <div
                  className={`targetWord ${
                    foundWords.includes(word.english)
                      ? "wordFound"
                      : ""
                  }`}
                  key={word.english}
                >

                  <span>
                    {word.phonemes}
                  </span>

                  <strong>
                    {word.english}
                  </strong>

                  {foundWords.includes(word.english) && (
                    <span>✓</span>
                  )}

                </div>

              ))}

            </div>

            <div className="settingGroup">

              <label>
                Phoneme hint
              </label>

              <div className="phonemeHint">

                <strong>/θ/</strong>

                <p>
                  TH — as in "thin"
                </p>

              </div>

            </div>

            <div className="buttonRow">

              <button
                className="primaryButton"
                onClick={checkSelection}
              >
                Check Selection
              </button>

              <button
                className="secondaryButton"
                onClick={resetActivity}
              >
                Reset
              </button>

            </div>

            {message && (

              <div
                className="feedback feedbackSuccess"
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

                <p className="eyebrow">
                  2. PREVIEW
                </p>

                <h2>
                  Activity Preview
                </h2>

              </div>

              <span className="previewBadge">
                {difficulty}
              </span>

            </div>

            <div className="searchPreview">

              <h3>
                Find the phoneme words
              </h3>

              <p>
                Select letters in the grid to find
                the target words.
              </p>

              <div className="searchGrid">

                {grid.flat().map((letter, index) => (

                  <button
                    key={index}
                    className={
                      selectedCells.includes(index)
                        ? "searchCell selectedCell"
                        : "searchCell"
                    }
                    onClick={() => selectCell(index)}
                    aria-label={`Letter ${letter}`}
                  >
                    {letter}
                  </button>

                ))}

              </div>

              <div className="searchHint">

                <strong>Hint</strong>

                <p>
                  /θɪn/ corresponds to
                  <strong> THIN</strong>.
                </p>

              </div>

            </div>

          </div>

        </section>

        <section className="generateSection">

          <div>

            <p className="eyebrow">
              3. GENERATE
            </p>

            <h2>
              Ready to create your activity?
            </h2>

            <p>
              Generate a standalone HTML file
              that can be opened in a normal
              web browser.
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