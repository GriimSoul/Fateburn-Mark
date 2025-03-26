// Visual Imports
    import upVoteImg from './Up.svg';
    import downVoteImg from './Down.svg';
    import arrowUp from './Arrow Up.svg';
    import arrowDown from './Arrow Down.svg';
    import commentImg from './comments.svg';
    import goBack from './go back.svg';
// So many damn imports
    import React, {useState} from "react";
    import { useSelector, useDispatch } from "react-redux";
    import { enterPost, exitPost } from "../Post-List/Post-List-Slice";
    import timeAgo from '../../utils/TimeStamps';
    import fixUrlsIfAny, {cleanThemAmps} from '../../utils/FunctionalInnerUrls';
    import { themProfilePics, themSubredditPics } from "../../utils/GimmePics";
    import {clearComments} from '../Comments/Comments-Slice';


function Post({styles, information}) {
// Define variables for ease of use, and to avoid head explosions.
    const dispatch = useDispatch();
    const singleLink = information.url_overridden_by_dest;
// Create Local states to handle simple changes & use Selectors.
    const morePictures = [];
    let [score, setScore] = useState(information.score);
    const [isUp, setIsUp] = useState(false);
    const [isDown, setIsDown] = useState(false);
    const subReddits = useSelector(state => state.subList.subBackUp);
    const inPost = useSelector(state => state.posts.inPost);
    const userInfo = useSelector(state => state.comments.themProfiles);

    const pfpElement = themProfilePics(userInfo, information.author);
    const subImgElement = themSubredditPics(subReddits, information.subreddit);

    function enter() {
        dispatch(enterPost(information));
      }
    function exit() {
        dispatch(exitPost());
        dispatch(clearComments());
    }

    function handleUpVote() {
        setScore(prev => {
            let delta = 1; // Assume we're adding an upvote
            if (isUp) {
                delta = -1; // Removing existing upvote
            } else if (isDown) {
                delta = 2; // Removing downvote (+1) + adding upvote (+1)
            }
            return prev + delta;
        });
        setIsDown(isUp ? isDown : false); // Remove downvote if adding upvote
        setIsUp(!isUp); // Toggle upvote state
    }
    
    function handleDownVote() {
        setScore(prev => {
            let delta = -1; // Assume we're adding a downvote
            if (isDown) {
                delta = 1; // Removing existing downvote
            } else if (isUp) {
                delta = -2; // Removing upvote (-1) + adding downvote (-1)
            }
            return prev + delta;
        });
        setIsUp(isDown ? isUp : false); // Remove upvote if adding downvote
        setIsDown(!isDown); // Toggle downvote state
    }

    function ifYoutubeLink() { // If the post has a single youtube video link, modify it into an embed link to be able to used it in an iframe
        const youtubeLink = singleLink.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
        return youtubeLink;
    }

    if (information.is_gallery) { // Handle post has more than 1 picture
        // Create function to fix links to be usable by replacing $amp; with &
        for (let data in information.media_metadata) {
            const amountOfPictures = information.media_metadata[data].p.length - 1; // find the highest resolution of the picture
            const dirtyPicture = information.media_metadata[data].p[amountOfPictures].u; // copy the link with &amp; messing it up
            const cleanPicture = cleanThemAmps(dirtyPicture); // make the link usable
            morePictures.push(cleanPicture);
        }
    }

    return (
        <article>
            {inPost && (<img src={goBack} onClick={exit}></img>)}
            <div>

                <img src={isUp ? upVoteImg : arrowUp} alt="Upvote" onClick={handleUpVote}/>
                <h3>{score}</h3>
                <img src={isDown ? downVoteImg : arrowDown} alt="Downvote" onClick={handleDownVote}/>

                {inPost ? (<img src={commentImg}></img>): (<img onClick={enter} src={commentImg}></img>)}
                <h3>{information.num_comments}</h3>

            </div>
            
            <p>{timeAgo(information.created_utc)}</p>
            {inPost ? (<h2><a href={"https://www.reddit.com" + information.permalink} target="_blank">{information.title}</a></h2>)
             : (<h2 onClick={enter}>{information.title}</h2>)}
             
            <p dangerouslySetInnerHTML={fixUrlsIfAny(information.selftext)}></p>

        {/* Logic to handle rendering posts that are image or video centric.*/}

            {singleLink && (
                (singleLink.includes("https://www.youtube.com") || singleLink.includes("https://youtu.be")) ? (
        // Handle if the post has a youtube Video.

                    <iframe src={ifYoutubeLink()} 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; 
                            encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                    </iframe>

                ) : ( // check if multiple images are in the post
                
                    information.is_gallery ? ( 
                        morePictures.map((pic) => (
                            <img key={pic} src={pic} />
                        ))) : (
            // New file extension check for single link

                        (/\.(jpg|jpeg|gif|png|webp)$/i.test(singleLink)) ? (
            // Show image if extension matches

                            <img src={singleLink} />
                        ) : (
                            // Show raw link text if not an image

                            <a href={singleLink}>{singleLink}</a> ))))}
            <div>
                {pfpElement}
                <p>{information.author}</p>
                {subImgElement}
                <p>{information.subreddit}</p>
            </div>
        </article>
    )
}

export default Post;