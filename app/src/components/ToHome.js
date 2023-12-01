/**
 * ToHome component
 * 
 * Renders a button to Homepage. Used in all pages.
 */

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const ToHome = () => {
  const navigate = useNavigate();

  const toHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <button onClick={toHome}>
      <FontAwesomeIcon icon={faHouse} />
    </button>
  );
};

export default ToHome;
