import React from "react";
import sylphy from './up.png';

function ToTop() {

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