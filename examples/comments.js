'use strict';

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
class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleCommentSubmit(comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
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

export function play () {
    let placeholder = document.getElementById('content');

    //ReactDOM.render(React.createElement(Comment, {author: 'myself'}, 'my comment'), placeholder);
    //ReactDOM.render(<Comment author="myself" >my comment</Comment>, placeholder);
    //ReactDOM.render(<CommentList data={[
    //  {"id":1, "author": "Pete Hunt", "text": "This is one comment"},
    //  {"id":2, "author": "Jordan Walke", "text": "This is *another* comment"}
    //]} />, placeholder);
    //ReactDOM.render(<CommentForm onCommentSubmit={(data)=>{console.log(data)}} />, placeholder);
    ReactDOM.render(<CommentBox url="/data/comments.json" />, placeholder);
}