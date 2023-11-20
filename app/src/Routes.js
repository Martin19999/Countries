import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Error from "./pages/Error";
import React from "react";

const MyRoutes = () => {
  return (
  <Router>
    <Routes>       
      <Route path="/" element={<Home/>} />   
      <Route path="/result" element={<Result/>} />
      <Route path="/error" element={<Error/>} />
    </Routes>
  </Router>
  );
}

export default MyRoutes;