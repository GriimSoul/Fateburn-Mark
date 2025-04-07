import React, {useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {setSearchTerm, filterPosts, clearSearch} from './Search-Slice';
import debounce from '../../utils/Debounce';

export function arrayOfNamesForEndPoint(subsInfo) {
  const names = [];
  subsInfo.forEach(sub => {
    names.push(sub.display_name);      
  });
  let toReturn = names.join('+');
  toReturn = toReturn.slice(1);
  return `r/${toReturn}`;
}

function Search() {

  const dispatch = useDispatch();
  const selectedSubreddit = useSelector(state => state.subList.selectedSubreddit); // Obtain Name of Selected Subreddit, if any.
  const subReddits = useSelector(state => state.subList.subReddits)
  const input = useSelector(state => state.searchTop.postSearchTerm); // Obtain Current Search Term

  const subHandling = (selectedSubreddit && selectedSubreddit !== 'Everything') ? selectedSubreddit : arrayOfNamesForEndPoint(subReddits);
  
  const debouncedChange = useCallback( debounce((value) => {
      if (value.searchTerm !== "") {
        dispatch(clearSearch());
       value.searchTerm !== '' && dispatch(filterPosts(value));
      }
      else {
        dispatch(clearSearch());
      }
    }, 1000), [dispatch]);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
      dispatch(setSearchTerm(searchTerm))
      debouncedChange({ searchTerm: searchTerm, subReddit: subHandling });
  }

  return (
    <div>
      <input
        type="text"
        placeholder='Search for posts'
        value={input}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
