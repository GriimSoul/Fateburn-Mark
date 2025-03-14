import React from 'react';
import { useSelector } from 'react-redux';
import PostList from './Post-List/Post-List';
import Post from './Post/Post'
import styles from './Main-Area.module.css';

function MainArea(props) {

    const inPost = useSelector((state) => state.posts.inPost);
    const currentPost = useSelector((state) => state.posts.currentPost); 

    return (
        <section className={styles.MainArea}>
            <div className={styles.PostArea}>
                {inPost ? <Post information={currentPost}/>: <PostList styles={styles}/>}
            </div>
        </section>
    )
}

export default MainArea;