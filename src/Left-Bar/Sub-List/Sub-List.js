import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubreddit, removeSubreddit, selectSubReddit} from './List-Slice'; 
import { filterPosts, clearSearch } from '../../Top-bar/Search-Function/Search-Slice';
import SubReddit from './Sub-Reddit/SubReddit';
import { homePosts, clearPosts} from '../../Main-Area/Post-List/Post-List-Slice';
import { getSubNames } from '../../Main-Area/Post-List/Post-List';

function SubList() {
  const dispatch = useDispatch();
  const [fasterSelected, setFasterSelected] = useState(false)

  // Obtain input from the top Search bar in order to re-search once a new Sub has been selected
  const searchInput = useSelector(state => state.searchTop.postSearchTerm);
  // obtain both the currently saved SubReddits and the search results alonside the currently selected SubReddit
  const {subReddits, selected, inPost} = useSelector(state => ({
    subReddits:state.subList.subReddits,
    selected:state.subList.selectedSubreddit,
    inPost:state.posts.inPost
  }));
  const subResults = useSelector(state => state.subSearch.subRedditResults);

  // Function to handle when the selected subreddit has been removed, by switching to the home section.
  function handleRemoveInUse() {
    if (!subReddits.some(sub => sub.display_name_prefixed === selected)) {
      dispatch(selectSubReddit('Everything'));
    }
  }

  // Effect to handle changes in the stored subreddits.
  useEffect(() => {
      handleRemoveInUse();
      dispatch(clearPosts());
      const subNames = getSubNames(subReddits);
      !inPost && dispatch(homePosts({subReddits:subNames, after:null}));
  },[subReddits, dispatch])
  useEffect(() => {

    if (fasterSelected) {
      if (searchInput) {
        const subHandling = arrayOfNamesForEndPoint();
        dispatch(filterPosts(({searchTerm: searchInput, subReddit: subHandling})));
      }
    }
    setFasterSelected(true);
  },[selected,subReddits])

// Event handler for selecting a subreddit and its consequences.

function arrayOfNamesForEndPoint() {
  if (selected === 'Everything') {
    const names = [];
    subReddits.forEach(sub => {
      names.push(sub.display_name);      
    });
    let toReturn = names.join('+');
    toReturn = toReturn.slice(1);
    return `r/${toReturn}`; 
  }
  else {
    return selected;
  }
}



  function handleClick(item) {
    const redditId = item.id;
    const redditName = item.display_name;
    if (item.display_name_prefixed !== selected) { // stop if the target is already selected
      dispatch(selectSubReddit(item.display_name_prefixed));
      dispatch(clearPosts()); // ckear the currents posts
      dispatch(clearSearch());

      if (searchInput) { // Execute search again within the selected subreddit
        
      }

      else if (redditId !== 'Nothing is but what is not'){ // Fetch posts of the selected subreddit
        dispatch(homePosts({subReddits: redditName, after:null}));
      
      }
      else { // Fetch posts of all stored subreddits.
        const subNames = getSubNames(subReddits, selected);
        dispatch(homePosts({subReddits: subNames, after:null}));
      }
    }
  }

  // Event handlers for adding and removing subreddits
  function handleAdd(item) { 
    if (!subReddits.some((element) => element.title === item.title)) {
      dispatch(addSubreddit(item)); 
    }
  }
  function handleRemove(item) {
    if (subReddits.some((element) => element.id === item.id)) {
      dispatch(removeSubreddit(item)); 
    }
  }


  return (
    <div id='SubList'>
    {subResults.length !== 0 ? (
  subResults.map((result) => (
    <SubReddit key={result.title} information={result} addRemove={handleAdd} plusMinus="+"/>
  ))
) : (
  subReddits.map((sub) => (
    <SubReddit key={sub.title} information={sub} addRemove={handleRemove} handleClick={() => handleClick(sub)} plusMinus="-" selected={selected}/>
  ))
)}
    </div>
  );
}

export default SubList;
