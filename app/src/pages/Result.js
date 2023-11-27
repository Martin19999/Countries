import React, {useEffect, useState} from "react";

const Result = () => {
    const [returned, setReturned] = useState('')
    console.log("fetch once")
    useEffect(() => {  
        fetch('http://localhost:5000/result', {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            if (response.ok) {
                return response.text();
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

    return (
        <>
            <section id="section2" className="section">
                <h1>${returned}</h1>
            
            </section>
        </>
    )
}

export default Result;