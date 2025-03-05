import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { clearSubReddits, setSearchInput, searchSubs } from './Sub-Search-Slice';

function SubSearch(props) {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.subSearch.subSearchInput);
  const {smokinStyle} = props;

  const handleChange = (e) => {
    dispatch(setSearchInput(e.target.value));
    if (input) {
      dispatch(searchSubs(input));
    }
    else {
      dispatch(clearSubReddits());
    }
  };


  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Find a SubReddit"
      />
    </div>
  );
}

export default SubSearch;
