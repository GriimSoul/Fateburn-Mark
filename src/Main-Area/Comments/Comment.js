import React from "react";
import {useSelector} from "react-redux";
import fixUrlsIfAny from "../../utils/FunctionalInnerUrls";
import timeAgo from '../../utils/TimeStamps';
import { themProfilePics } from "../../utils/GimmePics";
import arrowUp from '../Post/Arrow Up.svg';
import arrowDown from '../Post/Arrow Down.svg';

export function decodeHtmlEntities(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
}

function Comment({styles, information}) {

    const repliesExist = information.replies ? true : false;
    let authors = [information.author];
    const userInfo = useSelector(state => state.comments.themProfiles);
    const pfpElement = themProfilePics(userInfo, information.author);


    // create array of reply elements & fill it if replies exist || Pain
    let replyElements = [];
    if (repliesExist) {
        const queue = [...information.replies.data.children]; // Initialize the queue with all top-level replies

        while (queue.length > 0) {
            const child = queue.shift(); // Dequeue the first element
            const reply = child.data; // Access the reply data

            // Check if the author exists and add to authors array if not already present
            const authorExists = reply.author !== '[deleted]';
            if (authorExists && !authors.includes(reply.author)) {
                authors.push(reply.author);
            }

            // Create the reply element
            const replyPfp = themProfilePics(userInfo, reply.author);
            const element = (
                <div key={reply.id} class='aReply'>
                    <div class='mainReply'>
                        <div class='commentAuthorBit'>
                            {replyPfp}
                            <h4 class='commentAuthor'>
                                {authorExists ? (
                                    <a href={`https://www.reddit.com/user/${reply.author}/`} target='_blank' rel="noreferrer">
                                        {reply.author}
                                    </a>
                                ) : reply.author}
                            </h4>
                        </div>
                        <p dangerouslySetInnerHTML={fixUrlsIfAny(decodeHtmlEntities(reply.body))} class='commentContent'></p>
                    </div>

                    <div class='commentInfo'>
                        <div class='commentVotes'>
                            <img src={arrowUp} alt="Upvote" class='commentArrows'/>
                            <h5 class='commentScore'>{reply.score}</h5>
                            <img src={arrowDown} alt="Downvote" class='commentArrows'/>
                        </div>
                        <p class='commentTimestamp'>{timeAgo(reply.created_utc)}</p>
                    </div>

                </div>
            );
            replyElements.push(element); // Add the element to the replyElements array

            // Check if this reply has its own replies and add them to the queue
            if (reply.replies && reply.replies.data && Array.isArray(reply.replies.data.children)) {
                queue.push(...reply.replies.data.children); // Add all children of the replies to the queue
            }
        }
    }

    return (
        <section class='aComment'>
            <div class='mainComment'>
                <div class='commentAuthorBit'>
                    <a href={`https://www.reddit.com/user/${information.author}/`} target='_blank' rel="noreferrer">{pfpElement}</a>
                    <h4 class='commentAuthor'><a href={`https://www.reddit.com/user/${information.author}/`} target='_blank' rel="noreferrer">{information.author}</a></h4>
                </div>
                <p dangerouslySetInnerHTML={fixUrlsIfAny(decodeHtmlEntities(information.body))} class='commentContent'></p>
            </div>

            <div class='commentInfo'>
                <div class='commentVotes'>
                    <img src={arrowUp} alt="Upvote" class='commentArrows'/>
                    <h5 class='commentScore'>{information.score}</h5>
                    <img src={arrowDown} alt="Downvote" class='commentArrows'/>
                </div>
                <p class='commentTimestamp'>{timeAgo(information.created_utc)}</p>
            </div>

            {replyElements.length > 0 && replyElements.map(reply => reply)}
        </section>
    )

}

export default Comment;