import React from 'react';
import Search from './Search-Function/Search';
import styles from './Top-Bar.module.css';

function TopBar(props) {

    <section className={styles.TopArea}>
        <img src="./fateburn.png" className={styles.Logo}/>
        <p ClassName={styles.FateburnMark}>Fateburn Mark</p>
        <Search store={props.store} smokinStyle={styles}/>
    </section>
}