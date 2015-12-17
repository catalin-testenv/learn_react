'use strict';

/*
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
*/


import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { createHistory, createHashHistory } from 'history/lib';

import Header from './common/header';
import AuthorPage from './authors/authorPage';
import ManageAuthorPage from './authors/manageAuthorPage';
import AboutPage from './about/aboutPage';
import HomePage from './homePage';
import NotFoundPage from './notFoundPage';

const App = React.createClass({
    render: function() {
        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

var Routes = (
    <Router history={createHistory()}>
        <Route path="/play.html" component={App}>
            <IndexRoute component={HomePage} onLeave={() => {}} onEnter={(location, replaceWith) => {}} />
            <Route path="/play.html/authors" component={AuthorPage} />
            <Route path="/play.html/author" onLeave={() => {}} component={ManageAuthorPage} />
            <Route path="/play.html/author/:id" component={ManageAuthorPage} />
            <Route path="/play.html/about" component={AboutPage} />
            <Redirect from="/play.html/about/*" to="about" />
            <Redirect from="/play.html/awthurs" to="authors" />
            <Redirect from="/play.html/about-us" to="about" />
            <Route path='/play.html/*' component={NotFoundPage} />
        </Route>
    </Router>
);

export function play () {
    render(Routes, document.getElementById('content'));
}

