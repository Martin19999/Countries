import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import '../styles/common.css';
import Search from "../components/Search.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';


const Result = () => {
    const location = useLocation();
    const [returned, setReturned] = useState({})
    const [collapsed, setCollapsed] = useState({});

    const toggleCollapse = (key) => {
        console.log(key)
        setCollapsed(prevStates => ({
            ...prevStates,
            [key]: !prevStates[key]
        }));
    };
    
    useEffect(() => {  
        console.log("heree")
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
            setReturned(text);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }, [location.key])

    useEffect(() => {
        if (Object.keys(returned).length > 0) {
            const newCollapsedStates = {};
            Object.keys(returned).forEach(key => {
                if (typeof returned[key] === 'object' && (Object.keys(returned[key]).length > 3 || returned[key].length > 3)) {
                    newCollapsedStates[key] = true; 
                }
            });
            setCollapsed(newCollapsedStates);
        }
    }, [returned]); 

    const unpack = (obj) => {
        if(Object.keys(obj).length > 0){
            const keys = Object.keys(obj);
         
            return(
                <ul>
                    {keys.map((key) => (                  
                        obj[key] !== null && Array.isArray(obj[key])                    
                            ? ( obj[key].length > 3 
                                ?<ul><li><span onClick={ () => toggleCollapse(key)}>{key}: {collapsed[key] ?  <FontAwesomeIcon icon={faSquarePlus} beatFade /> : obj[key].join(', ')}</span></li></ul>
                                :<ul><li>{key}: {obj[key].join(', ')} </li></ul>
                            )
                            :(
                                typeof obj[key] !== 'object' 
                                ? <ul><li>{key}: {obj[key].toString()}</li></ul>
                                : ( Object.keys(obj[key]).length > 3
                                    ? <ul><li><span onClick={ () => toggleCollapse(key)}>{key}: {collapsed[key] ? <FontAwesomeIcon icon={faSquarePlus} beatFade/> : unpack(obj[key]) }</span></li></ul>
                                    : <ul><li>{key}: {unpack(obj[key])}</li></ul>
                                )
                               
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
                { returned.name && <h2>Information for: {returned.name.common} / { returned.name.official} { returned.flag}</h2>}
                
                
            </div>
            <div className="scrollable-content">
                {unpack(returned)}
            </div>
        </>
    )
}

export default Result;