import React, { useState } from 'react';

const BooksNav = ({
    booksNum,
    setDidPriceSortClicked,
    setDidAlphaSortClicked,
    setEventName,
    setMatchValue,
    authorArray,
    genreArray
}) => {
    const [PriceSort, setPriceSort] = useState('default');
    const [AlphaSort, setAlphaSort] = useState('default');
    const [AuthorSort, setAuthorSort] = useState('right');
    const [GenreSort, setGenreSort] = useState('right');
    const toggleSortIcon = (e) => {
        if (e.target.className === 'books-nav-genres') {
            if (GenreSort === 'right') {
                setGenreSort('down');
            } else {
                setGenreSort('right');
            }
        } else if (e.target.className === 'books-nav-authors') {
            if (AuthorSort === 'right') {
                setAuthorSort('down');
            } else {
                setAuthorSort('right');
            }
        } else if (e.target.className === 'books-nav-all') {
            setAlphaSort('default');
            setPriceSort('default');
        } else if (e.target.className === 'books-nav-price') {
            if (PriceSort !== 'up') {
                setPriceSort('up')
                setDidPriceSortClicked(true);
            } else {
                setPriceSort('down');
                setDidPriceSortClicked(false);
            }
            setAlphaSort('default');
        } else if (e.target.className === 'books-nav-alpha') {
            if (AlphaSort !== 'up') {
                setAlphaSort('up')
                setDidAlphaSortClicked(true);
            } else {
                setAlphaSort('down');
                setDidAlphaSortClicked(false);
            }
            setPriceSort('default');
        }
        setEventName(e.target.id);
    }
    const handleClick = (e) => {
        const splitText = e.target.textContent.split('(');
        setMatchValue(splitText[0]);
    }
    return (
        <div className='Books-Nav'>
            <ul className="books-top-nav">
                <li
                    onClick={toggleSortIcon}
                    id="library"
                    className="books-nav-all">
                    All books <span> ({booksNum})</span>
                </li>
                <li
                    onClick={toggleSortIcon}
                    id="price"
                    className="books-nav-price">
                    Low to high price {PriceSort === 'up' ? <i className="fas fa-sort-up"></i> :
                        PriceSort === 'down' ? <i className="fas fa-sort-down"></i> : null}
                </li>
                <li onClick={toggleSortIcon}
                    id="title"
                    className="books-nav-alpha">
                    A-Z {AlphaSort === 'up' ? <i className="fas fa-sort-up"></i> :
                        AlphaSort === 'down' ? <i className="fas fa-sort-down"></i> : null}
                </li>
            </ul>
            <ul className="books-bottom-nav">
                <div className="prop-list" id="author-list">
                    <h4
                        onClick={toggleSortIcon}
                        className="books-nav-authors">
                        Authors {AuthorSort === 'right' ? <i className="fas fa-caret-right"></i> : <i className="fas fa-sort-down"></i>}
                    </h4>
                    <ul>
                        {AuthorSort === 'down'
                            ? authorArray.map((prop, i) => {
                                return (
                                    <li key={i} onClick={handleClick} className="prop-only-selection">{prop.author}({prop.count})</li>
                                );
                            })
                            : null}

                    </ul>
                </div>

                <div className="prop-list" id="genre-list">
                    <h4
                        onClick={toggleSortIcon}
                        className="books-nav-genres">
                        Genres {GenreSort === 'right' ? <i className="fas fa-caret-right"></i> : <i className="fas fa-sort-down"></i>}
                    </h4>
                    <ul>
                        {GenreSort === 'down'
                            ? genreArray.map((prop, i) => {
                                return (
                                    <li key={i} onClick={handleClick} className="prop-only-selection">{prop.genres}({prop.count})</li>
                                );
                            })
                            : null}

                    </ul>
                </div>
            </ul>
        </div>
    );
}

export default BooksNav;