import React, {useLayoutEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments} from "./Comments-Slice";
import Comment from './Comment';

function Comments({styles, information}) {
    const inCaseOfChange = information.permalink ? information.permalink : null;
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(fetchComments(information.permalink));
    },[inCaseOfChange])

    const comments = useSelector((state) => state.comments.comments);

    return (
        <section>
            {comments.length > 0 && comments.map(aComment => <Comment key={aComment.id} information={aComment.data} styles={styles}/>)}
        </section>
    )
    
}

export default Comments;