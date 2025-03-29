import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homePosts} from './Post-List-Slice';
import Post from '../Post/Post';
import { fetchUserProfile } from '../Comments/Comments-Slice';

export const getSubNames = (subs, selectedSubreddit) => {
  if (selectedSubreddit === 'Everything') {
  let subNames = [];
  let subRedditsV2 = subs.filter(sub => sub.id !== 'Nothing is but what is not');

  subRedditsV2.forEach(sub => {
      subNames.push(sub.display_name);
   })
   return subNames;
  }
  else {
    const subName = [selectedSubreddit];
    return subName;
  }
};
const getAuthorNames = (postsInfo, profileInfo) => {
  let postCreatorNames = [];
    for (let post of postsInfo) {
      const exists = profileInfo.some(oldProfile => oldProfile.data.data.name === post.data.author);
      if (post.data.author !== '[deleted]' && !postCreatorNames.includes(post.data.author && !exists)) {
        postCreatorNames.push(post.data.author);
      }
    }
  return postCreatorNames;
}

function PostList({styles}) {

    const dispatch = useDispatch();
    const subReddits = useSelector((state) => state.subList.subReddits);
    const {posts, postResults, currentProfiles, selectedSubreddit} = useSelector((state) => ({
      posts: state.posts.posts,
      postResults: state.searchTop.postResults,
      currentProfiles: state.comments.themProfiles,
      selectedSubreddit: state.subList.selectedSubreddit
    }));

    

    // Use Effect to obtain starting posts
    useEffect(() => {
        const subNames = getSubNames(subReddits, selectedSubreddit);
        dispatch(homePosts({subReddits: subNames, after: null}));
    }, [dispatch])

    let postCreatorNames = getAuthorNames(posts, currentProfiles);
    postCreatorNames = postCreatorNames.filter(cName => !(currentProfiles.some(prof => prof.data.data.name === cName)))
    
    // Use Effect to store user profiles.
    useEffect(() => {
      if (postCreatorNames.length > 0) {
      dispatch(fetchUserProfile(postCreatorNames));
    }
    },[posts,dispatch])

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