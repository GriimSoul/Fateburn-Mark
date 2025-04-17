import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments} from "./Comments-Slice";
import Comment from './Comment';
import getMeThoseNames from '../../utils/Comment Name Fetch';
import { fetchUserProfile } from "./Comments-Slice";

function Comments({information}) {
    const inCaseOfChange = information.permalink ? information.permalink : null;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchComments({id:information.permalink}));
    },[inCaseOfChange,dispatch]);

    const {comments} = useSelector((state) => ({
        comments:state.comments.comments,
    }));
    

      useEffect( () => {
        const authorNames = comments.length > 0 ? getMeThoseNames(comments) : [];
        authorNames.length > 0 && dispatch(fetchUserProfile(authorNames));
    },[comments,dispatch]);

    return (
        <section id='CommentsArea'>
            {comments.length > 0 && comments.map(aComment => <Comment key={aComment.data.id} information={aComment.data}/>)}
        </section>
    )
    
}

export default Comments;