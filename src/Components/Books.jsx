import React, { useState, useEffect } from 'react';

import BooksNav from './BooksNav';

const images = require.context('../assets/images/books', true, /\.svg|png|jpg$/);

//The heart of the project compels me to deny myself at resorting to auto mapping and manually create specific details about the book 
//rather than doing auto-adding random value on every propeties in each iteration which seems to adjust effort points.
//Adding some specific details about the book especially price but the rest such as count will be implemented automatically by functions
const Books = () => {
    //Reserved array of book objects for later
    const [books, setBooks] = useState([]);
    //mapping the entire book iamges
    const importAll = images.keys().map(images);
    //Helpers
    const emphasizedPropHelper = (b, title, price, genres, desc, author) => {
        if (b.title === title) {
            b.price = price;
            b.author = author;
            b.genres = genres;
            b.desc = desc;
        }
    }
    //Trigger these side effects after the initial render
    //Auto adding images
    useEffect(() => {
        const newArr = [];
        //Manually adding value to each emphasized properties
        function addingDetails(b) {
            emphasizedPropHelper(
                b, 'Japanese Legends and Folklore',
                4, 'A.B Mitford',
                'Mythology,Folklore',
                'asdsad')
            emphasizedPropHelper(
                b, 'Kafka on-the Shore',
                5, 'Haruki Murakami',
                'Fantasy,Fiction,Novel',
                'asdsad')
            emphasizedPropHelper(
                b, 'The Sailor Who Fel From Grace With The Sea',
                4, 'Yukio Mishima',
                'Fiction,Novel,Philosophy,Classics',
                'asdsad')
        }
        const loadBookDatabase = (arr) => {
            // index that are adjusted in patterns
            let manuallyAdjustedIndex = 0;
            arr.forEach((b, i) => {
                if (b.default.includes('_1')) {
                    console.log(b);
                    newArr.push(arr[i])
                    newArr[manuallyAdjustedIndex]['title'] = translateNameToBookTitle(b.default);
                    addingDetails(b);
                } else if (b.default.includes('_2')) {
                    newArr[manuallyAdjustedIndex]['open'] = b.default;
                } else {
                    newArr[manuallyAdjustedIndex]['back'] = b.default;
                    manuallyAdjustedIndex += 1;
                }
            })
        }
        const translateNameToBookTitle = (str) => {
            str = str.replace(`/static/media/`, '').replace(`-`, ' ');
            //str = str.replace(`-`, '');
            str = str.split('_');
            return str[0].replace(/([A-Z])/g, ' $1').trim();
        }
        loadBookDatabase(importAll);
        setBooks(newArr);
        console.log(books);
    }, [])

    console.log(books);
    const renderBooks = books.map((b, i) => {
        console.log(b);
        return (
            <div
                key={i}
                id={`book-display${i + 1}`}
                className="book-display"
            >
                <div className="book-display-upper">
                    <h3 className="book-title">{b.title}</h3>
                    <div>
                        <p>{`$${b.price}`}</p>
                        <img src={`${b.default}`} width="200px" alt="book"></img>
                    </div>
                </div>
                <div>
                    <p><i className="fas fa-search-plus"></i>click for details</p>
                    <button className="add-to-cart">
                        <i className="fas fa-shopping-cart"></i>
                        <span className="add-to-cart-text">|Add to cart</span>
                    </button>
                </div>
            </div>
        )
    })
    return (
        <div className='Books'>
            <div className='books-wrapper'>
                <BooksNav />
                <div className="book-display-container">
                    {renderBooks}
                </div>
            </div>
        </div>
    );
}

export default Books;