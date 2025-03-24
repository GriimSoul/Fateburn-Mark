import React, {useLayoutEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments} from "./Comments-Slice";
import Comment from './Comment';
import getMeThoseNames from '../../utils/Comment Name Fetch';
import { fetchUserProfile } from "./Comments-Slice";

function getAuthorNames(commentInfo) {
    if (commentInfo.length == 0) {
        return null
    };
    console.log(commentInfo);
    let authorNames = []
    commentInfo.map(aComment => {
        authorNames.push(aComment.data.author);
        console.log(authorNames);
    });
    return authorNames;
}

function Comments({styles, information}) {
    const inCaseOfChange = information.permalink ? information.permalink : null;
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(fetchComments(information.permalink));
    },[inCaseOfChange])

    const {comments, currentProfiles} = useSelector((state) => ({
        comments:state.comments.comments,
        currentProfiles:state.comments.themProfiles
    }));
    let authorNames = getMeThoseNames(comments);
    authorNames = authorNames.filter(cName => !(currentProfiles.some(prof => prof.data.data.name === cName)))
    

     useLayoutEffect(() => {
        dispatch(fetchUserProfile(authorNames));
    },[inCaseOfChange,authorNames]) 

    return (
        <section>
            {comments.length > 0 && comments.map(aComment => <Comment key={aComment.id} information={aComment.data} styles={styles}/>)}
        </section>
    )
    
}

export default Comments;