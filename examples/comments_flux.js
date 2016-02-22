'use strict';

// ======================== FLUX section ==============================

import Dispatcher from './building_apps_with_react_and_flux/dispatcher/appDispatcher';
import EventEmitter from 'events';

// helper
function  _clone(item) {
    //return cloned copy so that the item is passed by value instead of by reference
    return JSON.parse(JSON.stringify(item));
}

// ================== Service/API section
// - called by Actions
// - talks to server
const CommentApi = {
    comments: [],

    getAllComments(callback) {
        $.ajax({
            url: '/data/comments.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.comments = data;
                callback(_clone(this.comments));
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('/data/comments.json', status, err.toString());
            }.bind(this)
        });
    },

    createComment(comment, callback) {
        //pretend an ajax call to web api is made here
        console.log('Pretend this just saved the comment to the DB via AJAX call...');
        this.comments.push(_clone(comment));
        callback(_clone(comment)) ;
    },
};


// ============== Actions section
// - called by React Components / or by  the server
// - eventually trigger Service/API (CRUD ops)
// - then dispatches events to registered stores
//   so they can update their internal state with event.data

const CommentActions = {
    initApp() {
        CommentApi.getAllComments((allComments) => {
            //Hey dispatcher, go tell all the stores that all comments were retrieved.
            Dispatcher.dispatch({
                actionType: 'INITIAL_DATA_AVAILABLE',
                initialData: {
                    comments: allComments
                }
            });
        });
    },

    createComment(comment) {
        CommentApi.createComment(comment, (newComment) => {
            //Hey dispatcher, go tell all the stores that a comment was created.
            Dispatcher.dispatch({
                actionType: 'CREATE_COMMENT',
                comment: newComment
            });
        });
    },
};


// ================== Comments Store Section
// - listens for events from Dispatcher - events caused by Actions
//      which are triggered by React Components (or server)
//      and updates internal state with event.data
// - then emit 'change' event, further processed by subscribed React Components

// React Components can only READ from CommentStore. Observe: only getters here
// React Components cannot WRITE directly to Store
//     They only can trigger Actions,
//     which in turn will dispatch events to all subscribed Stores

// make it SINGLETON instance
// this singleton class will be actually exported from its module
// export default new CommentStore(); # (like Dispatcher)

const CommentStore = new (class CommentStore extends EventEmitter {

    constructor() {
        super();
        this._commentsStorePrivateData = [];
        this._onAction = this._onAction.bind(this);
        Dispatcher.register(this._onAction);
    }

    // FLUX boilerplate
    addChangeListener(callback) {
        this.on('change', callback);
    }

    // FLUX boilerplate
    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

    // FLUX boilerplate
    emitChange() {
        this.emit('change');
    }

    // Store CRUD actions. This is store private logic.
    // - register for events caused by Actions
    _onAction(action) {
        switch(action.actionType) {
            case 'INITIAL_DATA_AVAILABLE':
                this._commentsStorePrivateData = action.initialData.comments;
                this.emitChange();
                break;
            case 'CREATE_COMMENT':
                this._commentsStorePrivateData.push(action.comment);
                this.emitChange();
                break;
            default:
            // no op
        }
    }

    // GETTER
    getAllComments() {
        return _clone(this._commentsStorePrivateData);
    }
})();


// ======================== React section ==============================

import React from 'react';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
    render() {
        return (
            <div className="comment">
                <h4 className="commentAuthor">
                    {this.props.author}
                </h4>
                {this.props.children}
            </div>
        );
    }
}

class CommentList extends React.Component {
    render() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}

class CommentForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {author: '', text: ''};
    }
    handleAuthorChange(e) {
        this.setState({author: e.target.value});
    }
    handleTextChange(e) {
        this.setState({text: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    }
    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange.bind(this)}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange.bind(this)}
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
}

// Controller-View
// Listen for Store Events
// READS from Store getters and updates internal state
// ~WRITES through actions to Store
class CommentBox extends React.Component {
    // *** FLUX changes
    constructor(props) {
        super(props);
        this.state = {data: CommentStore.getAllComments()};
        this._onChange = this._onChange.bind(this);
    }

    // FLUX boilerplate
    componentWillMount () {
        // listen for change event
        CommentStore.addChangeListener(this._onChange);
        // trigger an Action which will get data from Server
        // then inside Action an Event is dispatched which the Store listens for
        // making the Store update its internal state with dispatched Event.<data>
        // and emit another 'change' Event which we (Component) listen for
        CommentActions.initApp();
    }

    // FLUX boilerplate
    // Clean up when this component is unmounted
    componentWillUnmount() {
        CommentStore.removeChangeListener(this._onChange);
    }

    // *** FLUX changes
    _onChange() {
        // refresh internal state with data from the Store
        this.setState({ data: CommentStore.getAllComments() });
    }

    // *** FLUX changes
    handleCommentSubmit(comment) {
        comment.id = Date.now();
        CommentActions.createComment(comment);
    }

    render() {
        return (
            <div className="commentBox">
                <h3>Comments</h3>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
            </div>
        );
    }
}

class CommentsCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {comments: CommentStore.getAllComments()};
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount () {
        CommentStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CommentStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({ comments: CommentStore.getAllComments() });
    }

    render() {
        return (
            <div className="commentsCount">
                <h3>Comments {this.state.comments.length}</h3>
            </div>
        );
    }
}

export function play () {
    let placeholder = document.getElementById('content');
    let secondary = document.getElementById('secondary');
    ReactDOM.render(<CommentBox url="/data/comments.json" />, placeholder);
    ReactDOM.render(<CommentsCounter />, secondary);
}