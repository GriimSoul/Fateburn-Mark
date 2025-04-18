import React, { useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { clearSubReddits, setSearchInput, searchSubs } from './Sub-Search-Slice';
import debounce from '../../utils/Debounce';

function SubSearch() {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.subSearch.subSearchInput);

  const debouncedChange = useCallback( debounce((value) => {
      if (value !== "") {
        dispatch(searchSubs(value));
      }
      else {
        dispatch(clearSubReddits());
      }
    }, 1000), [dispatch]);


  const handleChange = (e) => {
    const value = e.target.value
    dispatch(setSearchInput(value));
    debouncedChange(value);
    dispatch(setSearchInput(value));
  };


  return (
    <div id='SubSearchContainer'>
      <input
        id='SubSearch'
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Find a SubReddit"
      />
    </div>
  );
}

export default SubSearch;
