import React from "react";

function SubReddit({styles, addRemove, information, plusMinus, selected}) {

    
    if (!information) {
        return null; // Prevent rendering if information is undefined
    }
    
    return (

        <div>
            <img href={`https://styles.redditmedia.com/${information.something}/styles/communityIcon_${information.somethingElse}.png`} />
            <h3>{information.title}</h3>

            <button onClick={() => addRemove(information)}>
                {plusMinus}
            </button>
        </div>
    )

}

export default SubReddit;
