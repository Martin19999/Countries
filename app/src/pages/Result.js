import React, {useEffect, useState} from "react";
import '../styles/common.css';

const Result = () => {
    const [returned, setReturned] = useState({})
   
    useEffect(() => {  
        fetch('https://countries-2mn9.onrender.com/result', {
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
            setReturned(text);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }, [])

    const unpack = (obj) => {
        if(Object.keys(obj).length > 0){
            const keys = Object.keys(obj)
            // const items = Object.entries(obj)
            return(
                <ul>
                    {keys.map((key) => (
                        
                        obj[key] !== null && Array.isArray(obj[key]) 
                        
                            ? <ul><li>{key}: {obj[key]}</li></ul>
                            :(
                                typeof obj[key] !== 'object' 
                                ? <ul><li>{key}: {obj[key].toString()}</li></ul>
                                : <ul><li>{key}: {unpack(obj[key])}</li></ul>
                            )
                      

                    ))} 
                </ul>
            );
        }

        
    }

    return (
        
        <>
            <section id="section2" className="section">
                {unpack(returned)}
            </section>
        </>
    )
}

export default Result;