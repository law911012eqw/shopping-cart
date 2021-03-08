import React, { useState, useEffect } from 'react';

const BookDetail = ({objForBookDetail, setObjForBookDetail}) => {
    const obj = objForBookDetail; //renaming the object to shorter name
    const [genreArr, setGenreArr] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0); //images prop elements
    const [currentImage, setCurrentImage] = useState(obj.default)
    const handleClick = () => { 
        setObjForBookDetail(null); 
        console.log(objForBookDetail);
    }
    const imageArray = ['default', 'open', 'back'];

    useEffect(() => {
        function seperateByComma(str) {
            str = str.split('').map(x => x === '=' ? x = ' ' : x).join('');
            return str.includes(',') ? str.split(',') : str;
        }
        const genres = obj.genres;
        setGenreArr(seperateByComma(genres));
    }, [])
    const renderGenres = genreArr.map((genre, i) => {
        return (
            <div className="book-detail-genre">
                {genre}
            </div>
        )
    })
    const plusSlides = (n) => {
        console.log(slideIndex);
        setSlideIndex(slideIndex+n);
    }
    useEffect(() => {
        let i;
        const currentImgProp = imageArray[slideIndex];
        const dots = document.getElementsByClassName("isc");
        if (slideIndex > imageArray.length) { setSlideIndex(1) }
        if (slideIndex < 1) { setSlideIndex(imageArray.length) }
        setCurrentImage(obj[currentImgProp]);
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" current", "");
        }
        dots[0].className += " current";
    }, [slideIndex])
    return (
        <div className="modal">
            <div className="Book-Detail">
                <div className="book-detail-info">
                    <div>
                        <h3 className="book-title">{obj.title}</h3>
                        <h5 className="book-author">{`by | ${obj.author}`}</h5>
                        <div className="img-slider">
                            <div className="img-slider-main">
                                <button onClick={() => plusSlides(-1)}><i className="fas fa-caret-left"></i></button>
                                <img className="book-detail-current-image" src={currentImage} alt="book"></img>
                                <button onClick={() => plusSlides(+1)}><i className="fas fa-caret-right"></i></button>
                            </div>
                            <div className="dots">
                                <span id="isc1" className="isc"></span>
                                <span id="isc2" className="isc"></span>
                                <span id="isc3" className="isc"></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="book-detail-genre-list">
                            {renderGenres}
                        </div>
                        <div className="book-detail-cart-wrapper">
                            <div className="book-detail-price-tag">{`$ `}{obj.price}</div>
                            <button className="add-to-cart">
                                <i className="fas fa-shopping-cart"></i>
                                <span className="add-to-cart-text">|Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="book-detail-desc">
                    {obj.desc}
                </div>
                <i onClick={() => handleClick()} className="far fa-times-circle btn-close"></i>
            </div>
        </div>
    )
}

export default BookDetail;