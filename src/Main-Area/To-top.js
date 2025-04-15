import React from "react";
import sylphy from './up.png';

function ToTop() {

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll
      });
    };

    return (
          <a href="#ForPadding">
            <div id='TakeMeToTop' >
               <p>To Top</p>
              <img src={sylphy} alt='Return to top' id='TakeMeToTopImg'/>
            </div>
          </a>
    )
}

export default ToTop;