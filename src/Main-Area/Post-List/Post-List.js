import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homePosts} from './Post-List-Slice';
import Post from '../Post/Post';
import { fetchUserProfile } from '../Comments/Comments-Slice';
import { arrayOfNamesForEndPoint } from '../../Top-bar/Search-Function/Search';
import { filterPosts } from '../../Top-bar/Search-Function/Search-Slice';
import ToTop from '../To-top';
import loadImg from '../loading.webp';
import loadedImg from '../weeds.svg';

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

function PostList() {
    //Initialize state Selectors and dispatch
    const dispatch = useDispatch();
    const [showButton, setShowButton] = useState(false);
    const subReddits = useSelector((state) => state.subList.subReddits);
    const {posts, postResults, currentProfiles, selectedSubreddit, resultLoading, searchAfter,searchInput, loading, after} = useSelector((state) => ({
      posts: state.posts.posts,
      postResults: state.searchTop.postResults,
      currentProfiles: state.comments.themProfiles,
      selectedSubreddit: state.subList.selectedSubreddit,
      resultLoading: state.searchTop.loadingPost,
      searchAfter: state.searchTop.searchAfter,
      searchInput: state.searchTop.postSearchTerm,
      loading: state.posts.loading,
      after: state.posts.after,
    }));

    // Define Observers

    const postObserver = useRef();
    const searchObserver = useRef();
    const topObserver = useRef();

    // Create Effect to Summon/UnSummon ToTop Button

   useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Update state based on whether the observed element is visible
          setShowButton(!entry.isIntersecting);
        },
        {
          root: null, // Use the viewport as the root
          rootMargin: '0px', // No margin
          threshold: 0.1, // Trigger when 10% of the element is out of view
        }
      );
    
      if (topObserver.current) {
        observer.observe(topObserver.current);
      }
    
      // Cleanup observer on unmount
      return () => {
        if (topObserver.current) {
          observer.unobserve(topObserver.current);
        }
      };
    },[showButton])

    // Create Effect to create Endless Scrolling functionality

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting && !loading && after) {
                  // Dispatch the fetch action with the after token
                  if (entry.target === postObserver.current) {
                    const subNames = getSubNames(subReddits, selectedSubreddit);
                    dispatch(homePosts({ subReddits: subNames, after }));
                  }
                  else if (entry.target === searchObserver.current) {
                    const subHandling = (selectedSubreddit && selectedSubreddit !== 'Everything') ? selectedSubreddit : arrayOfNamesForEndPoint(subReddits);
                    dispatch(filterPosts({ searchTerm: searchInput, subReddit: subHandling, after:searchAfter})) ;
                  }
              }
          });
      });

      if (searchObserver.current) {
          observer.observe(searchObserver.current);
      }
      if (postObserver.current) {
        observer.observe(postObserver.current);
      }

      // Cleanup the observer on component unmount
      return () => {
        if (searchObserver.current) {
            observer.unobserve(searchObserver.current);
        }
        if (postObserver.current) {
            observer.unobserve(postObserver.current);
        }
    };
  }, [dispatch,after,loading,searchAfter,resultLoading, postResults,posts]);

    // Create Effect to obtain starting posts
    useEffect(() => {
        const subNames = getSubNames(subReddits, selectedSubreddit);
        subNames && dispatch(homePosts({subReddits: subNames, after: null}));
    }, [dispatch])

    let postCreatorNames = getAuthorNames(posts, currentProfiles);
    postCreatorNames = postCreatorNames.filter(cName => !(currentProfiles.some(prof => prof.data.data.name === cName)))
    
    // Create Effect to store user profiles.
    useEffect(() => {
      if (postCreatorNames.length > 0) {
      dispatch(fetchUserProfile(postCreatorNames));
    }
    },[posts,dispatch])

    return (
        <section>
          <div ref={topObserver}> padding</div>
          {showButton && <ToTop/>}
            {postResults.length !== 0 ? (
  <>
    {postResults.map((result) => (
        <Post key={result.id} information={result}/>
    ))}
    <div ref={searchObserver}>
    {resultLoading ? <img src={loadImg}/> : <img src={loadedImg}/>}
    </div>
  </>
) : (<>
  {posts.map((aPost) => (
      <Post key={aPost.data.id} information={aPost.data}/>
  ))}
  <div ref={postObserver}>
  {loading ? <img src={loadImg}/> : <img src={loadedImg}/>}
  </div>
  </>
)}
        </section>
    )
}

export default PostList;