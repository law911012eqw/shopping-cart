import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import Books from './Books';
import Cart from './Cart';
const images = require.context('../assets/images/home', true, /\.svg|png|jpg$/);
const Home = () => {
    const history = useHistory();
    console.log(images);
    const [routeImages, __] = useState([
        {
            image: `${images}/home_books.jpg`,
            header: 'Books',
            desc: 'Navigates to a library of books to be sold in low cost'
        },
        {
            image: '../assets/images/home/home_cart.jpg',
            header: 'Cart',
            desc: 'A list of submitted books to be ordered'
        },
        {
            image: 'src/assets/images/home/home_wall.jpg',
            header: 'About',
            desc: `Hi! I am Rineria, This is my personal website for selling used books that 
            I have read in a reasonable low prices. Most genres are non-fiction, philosophy, some fictions and more`
        }, {
            image: '',
            header: 'Github',
            desc: 'asdasd'
        }

    ]);
    useEffect(() => {
        const homecard = [...document.getElementsByClassName('homecard')];
        console.log(homecard);
        homecard.forEach(element => {
            element.onclick = (e) => {
                e.stopPropagation();
                if (e.target.id === 'books') {
                    history.push('/Books');
                } else if (e.target.id === 'cart') {
                    history.push('/Cart');
                }
            }
        });

    }, [])
    const homeCard = routeImages.map((prop, i) => {
        console.log(prop);
        return (
            <div
                id={[...prop.header].map(x => x == x.toUpperCase() ? x.toLowerCase() : x).join('')}
                className='homecard'
                key={i}
                style={{
                    backgroundImage: `url(${prop.image})`
                }}>
                <h1 className="homecard-header">{prop.header}</h1>
                <h3 className="homecard-desc">{prop.desc}</h3>
            </div>
        )
    });
    return (
        <div className='Home'>
            <h1 className="component-title">Home</h1>
            <div className="home-card-container">
                {routeImages !== null ? homeCard : null}
            </div>
        </div>
    );
}

export default Home;