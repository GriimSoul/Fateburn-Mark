// Visual Imports
    import upVoteImg from './Up.svg';
    import downVoteImg from './Down.svg';
    import arrowUp from './Arrow Up.svg';
    import arrowDown from './Arrow Down.svg';
    import commentImg from './comments.svg';
    import goBack from './go back.svg';
    import prevPic from './PrevPic.svg';
    import nextPic from './NextPic.svg';
// So many damn imports
    import React, {useState} from "react";
    import { useSelector, useDispatch } from "react-redux";
    import { enterPost, exitPost } from "../Post-List/Post-List-Slice";
    import timeAgo from '../../utils/TimeStamps';
    import fixUrlsIfAny, {cleanThemAmps} from '../../utils/FunctionalInnerUrls';
    import { themProfilePics, themSubredditPics } from "../../utils/GimmePics";
    import {clearComments} from '../Comments/Comments-Slice';


function Post({information}) {
// Define variables for ease of use, and to avoid head explosions.
    const dispatch = useDispatch();
    const singleLink = information.url_overridden_by_dest;
// Create Local states to handle simple changes & use Selectors.
    const morePictures = [];
    let [score, setScore] = useState({
        score: information.score,
        isUp: false,
        isDown: false
    });
    const [imageIndex, setImageIndex] = useState(0);
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
            if (score.isUp) {
                delta = -1; // Removing existing upvote
            } else if (score.isDown) {
                delta = 2; // Removing downvote (+1) + adding upvote (+1)
            }
            return {
                score: prev.score + delta,
                isDown: (score.isUp ? score.isDown : false),
                isUp: !score.isUp
                };
        });
    }
    
    function handleDownVote() {
        setScore(prev => {
            let delta = -1; // Assume we're adding a downvote
            if (score.isDown) {
                delta = 1; // Removing existing downvote
            } else if (score.isUp) {
                delta = -2; // Removing upvote (-1) + adding downvote (-1)
            }
            return {
                score: prev.score + delta,
                isUp: (score.isDown ? score.isUp : false),
                isDown: !score.isDown
            };
        });
    }

    function ifYoutubeLink() { // If the post has a single youtube video link, modify it into an embed link to be able to used it in an iframe
        const youtubeLink = singleLink.includes('https://youtu.be/') ? singleLink.replace('https://youtu.be/', 'https://www.youtube.com/embed/') : singleLink.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
        return youtubeLink;
    }

    let viewer;
    if (information.is_gallery) { // Handle post has more than 1 picture
        // Create function to fix links to be usable by replacing $amp; with &
        for (let data in information.media_metadata) {
            const amountOfPictures = information.media_metadata[data].p.length - 1; // find the highest resolution of the picture
            const dirtyPicture = information.media_metadata[data].p[amountOfPictures].u; // copy the link with &amp; messing it up
            const cleanPicture = cleanThemAmps(dirtyPicture); // make the link usable
            morePictures.push(cleanPicture);
        }
        if (inPost) {
            function handleRight() { setImageIndex(prev => prev + 1 < morePictures.length ? prev + 1 : 0) }
            function handleLeft() { setImageIndex(prev => prev - 1 >= 0 ? prev - 1 : morePictures.length - 1)}

            viewer = (
                <section>
                    <img src={prevPic} onClick={handleLeft} alt=''/>
                    <a href={morePictures[imageIndex]}><img src={morePictures[imageIndex]} alt=''/></a>
                    <img src={nextPic} onClick={handleRight} alt=''/>
                </section>
            )
        }
    }

    return (
        <article class='singlePost'>
            {inPost && (<img src={goBack} onClick={exit} alt='go back button' id='ReturnButton'/>)}
            <div class='leftPostInfo'>

                <img src={score.isUp ? upVoteImg : arrowUp} alt="Upvote" onClick={handleUpVote} class='upVotePost'/>
                <h3 class='votesCountPost'>{score.score}</h3>
                <img src={score.isDown ? downVoteImg : arrowDown} alt="Downvote" onClick={handleDownVote} class='downVotePost'/>

                {inPost ? (<img alt='view comments' src={commentImg} class='commentsIcon'/>): (<img onClick={enter} alt='view comments' src={commentImg} class='commentsIcon'/>)}
                <h3 class='commentsCount'>{information.num_comments}</h3>

            </div>
            <div class='overallPostContent'>
                
                {inPost ? (<h2 class='postTitle'><a href={"https://www.reddit.com" + information.permalink} target="_blank" rel="noreferrer">{information.title}</a></h2>)
                 : (<h2 onClick={enter} class='postTitle'>{information.title}</h2>)}
                <hr/>
                <p class='postContent' dangerouslySetInnerHTML={fixUrlsIfAny(information.selftext)}></p>
                
                        {/* Logic to handle rendering posts that are image or video centric.*/}
                {singleLink && (
                    (singleLink.includes("https://www.youtube.com") || singleLink.includes("https://youtu.be")) ? (
                        // Handle if the post has a youtube Video.
                        <iframe src={ifYoutubeLink()}
                                title={ifYoutubeLink()}
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write;
                                encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                                class='yTVideoEmbed'>
                        </iframe>
                    ) : ( // check if multiple images are in the post
                
                        information.is_gallery ? (
                           inPost ? viewer : <img src={morePictures[0]} alt='' class='galleryImage'/>
                        ) : (
                // New file extension check for single link
                            (/\.(jpg|jpeg|gif|png|webp)$/i.test(singleLink)) ? (
                // Show image if extension matches
                                <img src={singleLink} alt='' class='anImageInPost'/>
                            ) : (
                                // Show raw link text if not an image
                                <a href={singleLink}>{singleLink}</a> ))))}
                    <div class='bottomInfo'>
                        <div class='back2back'>
                            {pfpElement}
                            <p class='postAuthorName'>{information.author}</p>
                        </div>
                        <div class='back2back'>
                            {subImgElement}
                            <p class='postSubName'>{information.subreddit}</p>
                        </div >
                        <p class='timeAgoPost'>{timeAgo(information.created_utc)}</p>
                    </div>
            </div>
        </article>
    )
}

export default Post;