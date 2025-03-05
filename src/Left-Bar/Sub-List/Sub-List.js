import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubreddit, removeSubreddit} from './List-Slice';
import {selectSubReddit} from '../Sub-List/List-Slice'; 
import { filterPosts } from '../../Top-bar/Search-Function/Search-Slice';
import SubReddit from './Sub-Reddit/SubReddit';

function SubList({smokinStyle}) {
  const dispatch = useDispatch();

  // Obtain input from the top Search bar in order to re-search once a new Sub has been selected
  const searchInput = useSelector((state) => state.searchTop.postSearchTerm);
  // obtain both the currently saved SubReddits and the search results alonside the currently selected SubReddit
  const subReddits = useSelector((state) => state.subList.subReddits);
  const selected = useSelector((state) => state.subList.selectedSubreddit);
  const subResults = useSelector((state) => state.subSearch.subRedditResults);

  function handleClick(item) {
    if (item.title !== selected) {
      dispatch(selectSubReddit(item.title));
      dispatch(filterPosts(({searchTerm: searchInput, subReddit: selected})));
    }
  }
  function handleAdd(item) {
    if (!subResults.some((element) => element.id === item.id)) {
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
    {subResults ? (
  subResults.map((result) => (
    <SubReddit key={result.id} styles={smokinStyle} information={result} addRemove={handleAdd} plusMinus="+"/>
  ))
) : (
  subReddits.map((sub) => (
    <SubReddit key={sub.id} styles={smokinStyle} information={sub} addRemove={handleRemove} onClick={() => handleClick(sub)} plusMinus="-" selected={selected}/>
  ))
)}
    </div>
  );
}

export default SubList;
