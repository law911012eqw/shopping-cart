import React, { useState, useEffect } from 'react';

const BooksNav = ({ booksNum }) => {
    const [PriceSort, setPriceSort] = useState('default');
    const [AlphaSort, setAlphaSort] = useState('default');
    const [AuthorSort, setAuthorSort] = useState('right');
    const [GenreSort, setGenreSort] = useState('right');
    const toggleSortIcon = (e) => {
        if (e.target.className === 'books-nav-genres') {
            GenreSort === 'right' ? setGenreSort('down') : setGenreSort('right');
        } else if (e.target.className === 'books-nav-authors') {
            AuthorSort === 'right' ? setAuthorSort('down') : setAuthorSort('right');
        } else if (e.target.className === 'books-nav-all') {
            console.log('it worked');
            setAlphaSort('default');
            setPriceSort('default');
        } else if (e.target.className === 'books-nav-price') {
            PriceSort != 'up' ? setPriceSort('up') : setPriceSort('down');
        } else if (e.target.className === 'books-nav-alpha') {
            AlphaSort != 'up' | 'down' ? setAlphaSort('up') : setAlphaSort('down');
        }
    }
    console.log(GenreSort);
    return (
        <div className='Books-Nav'>
            <ul className="books-top-nav">
                <li
                    onClick={toggleSortIcon}
                    className="books-nav-all">
                    All books <span> ({booksNum})</span>
                </li>
                <li
                    onClick={toggleSortIcon}
                    className="books-nav-price">
                    Low to high price {PriceSort === 'up' ? <i className="fas fa-sort-up"></i> : 
                        PriceSort === 'down' ? <i className="fas fa-sort-down"></i> : null}
                    </li>
                <li onClick={toggleSortIcon}
                    className="books-nav-alpha">
                    A-Z {AlphaSort === 'up' ? <i className="fas fa-sort-up"></i> : 
                        AlphaSort === 'down' ? <i className="fas fa-sort-down"></i> : null}
                </li>
            </ul>
            <ul className="books-bottom-nav">
                <h4
                    onClick={toggleSortIcon}
                    className="books-nav-authors">
                    Authors {AuthorSort === 'right' ? <i className="fas fa-caret-right"></i> : <i className="fas fa-sort-down"></i>}
                </h4>
                <h4
                    onClick={toggleSortIcon}
                    className="books-nav-genres">
                    Genres {GenreSort === 'right' ? <i className="fas fa-caret-right"></i> : <i className="fas fa-sort-down"></i>}
                </h4>
            </ul>
        </div>
    );
}

export default BooksNav;