/**
 * Home.js
 * 
 * Home page. There are 2 sections.
 * Renders: 1. webpage title & search function (plus a button to slide to section 2)
 *          2. additional info
 */

import { useEffect, useState } from "react";
import "../styles/home.css";
import Search from "../components/Search.js";

const Home = () => {
  const [pressedQuestion, setPressedQuestion] = useState(false); // for sliding to section 2 (? in a circle)

  useEffect(() => {
    if (pressedQuestion) {
      window.scrollTo({
        top: 1500,
        behavior: "smooth",
      });
      setPressedQuestion(false);
    }
  }, [pressedQuestion]);

  window.addEventListener("beforeunload", () => {
    // clear text in the box when refreshed
    localStorage.clear();
  });

  return (
    <>
      <section id="section1" className="section">
        <div id="title-div-outer">
          <div id="title-div-inner">
            <h2>Interactive Country Information Guide</h2>
            <input
              type="submit"
              id="questionMark"
              value="?"
              onClick={(e) => setPressedQuestion(true)}
            />
          </div>
          <h1>DISCOVER THE WORLD</h1>
        </div>
        <Search />
      </section>
      <section id="section2" className="section">
        <div>
          <h2>What is this website for?</h2>
          <p>
            This website allows you to access to the basic information of any
            given country. Type the country name in the search box, the relevant
            information from this country will be shown. Resourses:
            restcountries.com
          </p>
          <footer>&copy; 2023 Jianhao Feng. All rights reserved.</footer>
        </div>
      </section>
    </>
  );
};

export default Home;
