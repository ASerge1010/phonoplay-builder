import Link from "next/link";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export default function About() {
  return (
    <div className="site">
      <Navigation />

      <main>
        <section className="pageHero">
          <p className="eyebrow">ABOUT THE PROJECT</p>

          <h1>About PhonoPlay</h1>

          <p>
            PhonoPlay is a frontend web application designed to help Speech
            Pathology teachers create phoneme-based classroom activities.
          </p>
        </section>

        <section className="aboutContent">
          <article className="aboutCard">
            <h2>What is PhonoPlay?</h2>

            <p>
              PhonoPlay provides teachers with a simple interface for creating
              and previewing interactive phoneme-based activities. The
              application focuses on two activities: a Wordle-style game and a
              Word Search activity.
            </p>

            <p>
              The tool is designed for teachers and Speech Pathology students
              preparing classroom activities. It is not intended to be used
              directly as a clinical tool with clients.
            </p>
          </article>

          <article className="aboutCard">
            <h2>Assessment 1</h2>

            <p>
              Assessment 1 focuses on frontend design, usability,
              accessibility and responsive design. The application currently
              uses fixed phoneme content rather than a database.
            </p>

            <p>
              Later stages of the project will introduce more advanced
              functionality, including larger word lists and database-driven
              content.
            </p>
          </article>

          <div className="activityInfo">
            <article className="activityCard">
              <div className="cardIcon">W</div>

              <h2>Wordle</h2>

              <p>
                The Wordle builder creates a phoneme-based activity using a
                single target word. Teachers can configure the activity,
                preview it and generate a standalone HTML file.
              </p>

              <Link href="/wordle" className="primaryButton">
                Try Wordle →
              </Link>
            </article>

            <article className="activityCard">
              <div className="cardIcon">⌕</div>

              <h2>Word Search</h2>

              <p>
                The Word Search builder uses a small collection of
                phoneme-based words to create a classroom activity.
              </p>

              <Link href="/word-search" className="primaryButton">
                Try Word Search →
              </Link>
            </article>
          </div>

          <article className="videoCard">
            <p className="eyebrow">WEBSITE GUIDE</p>

            <h2>How to use PhonoPlay</h2>

            <p>
              A short demonstration video will explain how to navigate the
              website, configure activities, preview the results and generate
              playable HTML files.
            </p>

            <div className="videoPlaceholder">
              <span>▶</span>
              <p>Your demonstration video will be placed here.</p>
            </div>
          </article>

          <article className="studentCard">
            <h2>Student Information</h2>

            <div className="studentDetails">
              <div>
                <span>Name</span>
                <strong>Aisha Sergeant</strong>
              </div>

              <div>
                <span>Student Number</span>
                <strong>22809280</strong>
              </div>

              <div>
                <span>Assessment</span>
                <strong>Assessment 1 — Frontend Design & Usability</strong>
              </div>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}