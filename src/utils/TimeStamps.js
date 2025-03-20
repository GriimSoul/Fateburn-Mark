function timeOfCreation(utc) {
    const now = Date.now();
    const commentTime = utc*1000; // pass from seconds to miliseconds

    const diffInSeconds = Math.floor((now - commentTime) / 1000); // obtain difference in seconds

    let timeAgo;
    if (diffInSeconds < 60) {
        timeAgo = `${diffInSeconds} seconds ago`;
    }
    else if (diffInSeconds < 3600) {
        timeAgo = `${Math.floor(diffInSeconds / 60)} minutes ago`;
    }
    else if (diffInSeconds < 86400) {
        timeAgo = `${Math.floor(diffInSeconds / 3600)} hours ago`;
    }
    else if (diffInSeconds < 604800) {
        timeAgo = `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
    else if (diffInSeconds < 2592000) {
        timeAgo = `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    }
    else if (diffInSeconds < 31104000) {
        timeAgo = `${Math.floor(diffInSeconds / 2592000)} months ago`;
    }
    else {
        timeAgo = `${Math.floor(diffInSeconds / 31104000)} years ago`;
    }

    return timeAgo;

}

export default timeOfCreation;