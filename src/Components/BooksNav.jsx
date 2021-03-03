import React from 'react';

const BooksNav = ({booksNum}) => {
    const sortDown = () => {
        return(
            <i className="fas fa-sort-down"></i>
        )
    }
    const sortUp = () => {
        return(
            <i className="fas fa-sort-up"></i>
        )
    }
    const toggleSortIcon = (e) => {
        e.onclick = () => {

        }
    }
    return (
        <div className='Books-Nav'>
            <ul className="books-top-nav">
                <li>All books<span></span></li>
                <li>Low to high price<i class="fas fa-sort-down"></i></li>
                <li>A-Z</li>
            </ul>
            <ul className="books-bottom-nav">
                <h4>Authors</h4>
            </ul>
        </div>
    );
}

export default BooksNav;