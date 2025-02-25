import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRedditPosts, clearPosts } from './Search Slice';

function Search() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const selectedSubreddit = useSelector((state) => state.subreddit.selected); // Assuming you have a subreddit slice

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      dispatch(fetchRedditPosts({ searchTerm, subreddit: selectedSubreddit }));
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        🔍
      </button>
    </form>
  );
}

export default Search;
