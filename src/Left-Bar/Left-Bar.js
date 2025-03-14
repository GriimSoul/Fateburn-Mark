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
        <div>
            <section className={isHidden ? styles.leftAreaHidden : styles.leftArea}>
                <SubSearch smokinStyle={styles} />
                <SubList smokinStyle={styles}/>
            </section>
            <button className={isHidden ? styles.Hide : styles.Show} onClick={toggleVisibility}>
                    hide button
                </button>
        </div>
    )
}

export default LeftBar;