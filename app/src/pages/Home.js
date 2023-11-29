import { useEffect, useState } from "react";
import '../App.css';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const [input, setInput] = useState('')
  const [emptyError, setEmptyError] = useState(false)
  const [illegalError, setIllegalError] = useState(false)
  const navigate = useNavigate();

  const handleFormSubmit =  (e) => {
    e.preventDefault(); // Prevents the default form submission
  
  
    if (input.trim.length > 100) {
      setInput(input.substring(0,100));
    }
    if (input === null || input.trim().length === 0) {
      setEmptyError(true);
    } else {
      if (!(/^[A-Za-z\s'-]+$/.test(input))){
        setIllegalError(true);
      } else {

        try {

          fetch('http://localhost:5000/result' || 'https://countries-2mn9.onrender.com/result', {
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
              
              navigate('/error', { state: { status: response.status } });
            }
          })
        } catch (error) {
          navigate('/error', { state: { status: 'network-error' } });
        }
      }
      

      

      
    }
  };
  


  return (
    <>
      <section id="section1" className="section">
        <h1>Discover the World: Interactive Country Information Guide</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="input">Enter a country:</label>
          <input type="text" id="input" value={input} onChange={(e) => setInput(e.target.value)}/>

          {emptyError && <div style={{ color: 'red' }}>Input cannot be empty.</div>}
          {illegalError && <div style={{ color: 'red' }}>Only these special characters are allowed: spaces, hyphens, and apostrophes</div>}

          <input type="submit" id="button"/>
        </form>
        
        
      </section>
      <section id="section2" className="section">
        
      </section>
      
    </>
  );
}
  

export default Home;
  