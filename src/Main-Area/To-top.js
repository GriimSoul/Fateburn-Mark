import React from "react";

function ToTop() {

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll
      });
    };

    return (
            <img src='pending' alt='Return to top' onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px' }}/>
    )
}

export default ToTop;