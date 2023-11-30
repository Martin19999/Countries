import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ToHome from './ToHome.js';

const Search = () => {
    const [input, setInput] = useState('');
    const [emptyError, setEmptyError] = useState(false);
    const [illegalError, setIllegalError] = useState(false);
    const navigate = useNavigate();

    const handleFormSubmit =  (e) => {
        e.preventDefault(); // Prevents the default form submission
      
        if (input === null || input.trim().length === 0) {
            setEmptyError(true);
            setIllegalError(false);
        } else if (input.trim().length > 100) {
          setEmptyError(false);
          setInput(input.substring(0,100));
        } else {
          setEmptyError(false);
          localStorage.setItem('input', input);
          if (!(/^[A-Za-z\s'-]+$/.test(input))){
            setIllegalError(true);
          } else {
            setIllegalError(false);
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
                  
                  navigate('/error', { state: { status: response.status } });
                }
              })
            } catch (error) {
              navigate('/error', { state: { status: 'network-error' } });
            }
          } 
        }
      };

    

    useEffect(() => {
      setInput(localStorage.getItem('input'));
     
    }, []);


    return (
        <form onSubmit={handleFormSubmit}>
          <div>
              <div>
                <input type="text" placeholder="Enter a country name" value={input || ''} onChange={(e) => setInput(e.target.value)}/>
                <button type="submit" onClick={handleFormSubmit}>
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
                <ToHome />
            </div>
          </div>
          
          
          {emptyError && <div className="error-msg">! Input cannot be empty</div> }
            
          {illegalError && <div className="error-msg">! Only these special characters are allowed: spaces, hyphens, and apostrophes</div> }
          {!emptyError && !illegalError && <div className="invisible-div">a </div> }

          
        </form>
    );
}

export default Search;
