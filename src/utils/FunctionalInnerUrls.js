import DOMPurify from 'dompurify';

function fixUrlsIfAny(theText) { // Handle cases when the post text contains URLs by adding anchors to them.
    if (!theText) return null; // No text? nothing to do.
    
    let content = theText;
    const urlRegex = /https?:\/\/[^\s]+/gi; // Regular expression to match URLs, stops seeking after a whitespace.
    const urlMatches = content.match(urlRegex);

    if (urlMatches && !theText.includes('https://preview.redd.it')) {
        const uniqueUrls = [...new Set(urlMatches)];
        uniqueUrls.forEach(url => {
            const cleanURL = cleanThemAmps(url); // Fix the &amp; issue in links.
            content = content.replaceAll(  // Replace simple url text with anchor tags containing the cleansed link.
                url, 
                `<a  target='_blank' href="${encodeURI(cleanURL)}">${cleanURL}</a>`
            );
        });
    }
    else if (theText.includes('https://preview.redd.it')) { // About the same as above, but intead of anchors, I use image tags
        const uniqueUrls = [...new Set(urlMatches)];
        uniqueUrls.forEach(url => {
            const cleanURL = cleanThemAmps(url);
            content = content.replaceAll(
                url,
                `<img src="${cleanURL}"/><br>`
            );
        })
    }    

    // Sanitize content before rendering - always remember to wash your hands.
    return { __html: DOMPurify.sanitize(content) };
}

export function cleanThemAmps(str) {
    return typeof str === 'string' 
    ? str.replace(/&amp;/g, '&') 
    : console.log('check cleanThemAmps Calls, whatever you gave me, it\'s not a string');
}

export default fixUrlsIfAny;