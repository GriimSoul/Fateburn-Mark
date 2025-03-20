import React from 'react';
import { useSelector } from 'react-redux';
import PostList from './Post-List/Post-List';
import Post from './Post/Post'
import styles from './Main-Area.module.css';
import Comments from './Comments/Comments';

function MainArea(props) {
    const inPost = useSelector((state) => state.posts.inPost);
    const currentPost = useSelector((state) => state.posts.currentPost);

    return (
        <section className={styles.MainArea}>
            <div className={styles.PostArea}>
                {inPost ? (<div>
                    <Post information={currentPost} /> <Comments styles={styles} information={currentPost}/>
                </div>) : <PostList styles={styles}/>}
            </div>
        </section>
    )
}

export default MainArea;