export default function godThisIsPain(information) {
    const allTheDamnNames = [];
    information.map((singleComment) => {
        // Begins by storing the starting author name
        allTheDamnNames.push(singleComment.data.author)

        // checks if the comment has replies
        const repliesExist = singleComment.data.replies ? true : false;

        if (repliesExist) {
            const queue = [...singleComment.replies.data.children]; // Initialize the queue with all top-level replies
            while (queue.length > 0) {
                const child = queue.shift(); // Dequeue the first element
                const reply = child.data; // Access the reply data

                // Check if the author exists and add to authors array if not already present
                const authorExists = reply.author !== '[deleted]';

                if (authorExists && !allTheDamnNames.includes(reply.author)) {
                    allTheDamnNames.push(reply.author);
                }

                // Check if this reply has its own replies and add them to the queue
                if (reply.replies && reply.replies.data && Array.isArray(reply.replies.data.children)) {
                    queue.push(...reply.replies.data.children); // Add all children of the replies to the queue
                }
            }
        }
    })
    return allTheDamnNames;
}
