import React from 'react';

function PostList(props) {

    const {styles} = props;

    return (
        <section className={styles.Post}>
            <div className={styles.VoteComment}>

            </div>
            <div className={styles.Content}>

            </div>
            <div className={styles.ExtraInfo}>

            </div>
        </section>
    )
}

export default PostList;