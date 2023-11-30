import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import Search from "../components/Search.js";


const Result = () => {
    const [returned, setReturned] = useState({})
    const navigate = useNavigate();
    
    useEffect(() => {  
        
        fetch('http://localhost:5000/result', {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(text => {
            console.log("here3");
            setReturned(text);
        })
        .catch(error => {
            console.log("here4");
            console.error('Error:', error);
        });

    }, [returned])

    const unpack = (obj) => {
        if(Object.keys(obj).length > 0){
            const keys = Object.keys(obj)
            // const items = Object.entries(obj)
            return(
                <ul>
                    {keys.map((key) => (
                        
                        obj[key] !== null && Array.isArray(obj[key]) 
                        
                            ? <ul><li key={key.id}>{key}: {obj[key]}</li></ul>
                            :(
                                typeof obj[key] !== 'object' 
                                ? <ul><li key={key.id}>{key}: {obj[key].toString()}</li></ul>
                                : <ul><li key={key.id}>{key}: {unpack(obj[key])}</li></ul>
                            )
                      

                    ))} 
                </ul>
            );
        }

        
    }


    return (
        
        <>
            <div className="fixed-container">
                <Search />
                { returned.name && <h2>Information for: {returned.name.common} / { returned.name.official} </h2>}
                
                
            </div>
            <div className="scrollable-content">
                {unpack(returned)}
            </div>
        </>
    )
}

export default Result;