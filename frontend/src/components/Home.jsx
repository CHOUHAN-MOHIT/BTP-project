import React from "react";
import './Home.css'
import banner from '../images/image-placeholder-clipart-1.png';

function Body() {

  return (
    <div>
      <div className="banner">
        <img src={banner} alt="" className="banner-image"/>
        <div className="tag-line">companies tag line will be shown here</div>
      </div>
    </div>
  );
}


function Home() {

    return (
      <div>
        <Body/>
      </div>
    );
  }
  
  export default Home;