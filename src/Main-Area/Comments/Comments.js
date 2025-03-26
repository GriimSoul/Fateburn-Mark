import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments} from "./Comments-Slice";
import Comment from './Comment';
import getMeThoseNames from '../../utils/Comment Name Fetch';
import { fetchUserProfile } from "./Comments-Slice";

function Comments({styles, information}) {
    const inCaseOfChange = information.permalink ? information.permalink : null;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchComments(information.permalink));
    },[inCaseOfChange,dispatch]);

    const {comments, currentProfiles} = useSelector((state) => ({
        comments:state.comments.comments,
        currentProfiles:state.comments.themProfiles
    }));
    
    
    // authorNames = authorNames.filter(cName => !(currentProfiles.some(prof => prof.data.data.name === cName)))
    

      useEffect( () => {
        const authorNames = comments.length > 0 ? getMeThoseNames(comments) : [];
        console.log(authorNames);
        authorNames.length > 0 && dispatch(fetchUserProfile(authorNames));
    },[comments,dispatch]);

    return (
        <section>
            {comments.length > 0 && comments.map(aComment => <Comment key={aComment.id} information={aComment.data} styles={styles}/>)}
        </section>
    )
    
}

export default Comments;