import React from 'react';
import GalleryItem from './GalleryItem';
import NoResultsFound from './NoResultsFound';

//if query resturns results then display items else say no results found
class Gallery extends React.Component {
    render() {
        const results = this.props.data;
        let resultsTitle = this.props.query;
        let galleryItems = '';
        if (results.length > 0) {
            galleryItems = results.map(photo => <GalleryItem key={photo.id} url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />);
        } else {
            galleryItems = <NoResultsFound />;
        }
        return (
            <div className="photo-container">
                <h2>{resultsTitle}</h2>
                <ul>{galleryItems}</ul>
            </div>
        )
    }
}

export default Gallery;