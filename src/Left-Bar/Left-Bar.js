import React, {useState} from 'react';
import SubSearch from './Sub-Search/Sub-Search';
import SubList from './Sub-List/Sub-List';
import styles from './Left-Bar.module.css';

function LeftBar(props) {

    const [isHidden, setIsHidden] = useState(false);

    const toggleVisibility = () => {
        setIsHidden(prevState => !prevState);
    };

    return (
        <section className={styles.leftArea}>
            <SubSearch smokinStyle={styles} store={props.store}/>
            <SubList smokinStyle={styles} store={props.store}/>
            <button className={isHidden ? styles.Hide : styles.Show} onClick={toggleVisibility}/> 
        </section>
    )
}