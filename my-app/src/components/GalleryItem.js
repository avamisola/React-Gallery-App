import React from 'react';

//return a photo from flickr api as a list item
const GalleryItem = (props) => {
    return (
        <li>
            <img src={props.url} alt='' />
        </li>
    )
}

export default GalleryItem;