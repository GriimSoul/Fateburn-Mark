import React, {useEffect} from "react";
import {fetchUserProfile } from "./Comments-Slice";
import { useDispatch, useSelector} from "react-redux";
import fixUrlsIfAny, {cleanThemAmps} from "../../utils/FunctionalInnerUrls";
import timeAgo from '../../utils/TimeStamps';

function Comment({styles, information}) {

    const dispatch = useDispatch();
    const repliesExist = information.replies ? true : false;
    let authors = [information.author];
    const profiles = useSelector(state => state.userProfiles);
    let notDone = true

    useEffect(() => {
        if (notDone) {
            
        }
    })

    // create array of reply elements if replies exist
    let replyElements = [];
    if (repliesExist) {
        for (let reply = information.replies.data.children[0].data; reply; reply = reply.replies?.data?.children[0].data) {
            const authorExists = reply.author !== '[deleted]' ? true : false;
            (authorExists && !authors.some(author => author === reply.author)) && authors.push(reply.author);
            const element = (<div>
                <h4>{authorExists ? (<><a href={`https://www.reddit.com/user/${reply.author}/`} target='_blank'>{reply.author}</a></>) : reply.author}</h4>
                <p>{timeAgo(reply.created_utc)}</p>
                <p dangerouslySetInnerHTML={fixUrlsIfAny(reply.body)}></p>
                </div>
            )
            replyElements.push(element);
        }
    }

    return (
        <section>
            <div>
                <h4><a href={`https://www.reddit.com/user/${information.author}/`} target='_blank'>{information.author}</a></h4>
                <p>{timeAgo(information.created_utc)}</p>
                <p dangerouslySetInnerHTML={fixUrlsIfAny(information.body)}></p>
            </div>
            {replyElements.length > 0 && replyElements.map(reply => reply)}
        </section>
    )

}

export default Comment;