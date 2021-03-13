import React, { useState, useEffect } from 'react';

import uniqid from 'uniqid';
import BooksNav from './BooksNav';
import BookDetail from './BookDetail';
const images = require.context('../assets/images/books', true, /\.svg|png|jpg$/);

//The heart of the project compels me to deny myself at resorting to auto mapping and manually create specific details about the book 
//rather than doing auto-adding random value on every propeties in each iteration which seems to adjust effort points or provides a weak essence of a shopping cart webpage.
//Adding some specific details about the book especially price but the rest such as count will be implemented automatically by functions
const Books = ({ cartList, setCartList, books, setBooks }) => {
    //A state that changes after the DidComponentMount version of react hooks is triggered in the second render
    //A technique used to trigger a side-effect in intended order
    const [InitialRenderDone, setInitialRenderDone] = useState(false);
    //copy of the original books as a sorting display array
    const [displayBooks, setDisplayBooks] = useState([]);
    const [authorArray, setAuthorArray] = useState([]);
    const [genreArray, setGenreArray] = useState([]);

    const [renderTwice, setRenderTwice] = useState(true);
    //trigger states that changes for every click event on the proper elements associated with it
    const [didPriceSortClicked, setDidPriceSortClicked] = useState(undefined); //true -> up; false -> down
    const [didAlphaSortClicked, setDidAlphaSortClicked] = useState(undefined); //true -> up; false -> down

    //A value that checks whether it exists on one of the selected property
    const [matchValue, setMatchValue] = useState(null);

    //event object as a state
    const [eventName, setEventName] = useState();

    //mapping the entire book iamges
    const importAll = images.keys().map(images);

    //book id
    const [currentID, setCurrentID] = useState(null);

    //An object gets saved here after a mouse click trigger event
    const [objForBookDetail, setObjForBookDetail] = useState(null);
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
        if (cartList.length == 0) {
            const newArr = [];
            //Manually adding value to each emphasized properties
            function addingDetails(b) {
                emphasizedPropHelper(
                    b, 'Japanese Legends and Folklore',
                    4, 'A.B Mitford',
                    'Mythology,Folklore',
                    'No description added.'
                )
                emphasizedPropHelper(
                    b, 'Kafka on the Shore',
                    5, 'Haruki Murakami',
                    'Fantasy,Fiction,Novel',
                    'Kafka on the Shore, a tour de force of metaphysical reality, is powered by two remarkable characters: a teenage boy, Kafka Tamura, who runs away from home either to escape a gruesome oedipal prophecy or to search for his long-missing mother and sister; and an aging simpleton called Nakata, who never recovered from a wartime affliction and now is drawn toward Kafka for reasons that, like the most basic activities of daily life, he cannot fathom. Their odyssey, as mysterious to them as it is to us, is enriched throughout by vivid accomplices and mesmerizing events. Cats and people carry on conversations, a ghostlike pimp employs a Hegel-quoting prostitute, a forest harbors soldiers apparently unaged since World War II, and rainstorms of fish (and worse) fall from the sky. There is a brutal murder, with the identity of both victim and perpetrator a riddle—yet this, along with everything else, is eventually answered, just as the entwined destinies of Kafka and Nakata are gradually revealed, with one escaping his fate entirely and the other given a fresh start on his own.'
                )
                emphasizedPropHelper(
                    b, 'The Sailor Who Fel From Grace With The Sea',
                    4, 'Yukio Mishima',
                    'Fiction,Novel,Philosophy,Classics',
                    'The Sailor Who Fell from Grace with the Sea tells the tale of a band of savage thirteen-year-old boys who reject the adult world as illusory, hypocritical and sentimental, and train themselves in a brutal callousness they call "objectivity." When the mother of one of them begins an affair with a ship\'s officer, he and his friends idealize the man at first; but it is not long before they conclude that he is in fact soft and romantic. They regard their disappointment in him as an act of betrayal on his part, and react violently.'
                )
                emphasizedPropHelper(
                    b, 'Children of Time',
                    8, 'Adrian Tchaikovsky',
                    'Science=Fiction,Fiction,Space,Opera',
                    `A race for survival among the stars... Humanity's last survivors escaped earth's ruins to find a new home. But when they find it, can their desperation overcome its dangers?

                    WHO WILL INHERIT THIS NEW EARTH?
                    
                    The last remnants of the human race left a dying Earth, desperate to find a new home among the stars. Following in the footsteps of their ancestors, they discover the greatest treasure of the past age—a world terraformed and prepared for human life.`
                )
                emphasizedPropHelper(
                    b, 'Existentialism is Humanism',
                    5, 'Jean-Paul Sartre',
                    'Philosophy,Non=fiction,Classics',
                    'The idea of freedom occupies the center of Sartre’s doctrine. Man, born into an empty, godless universe, is nothing to begin with. He creates his essence—his self, his being—through the choices he freely makes (“existence precedes essence”). Were it not for the contingency of his death, he would never end. Choosing to be this or that is to affirm the value of what we choose. In choosing, therefore, we commit not only ourselves but all of mankind.'
                )
                emphasizedPropHelper(
                    b, 'Fahrenheit 451',
                    3, 'Ray Bradfury',
                    'Classics,Fiction,Science=Fiction',
                    `Guy Montag is a fireman. In his world, where television rules and literature is on the brink of extinction, firemen start fires rather than put them out. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden.

                Montag never questions the destruction and ruin his actions produce, returning each day to his bland life and wife, Mildred, who spends all day with her television 'family'. But then he meets an eccentric young neighbor, Clarisse, who introduces him to a past where people did not live in fear and to a present where one sees the world through the ideas in books instead of the mindless chatter of television.`
                )
                emphasizedPropHelper(
                    b, 'House of Leaves',
                    9, 'Mark Z. Danielewski',
                    'Horror,Fiction',
                    'Years ago, when House of Leaves was first being passed around, it was nothing more than a badly bundled heap of paper, parts of which would occasionally surface on the Internet. No one could have anticipated the small but devoted following this terrifying story would soon command. Starting with an odd assortment of marginalized youth—musicians, tattoo artists, programmers, strippers, environmentalists, and adrenaline junkies—the book eventually made its way into the hands of older generations, who not only found themselves in those strangely arranged pages but also discovered a way back into the lives of their estranged children.'
                )
                emphasizedPropHelper(
                    b, 'Fear and Trembling',
                    6, 'Soren Kierkegaard',
                    'Philosophy,Non=fiction,Religion,Classics',
                    'In Fear and Trembling, Kierkegaard wanted to understand the anxiety that must have been present in Abraham when God commanded him to offer his son as a human sacrifice. Abraham had a choice to complete the task or to forget it. He resigned himself to the loss of his son, acting according to his faith. In other words, one must be willing to give up all his or her earthly possessions in infinite resignation and must also be willing to give up whatever it is that he or she loves more than God. Abraham had passed the test -- his love for God proved greater than anything else in him. And because a good and just Creator would not want a father to kill his son, God intervened at the last moment to prevent the sacrifice.'
                )
                emphasizedPropHelper(
                    b, 'Men Without Women',
                    11, 'Haruki Murakami',
                    'Short=Stories,Fiction',
                    `A dazzling new collection of short stories—the first major new work of fiction from the beloved, internationally acclaimed, Haruki Murakami since his #1 best-selling Colorless Tsukuru Tazaki and His Years of Pilgrimage.

                Across seven tales, Haruki Murakami brings his powers of observation to bear on the lives of men who, in their own ways, find themselves alone. Here are vanishing cats and smoky bars, lonely hearts and mysterious women, baseball and the Beatles, woven together to tell stories that speak to us all.
                
                Marked by the same wry humor that has defined his entire body of work, in this collection Murakami has crafted another contemporary classic.`
                )
                emphasizedPropHelper(
                    b, 'No Longer Human',
                    4, 'Osamu Dazai',
                    'Fiction,Classics,Asian=Literature,Literature',
                    'Osamu Dazai\'s No Longer Human, this leading postwar Japanese writer\'s second novel, tells the poignant and fascinating story of a young man who is caught between the breakup of the traditions of a northern Japanese aristocratic family and the impact of Western ideas. In consequence, he feels himself "disqualified from being human" (a literal translation of the Japanese title).'
                )
                emphasizedPropHelper(
                    b, 'On the shortness of life',
                    2, 'Seneca',
                    'Philosophy,Non=fiction,Classics',
                    `The Stoic writings of the philosopher Seneca offer powerful insights into the art of living, the importance of reason and morality, and continue to provide profound guidance to many through their eloquence, lucidity and timeless wisdom.

                Throughout history, some books have changed the world. They have transformed the way we see ourselves—and each other. They have inspired debate, dissent, war and revolution. They have enlightened, outraged, provoked and comforted. They have enriched lives—and destroyed them.`
                )
                emphasizedPropHelper(
                    b, 'One Hundred Years of Solitude',
                    4, 'Gabriel García Márquez',
                    'Fiction,Classics,Magical=Realism,Literature',
                    'The brilliant, bestselling, landmark novel that tells the story of the Buendia family, and chronicles the irreconcilable conflict between the desire for solitude and the need for love—in rich, imaginative prose that has come to define an entire genre known as "magical realism."'
                )
                emphasizedPropHelper(
                    b, 'The Brothers Karamazov',
                    10, 'Fyodor Dostoevsky',
                    'Classics,Fiction,Philosophy,Literature',
                    'The Brothers Karamazov is a murder mystery, a courtroom drama, and an exploration of erotic rivalry in a series of triangular love affairs involving the “wicked and sentimental” Fyodor Pavlovich Karamazov and his three sons―the impulsive and sensual Dmitri; the coldly rational Ivan; and the healthy, red-cheeked young novice Alyosha. Through the gripping events of their story, Dostoevsky portrays the whole of Russian life, is social and spiritual striving, in what was both the golden age and a tragic turning point in Russian culture.'
                )
                emphasizedPropHelper(
                    b, 'The Fifth Agreement',
                    3, 'Miguel Ruiz,José Luis Ruiz',
                    'Spirituality,Non=fiction,Self=help',
                    `Since 1997, The Four Agreements has transformed the lives of millions of people around the world with a simple but profound message.

                Now bestselling author don Miguel Ruiz and his son, don Jose Ruiz, collaborate with this powerful sequel The Fifth Agreement.
                
                The Four Agreements provides the foundation for breaking thousands of agreements that create needless suffering and with The Fifth Agreement you recover all the power of your authenticity, which is who you really are when you are born.`
                )
                emphasizedPropHelper(
                    b, 'The Mastery of Love',
                    3, 'Miguel Ruiz',
                    'Spirituality,Non=fiction,Self=help',
                    'In the tradition of Carlos Castaneda, the author distills essential Toltec wisdom on human relationships as well as techniques for integrating this awareness into daily life.'
                )
                emphasizedPropHelper(
                    b, 'The Voice of Knowledge',
                    3, 'Miguel Ruiz',
                    'Spirituality,Non=fiction,Self=help',
                    `In THE VOICE OF KNOWLEDGE, Miguel Ruiz reminds us of a profound and simple truth: The only way to end our emotional suffering and restore our joy I living is to stop believing in lies - mainly about ourselves. Based on ancient Toltec wisdom, this breakthrough book shows us how to recover our faith in the truth and return to our own common sense.

                Ruiz changes the way we perceive ourselves, and the way we perceive other people. Then he opens the door to a reality that we once perceived when we were one and two years old - a reality of truth, love, and joy.`
                )
                emphasizedPropHelper(
                    b, 'The Metamorphosis',
                    1.25, 'Franz Kafka',
                    'Classics,Fiction,Fantasy,Literature,Philosophy',
                    '"As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect. He was laying on his hard, as it were armor-plated, back and when he lifted his head a little he could see his domelike brown belly divided into stiff arched segments on top of which the bed quilt could hardly keep in position and was about to slide off completely. His numerous legs, which were pitifully thin compared to the rest of his bulk, waved helplessly before his eyes." '
                )
                emphasizedPropHelper(
                    b, 'The Selfish Gene',
                    14, 'Richard Dawkins',
                    'Science,Non=fiction,Biology',
                    'Inheriting the mantle of revolutionary biologist from Darwin, Watson, and Crick, Richard Dawkins forced an enormous change in the way we see ourselves and the world with the publication of The Selfish Gene. Suppose, instead of thinking about organisms using genes to reproduce themselves, as we had since Mendel\'s work was rediscovered, we turn it around and imagine that "our" genes build and maintain us in order to make more genes. That simple reversal seems to answer many puzzlers which had stumped scientists for years, and we haven\'t thought of evolution in the same way since. Drawing fascinating examples from every field of biology, he paved the way for a serious re-evaluation of evolution. He also introduced the concept of self-reproducing ideas, or memes, which (seemingly) use humans exclusively for their propagation. If we are puppets, he says, at least we can try to understand our strings.'
                )
                emphasizedPropHelper(
                    b, 'The Stranger',
                    3, 'Albert Camus',
                    'Classics,Fiction,Philosophy',
                    'Through the story of an ordinary man unwittingly drawn into a senseless murder on an Algerian beach, Camus explored what he termed "the nakedness of man faced with the absurd."'
                )
            }
            //Organize and push the images on the appropriate element order of the book array
            const loadBookDatabase = (arr) => {
                // index that are adjusted in patterns
                let manuallyAdjustedIndex = 0;
                arr.forEach((b, i) => {
                    if (b.default.includes('_1')) {
                        newArr.push(arr[i])
                        newArr[manuallyAdjustedIndex]['title'] = translateNameToBookTitle(b.default);
                        addingDetails(b);
                        newArr[manuallyAdjustedIndex]['inCart'] = false;
                        newArr[manuallyAdjustedIndex]['id'] = uniqid();
                    } else if (b.default.includes('_2')) {
                        newArr[manuallyAdjustedIndex]['open'] = b.default;
                    } else {
                        newArr[manuallyAdjustedIndex]['back'] = b.default;
                        manuallyAdjustedIndex += 1;
                    }
                })
            }
            const translateNameToBookTitle = (str) => {
                //First replace all hyphens with spaces
                str = str.split('').map(x => x === '-' ? x = ' ' : x).join('');
                //then remove the path from parent directories to display the title
                str = str.replace(`/shopping cart/static/media/`, '').split('_');
                return str[0].replace(/([A-Z])/g, ' $1').trim();
            }
            loadBookDatabase(importAll);
            setBooks(newArr);
        }
        setInitialRenderDone(!InitialRenderDone);
    }, [])
    //set the pinnacle database of books as a reference to a copy which is used to display using map iteration
    useEffect(() => {
        setDisplayBooks(...displayBooks, books);
        console.log('Third render');
    }, [InitialRenderDone])
    //A side effects that manually tracks the clicked DOMs and control the sorting functionality of the display array
    useEffect(() => {
        const eid = eventName;
        const booksCopy = books;
        if (eid === 'price') {
            if (didPriceSortClicked === true) {
                booksCopy.sort((a, b) => ((a.price > b.price) ? 1 : -1));
            } else if (didPriceSortClicked === false) {
                booksCopy.sort((a, b) => ((a.price < b.price) ? 1 : -1));
            }
            if (renderTwice === true) {
                setDisplayBooks([...displayBooks], booksCopy);
                setRenderTwice(false);
            } else {
                setDisplayBooks(booksCopy);
                setRenderTwice(true);
            }
        } else if (eid === 'title') {
            if (didAlphaSortClicked === true) {
                booksCopy.sort((a, b) => ((a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : -1));
            } else if (didAlphaSortClicked === false) {
                booksCopy.sort((a, b) => ((a.title.toUpperCase() < b.title.toUpperCase()) ? 1 : -1));
            }
            if (renderTwice === true) {
                setDisplayBooks([...displayBooks], booksCopy);
                setRenderTwice(false);
            } else {
                setDisplayBooks(booksCopy);
                setRenderTwice(true);
            }
        } else if (eid === 'library') {
            setDisplayBooks(books);
            setRenderTwice(false);
            setDidPriceSortClicked('undefined');
            setDidAlphaSortClicked('undefined');
        }
    }, [didPriceSortClicked, didAlphaSortClicked])
    console.log(books);
    console.log(books.filter(x => x.inCart === true));
    console.log(currentID);
    //A visual side effects on bottom-part of side navigation 
    useEffect(() => {
        //seperate the string by comma
        function seperateByComma(str) {
            str = str.split('').map(x => x === '=' ? x = ' ' : x).join('');
            return str.includes(',') ? str.split(',') : str;
        }
        //check whether the property already have specific value
        function hasPropertyDuplicate(prop, value, data) {
            let result = null;
            data.forEach(function (obj, index) {
                if (prop in obj && obj[prop] === value) {
                    result = index;
                    return false;
                }
            });
            return result;
        }
        //push property with values using one specific prop names including duplicate count
        function createArrayOfProp(arr, prop) {
            let array = []; //array for property counts
            arr.forEach((book) => {
                let indexForDuplicates = null;
                let currentProp = seperateByComma(book[prop]);
                //Do the following conditions if it's array
                if (Array.isArray(currentProp)) {
                    currentProp.forEach(element => {
                        indexForDuplicates = hasPropertyDuplicate(prop, element, array);
                        indexForDuplicates !== null ? array[indexForDuplicates].count += 1 : array.push({ [prop]: element, count: 1 });
                        indexForDuplicates = null;
                    })
                } else { //otherwise either increment if it's a duplicate or push these elements if it's a new one
                    indexForDuplicates = hasPropertyDuplicate(prop, currentProp, array);
                    indexForDuplicates !== null ? array[indexForDuplicates].count += 1 : array.push({ [prop]: book[prop], count: 1 })
                }
            })
            array = array.sort((a, b) => ((a[prop].toUpperCase() > b[prop].toUpperCase()) ? 1 : -1));
            return array;
        }
        setAuthorArray(createArrayOfProp(books, ['author']));
        setGenreArray(createArrayOfProp(books, ['genres']));
    }, [displayBooks])

    //Iterate books based on the matched value
    useEffect(() => {
        const newArray = [];
        books.forEach(book => {
            let genre = book.genres;
            const author = book.author;
            if (genre.includes('=')) {
                genre = genre.split('').map(x => x === '=' ? x = ' ' : x).join('');
            }
            if (genre.includes(matchValue) || author.includes(matchValue)) {
                newArray.push(book);
            }
        })
        setDisplayBooks(newArray);
    }, [matchValue])
    
    //This triggers when the cart list from parent component went empty
    useEffect(() => {
        const booksArr = books;
        if (cartList.length == 0 && currentID !== null) {
            booksArr.map((o) => {
                if (o.inCart === true) {
                    o.inCart = false;
                }
            })
            setBooks(booksArr);
            console.log('reset cart prop of books')
        }
    }, [cartList, currentID])
    const renderBooks = (arr) => arr.map((b, i) => {
        const handleBookDetail = () => setObjForBookDetail(b);

        //toggles a specific boolean property inside the main database of books
        const updateBookObjects = (bool) => {
            let copyBooksArr = books;
            copyBooksArr.map((o) => {
                if (o.id === b.id) {
                    o.inCart = bool;
                }
            })
            setBooks(books);
        }
        const toggleAddedToCart = (b) => {
            if (b.inCart === false) {
                setCurrentID(b.id);
                setCartList([...cartList, {
                    id: b.id,
                    title: b.title,
                    author: b.author,
                    price: b.price
                }])
                updateBookObjects(true);
            } else {
                console.log('remove book from cart');
                console.log(b.id);
                setCurrentID(b.id);
                const copyCartList = cartList;
                copyCartList.filter(x => x.id !== b.id);
                console.log(copyCartList.filter(x => x.id !== b.id));
                setCartList(copyCartList.filter(x => x.id !== b.id));
                updateBookObjects(false);
            }
        }
        return (
            <div
                key={i}
                id={`book-display${i + 1}`}
                className="book-display"
            >
                <div className="book-display-upper">
                    <div className="book-display-main">
                        <h3 onClick={handleBookDetail} className="book-title">{b.title}</h3>
                        <h5 className="book-author">{`by | ${b.author}`}</h5>
                    </div>
                    <div className="book-display-img-wrapper">
                        <img className="book-display-img" src={`${b.default}`} alt="book"></img>
                    </div>
                </div>
                <div className="book-display-lower">
                    <p className="book-click-text"><i className="fas fa-search-plus"></i>click title for details</p>
                    <button onClick={() => toggleAddedToCart(b)} className={b.inCart === true ? "remove-from-cart" : "add-to-cart"}>
                        <i className={b.inCart === true ? "fas fa-cart-arrow-down" : "fas fa-cart-plus"}></i>
                        <span className="add-to-cart-text">|{b.inCart === true ? "remove from cart" : "add to cart"}</span>
                    </button>
                </div>
                <div className="book-display-price-container">
                    <p>{`$${b.price}`}</p>
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
                    authorArray={authorArray}
                    genreArray={genreArray}
                    setMatchValue={setMatchValue}
                />
                <div className="book-display-container">
                    {renderBooks(displayBooks)}
                </div>
            </div>
            { objForBookDetail !== null
                ? <BookDetail
                    objForBookDetail={objForBookDetail}
                    setObjForBookDetail={setObjForBookDetail}
                    cartList={cartList}
                    setCartList={setCartList}
                /> : null}
        </div>
    );
}

export default Books;