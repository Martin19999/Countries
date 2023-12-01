/**
 * Error.js
 * 
 * Error page. When there is a network issue, or country doesn't exist issue.
 * Other errors are already caught in the input checks.
 * 
 * Renders: 1. Search bar (including button to Homepage) 
 *          2. An error message
 */

import { useLocation } from "react-router-dom";
import "../styles/common.css";
import Search from "../components/Search.js";

const Error = () => {
  const location = useLocation();
  const { status } = location.state || {};
  const input = localStorage.getItem("input");

  return (
    <>
      <div className="fixed-container">
        <Search />
        {status === "network-error" 
          ? (<h2>Network error. Please check your internet connection.</h2>)
          : (<h2>Ooops, it seems the country "{input}" you are searching for does not
                exist. Have you checked the spelling?</h2>
            )
        }
      </div>
      <div className="scrollable-content"></div>
    </>
  );
};

export default Error;
