import React from 'react';
import Search from './Search-Function/Search';
import './Top-Bar.css';
import logo from './fateburn.svg';

function TopBar() {

return  (  <section class="topArea">
        <div class='fateburnContainer'>
            <img src={logo} id='Logo'/>
            <p id='SiteTitle'>Fateburn Mark</p>
        </div>
        <Search/>
    </section>)
}

export default TopBar;