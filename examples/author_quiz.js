'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

let Highlight = {
    componentDidMount () {
        let node = $(ReactDOM.findDOMNode(this));
        //node.slideUp();
        //node.slideDown();
    }
}

let Quiz = React.createClass({
    propTypes: {
        books: React.PropTypes.array.isRequired
    },
    render () {
        return (
            <div>
                {this.props.books.map(function (b) {
                    return <Book key={b} title={b} />;
                })}
            </div>
        );
    }
});

let Book = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },
    render () {
        return (
            <div>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
});

export function play () {
    ReactDOM.render(
        <Quiz books={['The lord of the rings', 'The Iliad']} />,
        document.getElementById('content')
    );
}