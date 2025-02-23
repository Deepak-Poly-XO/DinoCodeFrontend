import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../homeNavbar/Nav'
import './Home.css'
import videoBg from "../assets/video.mp4";

const Home = ()=>{


  return(
    <div>
      <Nav />
      <div className="container">
        <video autoPlay loop muted playsInline>
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="title">
          <h1>DINO CODE</h1>
          <p>Evolve. Collaborate. Innovate.</p>
        </div>
      </div>
    </div>
  )
}

export default Home;