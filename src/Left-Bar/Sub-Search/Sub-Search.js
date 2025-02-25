import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSubreddit } from './Sub-Search-Slice';

function SubSearch() {
  const [subredditInput, setSubredditInput] = useState('');
  const dispatch = useDispatch();

  const handleAddSubreddit = () => {
    if (subredditInput) {
      dispatch(addSubreddit(subredditInput));
      setSubredditInput('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={subredditInput}
        onChange={(e) => setSubredditInput(e.target.value)}
        placeholder="Add subreddit"
      />
      <button onClick={handleAddSubreddit}>+</button>
    </div>
  );
}

export default SubSearch;
