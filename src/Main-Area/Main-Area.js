import React from 'react';
import { useSelector } from 'react-redux';
import PostList from './Post-List/Post-List';
import Post from './Post/Post'
import './Main-Area.css';
import Comments from './Comments/Comments';

function MainArea(props) {
    const inPost = useSelector((state) => state.posts.inPost);
    const currentPost = useSelector((state) => state.posts.currentPost);

    return (
        <section id='MainArea'>
            <div id='WithinMainArea'>
                {inPost ? (<div class='forAPost'>
                    <Post information={currentPost} /> <Comments  information={currentPost}/>
                </div>) : <PostList />}
            </div>
        </section>
    )
}

export default MainArea;