import React from "react";
import missing from '../../../Main-Area/fateburn face.svg';
import { useSelector } from "react-redux";

function SubReddit({ addRemove, information, plusMinus, selected, handleClick}) {

    const storedReddits = useSelector((state) => state.subList.subReddits);

    if (!information) {
        return null; // Prevent rendering if information is undefined
    }
    else if (storedReddits.some((element) => element.id === information.id) && plusMinus === "+") {
        return null; // Hide already stored subReddits from results.
    }
    else if (information.title === "Home") { // Create special rendering for Home option.
        return (

            <div onClick={handleClick} >
                <img src={ information.community_icon} />
                <h3>{information.title}</h3>
            </div>
        )
    }

    const iconLinkDirty = information.community_icon;
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
    const clean_icons = removeNonsenseFromLink(iconLinkDirty);

    return (

        <div >
            <div onClick={handleClick}>
                <img src={ clean_icons ? clean_icons : missing} />
                <h3>{information.display_name}</h3>
            </div>

            {Object.keys(information).length > 0 && (
        <button onClick={() => addRemove(information)}>
          {plusMinus}
        </button>
      )}
        </div>
    )

}

export default SubReddit;
