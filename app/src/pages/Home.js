import { useEffect, useState } from "react";
import Result from "./Result";
// import Error from "./Error";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const handleFormSubmit =  (e) => {
    e.preventDefault(); // Prevents the default form submission
  
    // Send data to the server
    const data = { country: input }; 

    if (input === null || input.trim().length === 0) {
      setError(true);
      console.log("Empty");
    } else {
      setError(false);
      localStorage.setItem('input', input);

      try {
        fetch('http://localhost:5000/result', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'text/plain',
          },
          body: input,
        }).then(response => {
          if (response.ok) {
            navigate('/result');
          } else {
            console.log(response);
            throw new Error('Network response was not ok');
          }
        })
       
        
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  


  return (
    <>
      <section id="section1" className="section">
        <h1>Discover the World: Interactive Country Information Guide</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="input">Enter a country:</label>
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="submit"
            id="button"
          />
        </form>
        
        
      </section>
      <section id="section2" className="section">
        
      </section>
      
    </>
  );
}
  

export default Home;
  