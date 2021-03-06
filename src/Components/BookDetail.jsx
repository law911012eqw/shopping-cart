import React from 'react';

const BookDetail = (objForBookDetail, setObjForBookDetail) => {
    const obj = objForBookDetail;
    console.log(obj.objForBookDetail.title);
    const handleClick = () => setObjForBookDetail([]);
    return (
        <div className="modal">
            <div className="Book-Detail">
                <div className="book-detail-info">
                    <h3>{obj.objForBookDetail.title}</h3>
                    <h5 className="book-author">{`by | ${obj.objForBookDetail.author}`}</h5>
                    <div className="img-slider">
                        <div></div>
                        <div className="img-slider-main">
                            <button></button>
                            <img></img>
                            <button></button>
                        </div>
                        <div className="img-slider-circles">
                            <div id="isc1" className="isc"></div>
                            <div id="isc2" className="isc"></div>
                            <div id="isc3" className="isc"></div>
                        </div>
                    </div>
                    <button className="add-to-cart">
                        <i className="fas fa-shopping-cart"></i>
                        <span className="add-to-cart-text">|Add to cart</span>
                    </button>
                </div>
                <div className="book-detail-desc">
                {obj.objForBookDetail.desc}
                </div>
                <button onClick={handleClick} className="btn-close"><i class="far fa-times-circle"></i></button>
            </div>
        </div>
    )
}

export default BookDetail;