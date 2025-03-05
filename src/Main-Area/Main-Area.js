import React from 'react';
import PostList from './Post-List/Post-List';
import styles from './Main-Area.module.css';

function MainArea(props) {

    return (
        <section className={styles.MainArea}>
            <div className={styles.PostArea}>
                <PostList store={props.store} styles={styles}/>
            </div>
        </section>
    )
}

export default MainArea;