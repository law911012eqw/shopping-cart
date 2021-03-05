import React, { useState, useEffect } from 'react';

import BooksNav from './BooksNav';

const images = require.context('../assets/images/books', true, /\.svg|png|jpg$/);

//The heart of the project compels me to deny myself at resorting to auto mapping and manually create specific details about the book 
//rather than doing auto-adding random value on every propeties in each iteration which seems to adjust effort points.
//Adding some specific details about the book especially price but the rest such as count will be implemented automatically by functions
const Books = () => {
    //Reserved array of book objects for later
    const [books, setBooks] = useState([]);

    //copy of the original books as a sorting display array
    const [displayBooks, setDisplayBooks] = useState([]);

    //trigger states that changes for every click event on the proper elements associated with it
    const [didPriceSortClicked, setDidPriceSortClicked] = useState(undefined); //true -> up; false -> down
    const [didAlphaSortClicked, setDidAlphaSortClicked] = useState(undefined); //true -> up; false -> down

    //event object as a state
    const [eventName, setEventName] = useState();
    //mapping the entire book iamges
    const importAll = images.keys().map(images);
    //Helpers
    const emphasizedPropHelper = (b, title, price, author, genres, desc) => {
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
                2, 'A.B Mitford',
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
            str = str.replace(`/static/media/`, '').replace(`-`, ' ').split('_');
            return str[0].replace(/([A-Z])/g, ' $1').trim();
        }
        loadBookDatabase(importAll);
        setBooks(newArr);
        setDisplayBooks(newArr);
    }, [])
    useEffect(()=>{
        console.log(didPriceSortClicked, didAlphaSortClicked);
        const eid = eventName;
        const booksCopy = books;
        if(eid === 'price'){
                if (didPriceSortClicked === true) {
                    booksCopy.sort((a, b) => ((a.price < b.price) ? 1 : -1));
                } else if (didPriceSortClicked === false) {
                    booksCopy.sort((a, b) => ((a.price > b.price) ? 1 : -1)); 
                }
                setDisplayBooks(booksCopy);
        } else if(eid === 'title'){
            // for (let i = 0; i < booksCopy.length; i++) {
                if (didAlphaSortClicked === true) {
                    booksCopy.sort((a, b) => ((a.title.toUpperCase() < b.title.toUpperCase()) ? 1 : -1));
                } else if (didAlphaSortClicked === false) {
                    booksCopy.sort((a, b) => ((a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : -1));
                }
                setDisplayBooks(booksCopy);
            // }
        } else if(eid === 'library'){
            setDisplayBooks(books);
            setDidPriceSortClicked('undefined');
            setDidAlphaSortClicked('undefined');
        }
    },[didPriceSortClicked, didAlphaSortClicked, eventName])
    console.log(displayBooks);
    console.log(eventName);
    const renderBooks = displayBooks.map((b, i) => {
        console.log(b);
        return (
            <div
                key={i}
                id={`book-display${i + 1}`}
                className="book-display"
            >
                <div className="book-display-upper">
                    <div>
                        <h3 className="book-title">{b.title}</h3>
                        <h5 className="book-author">{`by | ${b.author}`}</h5>
                    </div>
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
                <BooksNav
                    booksNum={books.length}
                    setDidPriceSortClicked={setDidPriceSortClicked}
                    setDidAlphaSortClicked={setDidAlphaSortClicked}
                    setEventName={setEventName}
                />
                <div className="book-display-container">
                    {renderBooks}
                </div>
            </div>
        </div>
    );
}

export default Books;