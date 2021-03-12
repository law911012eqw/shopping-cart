import React, { useState, useEffect } from 'react';

const BookDetail = ({ objForBookDetail, setObjForBookDetail, cartList, setCartList }) => {
    const obj = objForBookDetail; //renaming the object to shorter name
    const [genreArr, setGenreArr] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0); //images prop elements
    const [currentImage, setCurrentImage] = useState()
    const handleClick = () => setObjForBookDetail(null);
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
            <div key={i} className="book-detail-genre">
                {genre}
            </div>
        )
    })
    const plusSlides = (n) => {
        const modifiedIndex = slideIndex + n;
        if (modifiedIndex >= imageArray.length) { setSlideIndex(0); }
        else if (modifiedIndex < 0) { setSlideIndex(imageArray.length - 1); }
        else { setSlideIndex(modifiedIndex); }
    }
    const toggleAddedToCart = () => {
        setCartList([...cartList, objForBookDetail]);
    }
    useEffect(() => {
        let i;
        const currentImgProp = imageArray[slideIndex];
        const dots = document.getElementsByClassName("isc");
        setCurrentImage(obj[currentImgProp]);
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace("current", "");
        }
        dots[slideIndex].classList.add("current");
    }, [slideIndex])
    return (
        <div className="modal">
            <div className="Book-Detail">
                <div className="book-detail-info">
                    <div className="book-detail-upper">
                        <h3 className="book-title">{obj.title}</h3>
                        <h5 className="book-author">{`by | ${obj.author}`}</h5>
                        <div className="img-slider">
                            <div className="img-slider-main">
                                <button onClick={() => plusSlides(-1)}><i className="fas fa-caret-left"></i></button>
                                <img className="book-detail-img" src={currentImage} alt="book"></img>
                                <button onClick={() => plusSlides(+1)}><i className="fas fa-caret-right"></i></button>
                            </div>
                            <div className="dots">
                                <span id="isc1" className="isc"></span>
                                <span id="isc2" className="isc"></span>
                                <span id="isc3" className="isc"></span>
                            </div>
                        </div>
                    </div>
                    <div className="book-detail-lower">
                        <div className="book-detail-genre-list">
                            {renderGenres}
                        </div>
                        <div className="book-detail-cart-wrapper">
                            <div className="book-detail-price-tag">{`$ `}{obj.price}</div>
                            <button onClick={() => toggleAddedToCart()} className="add-to-cart">
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