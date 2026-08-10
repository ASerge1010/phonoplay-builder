import Link from "next/link";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="site">
      <Navigation />

      <main>
        <section className="hero">
          <div className="heroContent">
            <p className="eyebrow">SPEECH PATHOLOGY CLASSROOM TOOL</p>

            <h1>Phoneme-based activities made simple.</h1>

            <p className="heroText">
              PhonoPlay helps Speech Pathology teachers create engaging
              phoneme-based classroom activities. Build, preview and generate
              interactive Wordle and Word Search activities for students.
            </p>

            <div className="heroButtons">
              <Link href="/wordle" className="primaryButton">
                Create Wordle →
              </Link>

              <Link href="/word-search" className="secondaryButton">
                Create Word Search
              </Link>
            </div>
          </div>

          <div className="heroPreview">
            <div className="previewHeader">
              <span>Wordle Preview</span>
              <span className="previewBadge">PHONEME</span>
            </div>

            <div className="phonemeGrid">
              <div>/θ/</div>
              <div>/ɪ/</div>
              <div>/n/</div>
            </div>

            <p className="previewWord">/θɪn/</p>
            <p className="previewMeaning">THIN</p>

            <div className="hint">
              <strong>/θ/</strong>
              <span>TH — as in "thin"</span>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="sectionHeading">
            <p className="eyebrow">ACTIVITY BUILDER</p>
            <h2>Choose an activity</h2>
            <p>
              Create a classroom-ready activity using phoneme-based content.
            </p>
          </div>

          <div className="featureCards">
            <article className="featureCard">
              <div className="cardIcon">W</div>
              <h3>Phoneme Wordle</h3>
              <p>
                Create a Wordle-style activity using a single phoneme-based
                target word.
              </p>
              <Link href="/wordle">Open Wordle Builder →</Link>
            </article>

            <article className="featureCard">
              <div className="cardIcon">⌕</div>
              <h3>Phoneme Word Search</h3>
              <p>
                Build a word search using a small collection of phoneme-based
                target words.
              </p>
              <Link href="/word-search">Open Word Search Builder →</Link>
            </article>

            <article className="featureCard">
              <div className="cardIcon">⚙</div>
              <h3>Customise</h3>
              <p>
                Adjust the interface appearance and accessibility preferences
                through the settings page.
              </p>
              <Link href="/settings">Open Settings →</Link>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}