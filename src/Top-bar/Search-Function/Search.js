import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiateSearch, setSearchTerm, filterPosts, clearSearch} from './Search-Slice';
import debounce from '../../utils/Debounce';

function Search(props) {
  const styles = props.smonkingStyle
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector((state) => state.subList.selectedSubreddit); // Obtain Name of Selected Subreddit, if any.
  const input = useSelector((state) => state.searchTop.postSearchTerm); // Obtain Current Search Term.

const handleChange = (e) => {
  const searchTerm = e.target.value;
  if (searchTerm !== '') {
    dispatch(setSearchTerm(searchTerm))
    dispatch(initiateSearch({searchTerm: searchTerm}));
    dispatch(filterPosts({ searchTerm: searchTerm, subReddit: selectedSubreddit }));
  }
  else {
    dispatch(clearSearch('whatever'))
  }

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
