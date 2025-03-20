import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homePosts} from './Post-List-Slice';
import Post from '../Post/Post';

export const getSubNames = (subs) => {
  let subNames = [];
  let subRedditsV2 = subs.filter(sub => sub.id !== 'Nothing is but what is not');

  subRedditsV2.forEach(sub => {
      subNames.push(sub.display_name);
   })
   return subNames;
};

function PostList({styles}) {

    const dispatch = useDispatch();
    const subReddits = useSelector((state) => state.subList.subReddits);
    const posts = useSelector((state) => state.posts.posts);
    const postResults = useSelector((state) => state.searchTop.postResults);

    const subNames = getSubNames(subReddits);

    // Use Effect to obtain starting posts
    useEffect(() => {
        dispatch(homePosts({subReddits: subNames, after: null}));
    }, [])

    return (
        <section className={styles.Post}>
            {postResults.length !== 0 ? (
  postResults.map((result) => (
    <Post key={result.created} styles={styles} information={result}/>
  ))
) : (
  posts.map((aPost) => (
    <Post key={aPost.created} styles={styles} information={aPost.data}/>
  ))
)}
        </section>
    )
}

export default PostList;