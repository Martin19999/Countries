/**
 * Result.js
 * 
 * Result page. Displays the country info.
 * Gets Json data from server, and renders it in a readable format (unpack function).
 * 
 * Renders: 1. search function (including button to home)
 *          2. country info, with clickable "+" to display/hide information that is too long
 */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/common.css";
import Search from "../components/Search.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";


const Result = () => {
  const location = useLocation(); // location change indicates new form submition
  const [returned, setReturned] = useState({}); // the json data sent back from server
  const [collapsed, setCollapsed] = useState({}); // when the list is too long, it collapses by default "[+]"

  const toggleCollapse = (key) => {
    // when the user clicks "+", the collapse state toggles to the opposite
    setCollapsed((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_URL, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((text) => {
        setReturned(text);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [location.key]);

  useEffect(() => {
    // when there is json data, select the keys that have values longer than 3, so they hide by default
    if (Object.keys(returned).length > 0) {
      const newCollapsedStates = {};
      Object.keys(returned).forEach((key) => {
        if (typeof returned[key] === "object" && 
            (Object.keys(returned[key]).length > 3 || returned[key].length > 3)) {
          newCollapsedStates[key] = true;      
        }

        if (typeof returned[key] === "object") {
          Object.keys(returned[key]).forEach((key1) => {
            if (typeof returned[key] === "object" && 
                (Object.keys(returned[key][key1]).length > 3 || returned[key][key1].length > 3)) {
              newCollapsedStates[key1] = true;      
            }
          }
        )} 
      });
      setCollapsed(newCollapsedStates);
    }
  }, [returned]);

  const unpack = (obj) => {
    if (Object.keys(obj).length > 0) {
      const keys = Object.keys(obj);

      // 1. obj[key] is an Array: first deal with Array because it's easy -> just print it
      // 2. obj[key] 
      //    A. is not an Object -> just print it
      //    B. is an Object (except Array) -> call this function again to break down the Object into printable pieces
      //
      // Note: there is a check for length for every condition, if length > 3, the content is collapsed by default

      return (
        <ul>
          {keys.map((key) =>
            obj[key] !== null && Array.isArray(obj[key]) 
              ? ( obj[key].length > 3 
                ? ( <ul><li><span onClick={() => toggleCollapse(key)}>
                      {key}:{" "} {collapsed[key] ? (<FontAwesomeIcon icon={faSquarePlus} beatFade />) : (obj[key].join(", "))}
                    </span></li></ul>) 
                : ( <ul><li>
                    {key}: {obj[key].join(", ")}{" "}
                    </li></ul>
                  )
                ) 
              : typeof obj[key] !== "object" 
                ? ( <ul><li>{key}: {obj[key].toString()}</li></ul>)
                : Object.keys(obj[key]).length > 3 
                  ? ( <ul><li><span onClick={() => toggleCollapse(key)}>
                      {key}:{" "}
                      {collapsed[key] ? ( <FontAwesomeIcon icon={faSquarePlus} beatFade />) : (unpack(obj[key]))}
                      </span></li></ul>)
                  : (<ul><li>{key}: {unpack(obj[key])}</li></ul>)
          )}
        </ul>
      );
    }
  };

  return (
    <>
      <div className="fixed-container">
        <Search />
        {returned.name && ( <h2> Information for: {returned.name.common} {returned.flag}</h2>)}
      </div>
      <div className="scrollable-content">{unpack(returned)}</div>
    </>
  );
};

export default Result;
