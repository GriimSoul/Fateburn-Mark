import React from "react";

function Post({styles, information, upVote, downVote, enter}) {
    const morePictures = [];
    const singleLink = information.url_overridden_by_dest;

    function cleanThemAmps(str) {
        return typeof str === 'string' 
        ? str.replace(/&amp;/g, '&') 
        : console.log('check Post.js');
    }

    function fixUrlsIfAny() {
        let postContent = information.selftext;

        // Find all URL matches in the string
        const urlMatches = postContent.match(/https?:\/\/[^\s]+/gi);
        
        // If URLs found in post text
        if (urlMatches) {
            // Use Set to avoid duplicate replacements
            const uniqueUrls = [...new Set(urlMatches)];
        
            urlMatches.forEach(url => {
            const dirtyURL = url;
            const cleanURL = cleanThemAmps(url);
            postContent = postContent.replaceAll(dirtyURL, <a href={cleanURL} target="_blank">${cleanURL}</a>);
            })

        return postContent;
        }
        else {
            return postContent;
        }
    }

    function ifYoutubeLink() {
        // If the post has a single youtube video link, modify it into an embed link to be able to used it in an iframe
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

            <h2>{information.title}</h2>
            <p>{fixUrlsIfAny()}</p>

            {singleLink && (
    (singleLink.includes("https://www.youtube.com") || singleLink.includes("https://youtu.be")) ? (
        // Handle if the post has a youtube Video.
        <iframe src={ifYoutubeLink()} 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; 
                encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe> 
    ) : (
        information.is_gallery ? ( // check if multiple images are in the post
            morePictures.map((pic) => (
                <img 
                    key={pic}  // Add unique key for list items
                    src={pic} 
                />
            ))
        ) : (
            // New file extension check for single link
            (/\.(jpg|jpeg|gif|png|webp)$/i.test(singleLink)) ? (
                // Show image if extension matches
                <img src={singleLink} />
            ) : (
                // Show raw link text if not an image
                <a href={singleLink}>{singleLink}</a>
            )
        )
    )
)}
            
        </article>
    )
}

export default Post;