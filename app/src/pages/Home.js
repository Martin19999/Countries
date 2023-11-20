import { useState } from "react";
import Result from "./Result";
import Error from "./Error";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const navigate = useNavigate();


    const [input, setInput] = useState('')
    const [error, setError] = useState(false)

    const check = (e) => {
      e.preventDefault();
      if (input === null || input.trim().length === 0) {
        setError(true);
        console.log("....");
      } else {
        setError(false);
        localStorage.setItem('input', input);
        console.log("..");
        console.log("Request Body:", { input });

        const url = `https://restcountries.com/v3.1/name/${input}?fullText=true`;

        axios.post(url, { input }, { headers: { 'Content-Type': 'application/json' } })
            .then(() => {
              navigate(Result, { state: { input } });
            })
            .catch(() => {
              navigate(Error, { state: { input } });
            });
      }
    }

  
    return (
      <>
        <section id="section1" className="section">
          <h1>Discover the World: Interactive Country Information Guide</h1>
          <form action="/submit-form" method="post">
            <label htmlFor="input">Enter a country:</label>
            <input
              type="text"
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              //className={urlError ? "errorUrl" : "input-box"}
            />
            <input
              type="submit"
              id="button"
              onChange={(e) => check(e.target.value)}
            />
          </form>
          
          
        </section>
        <section id="section2" className="section">
          
        </section>
        
      </>
    );
  }
  

  
  
  export default Home;
  