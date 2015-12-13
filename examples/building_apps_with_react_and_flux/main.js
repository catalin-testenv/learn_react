'use strict';


import React from 'react';
import ReactDOM from 'react-dom';

import Home from './homePage';
import About from './about/aboutPage';
import Header from './common/header';
import Authors from './authors/authorPage';

let App = React.createClass({
    render() {
        let Child;
        switch (this.props.route) {
            case 'about': Child = About; break;
            case 'authors': Child = Authors; break;
            default: Child = Home;
        }

        return (
            <div>
                <Header />
                <Child />
            </div>
        );
    }
});

function render() {
    let route = window.location.hash.substr(1);
    ReactDOM.render(
        <App route={route} />,
        document.getElementById('content')
    );
}

window.addEventListener('hashchange', render);

export function play () {
    render();
}

/*
export function play () {

}
*/