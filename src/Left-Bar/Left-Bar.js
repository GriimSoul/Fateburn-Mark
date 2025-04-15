import React, {useState} from 'react';
import SubSearch from './Sub-Search/Sub-Search';
import SubList from './Sub-List/Sub-List';
import './Left-Bar.css';
import hideShow from './HideShow.svg';

function LeftBar() {

    const [isHidden, setIsHidden] = useState(false);

    const toggleVisibility = () => {
        setIsHidden(prevState => !prevState);
    };

    return (
        <div id="LeftContainer">
            <section class={isHidden ? 'leftAreaHidden' : 'leftArea'}>
                <SubSearch />
                <SubList />
            </section>
            <img id='LeftAreaButton' src={hideShow} onClick={toggleVisibility} alt='Hide/Show button'/>
        </div>
    )
}

export default LeftBar;