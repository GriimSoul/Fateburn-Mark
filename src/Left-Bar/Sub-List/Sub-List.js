import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubreddit, removeSubreddit, selectSubReddit} from './List-Slice'; 
import { filterPosts } from '../../Top-bar/Search-Function/Search-Slice';
import SubReddit from './Sub-Reddit/SubReddit';
import { homePosts, clearPosts} from '../../Main-Area/Post-List/Post-List-Slice';
import { getSubNames } from '../../Main-Area/Post-List/Post-List';

function SubList({smokinStyle}) {
  const dispatch = useDispatch();

  // Obtain input from the top Search bar in order to re-search once a new Sub has been selected
  const searchInput = useSelector((state) => state.searchTop.postSearchTerm);
  // obtain both the currently saved SubReddits and the search results alonside the currently selected SubReddit
  const subReddits = useSelector((state) => state.subList.subReddits);
  const selected = useSelector((state) => state.subList.selectedSubreddit);
  const subResults = useSelector((state) => state.subSearch.subRedditResults);

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
      dispatch(homePosts({subReddits:subNames, after:null}));
  },[subReddits])

// Event handler for selecting a subreddit and its consequences.

  function handleClick(item) {
    const redditId = item.id;
    const redditName = item.display_name;
    if (item.display_name_prefixed !== selected) { // stop if the target is already selected
      dispatch(selectSubReddit(item.display_name_prefixed));
      dispatch(clearPosts()); // ckear the currents posts

      if (searchInput) { // Execute search again within the selected subreddit
        dispatch(filterPosts(({searchTerm: searchInput, subReddit: selected})));
      }

      else if (redditId !== 'Nothing is but what is not'){ // Fetch posts of the selected subreddit
        dispatch(homePosts({subReddits: redditName, after:null}));
      
      }
      else { // Fetch posts of all stored subreddits.
        const subNames = getSubNames(subReddits);
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
    <div>
    {subResults.length !== 0 ? (
  subResults.map((result) => (
    <SubReddit key={result.title} styles={smokinStyle} information={result} addRemove={handleAdd} plusMinus="+"/>
  ))
) : (
  subReddits.map((sub) => (
    <SubReddit key={sub.title} styles={smokinStyle} information={sub} addRemove={handleRemove} handleClick={() => handleClick(sub)} plusMinus="-" selected={selected}/>
  ))
)}
    </div>
  );
}

export default SubList;
