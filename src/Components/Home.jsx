import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

const images = require.context('../assets/images/home', true, /\.svg|png|jpg$/);
const Home = () => {
    const history = useHistory();
    const importAll = images.keys().map(images);
    console.log(importAll);
    const [routeImages,_] = useState([
        {
            image: importAll[0].default,
            header: 'Books',
            desc: 'Navigates to a library of books to be sold at a low cost.'
        },
        {
            image: importAll[1].default,
            header: 'Cart',
            desc: 'A list of submitted books to be ordered. This navigates to a component where authrozed payment for the order.'
        },
        {
            image: importAll[2].default,
            header: 'About',
            desc: `Hi! I am Rineria, This is my personal website for selling used books that I have read in a reasonable low prices.

Most genres are non-fiction, philosophy, some fictions and more`
        }, {
            image: '',
            header: 'Github',
            desc: `user: law911012eqw

        Rineria © 2021`
        }

    ]);
    //Added onclick functionality for each accessible component including external links
    useEffect(() => {
        const homecard = [...document.getElementsByClassName('homecard')];
        homecard.forEach(element => {
            element.onclick = (e) => {
                e.stopPropagation();
                if (e.target.id === 'books') {
                    history.push('/Books');
                } else if (e.target.id === 'cart') {
                    history.push('/Cart');
                } else if (e.target.id === 'github') {
                    window.location.replace('https://github.com/law911012eqw/shopping-cart');
                }
            }
        });

    }, [history])
    const homeCard = routeImages.map((prop, i) => {
        return (
            <div
                id={[...prop.header].map(x => x === x.toUpperCase() ? x.toLowerCase() : x).join('')}
                className='homecard'
                key={i}
                style={{
                    backgroundImage: `url(${prop.image})`,
                    backgroundPosition: `45% 65%`
                }}>
                <div className="home-big-text">{prop.header}</div>
                <div className='blur-bg'>
                    <h1 className="homecard-header">{prop.header}</h1>
                    <h3 className="homecard-desc">{prop.desc}</h3>
                </div>
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