import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiateSearch, setSearchTerm, filterPosts} from './Search-Slice';

function Search(props) {
  const styles = props.smonkingStyle

  const dispatch = useDispatch();
  const selectedSubreddit = useSelector((state) => state.subList.selectedSubreddit); // Obtain Name of Selected Subreddit, if any.
  const searchTerm = useSelector((state) => state.searchTop.postSearchTerm); // Obtain currently typed out search term
  const currentPosts = useSelector((state) => state.postList);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      // Dispatch the selected subreddit (if applicable) and the search term to fetch results
      dispatch(initiateSearch({currentPosts: currentPosts, searchTerm: searchTerm}));
      dispatch(filterPosts({ searchTerm: searchTerm, subreddit: selectedSubreddit }));
    }
  };
const handleChange = (e) => {
  if (e.target.value !== '') {
    dispatch(setSearchTerm(e.target.value))
  }
  else {
    handleSubmit();
  }

}

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">
        {searchTerm ? "X" : "🔍"}
      </button>
    </form>
  );
}

export default Search;
