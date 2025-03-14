import React from 'react';
import Search from './Search-Function/Search';
import styles from './Top-Bar.module.css';
import logo from './fateburn.png';

function TopBar(props) {

return  (  <section className={styles.TopArea}>
        <img src={logo} className={styles.logo}/>
        <p className={styles.FateburnMark}>Fateburn Mark</p>
        <Search smokinStyle={styles}/>
    </section>)
}

export default TopBar;