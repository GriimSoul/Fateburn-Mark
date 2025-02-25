import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSubreddit } from '../Sub-Search/Sub-Search-Slice';

function SubList() {
  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subSearch.subreddits);

  return (
    <div>
      <h3>Subreddit List</h3>
      <ul>
        {subreddits.map((subreddit) => (
          <li key={subreddit}>
            {subreddit}
            <button onClick={() => dispatch(removeSubreddit(subreddit))}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubList;
