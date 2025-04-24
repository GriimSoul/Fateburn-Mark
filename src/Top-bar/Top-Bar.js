import React from 'react';
import Search from './Search-Function/Search';
import './Top-Bar.css';
import logo from './fateburn.svg';
import { exitPost } from '../Main-Area/Post-List/Post-List-Slice';
import { clearComments } from '../Main-Area/Comments/Comments-Slice';
import { useDispatch, useSelector } from 'react-redux';

function TopBar() {
const dispatch = useDispatch();
const inPost = useSelector(state => state.posts.inPost);

function exit() {
    dispatch(exitPost());
    dispatch(clearComments());
}

return  (  <section class="topArea">
        {inPost ? 
        (<div class='fateburnContainer' id='ClickMe' onClick={exit}>
            <img src={logo} id='Logo' alt='Logo'/>
            <p id='SiteTitle'>Fateburn Mark</p>
        </div>)
        : 
        (<div class='fateburnContainer'>
            <img src={logo} id='Logo' alt='Logo'/>
            <p id='SiteTitle'>Fateburn Mark</p>
        </div>)}
        <Search/>
    </section>)
}

export default TopBar;