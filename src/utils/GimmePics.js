import nullUserPic from './chrome.svg';
import nullSubRedditPic from '../Main-Area/fateburn face.svg';
import { cleanThemAmps } from './FunctionalInnerUrls';

export function themProfilePics(information, author) {
    if (author === '[deleted]' || !author) {
        !author && console.log('Null / Undefined Author Received');
        return (
            <img alt='default user' src={nullUserPic} class='userPicture'></img>
        )
    }
    else if (information.length > 0) {
        const individualInfo = information.find(obj => obj.data.data.name === author) ? information.find(obj => obj.data.data.name === author): null;
        if (individualInfo) {
            const cleansedURL = cleanThemAmps(individualInfo.data.data.subreddit.icon_img);
            return (
                <a href={`https://www.reddit.com/user/${author}`} target='_blank' rel="noreferrer"><img alt={author + ' profile'} src={cleansedURL} class='userPicture'/></a>
            )
        }
    }
}

export function themSubredditPics(information, subreddit) {
    const individualInfo = information.find(obj => obj.display_name === subreddit);
    let clean_icon = false;

    if (individualInfo){
        const iconLinkDirty = individualInfo.community_icon;
        function removeNonsenseFromLink(link) {
            if (link.includes(".png")) {
                return link.split('.png')[0] + '.png';
            }
            else if (link.includes(".jpg")) {
                return link.split('.jpg')[0] + '.jpg';
            }
            else if (link.includes(".jpeg")) {
                return link.split('.jpeg')[0] + '.jpeg';
            }
            else if (link.includes(".webp")) {
                return link.split('.webp')[0] + '.webp';
            }
        }
        clean_icon = removeNonsenseFromLink(iconLinkDirty);
    }


    return (
        <a href={`https://www.reddit.com/r/${subreddit}`}>
            <img alt={`${subreddit} sub`} src={clean_icon ? clean_icon : nullSubRedditPic} class='mainAreaSubPic'/>
        </a>
    )
}