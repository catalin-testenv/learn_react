

var CommentBox = React.createClass({
    propTypes: {
        url:   React.PropTypes.string.isRequired,
        pollInterval: React.PropTypes.number,
    },
    getInitialState: function() {
        return {data: []};
    },
    loadCommentsFromServer: function() {
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
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        //$.ajax({
        //    url: this.props.url,
        //    dataType: 'json',
        //    type: 'POST',
        //    data: comment,
        //    success: function(data) {
        //        this.setState({data: data});
        //    }.bind(this),
        //    error: function(xhr, status, err) {
        //        console.error(this.props.url, status, err.toString());
        //    }.bind(this)
        //});
    },
    handleCommentDelete: function (author) {
        var comments = this.state.data;
        comments = comments.filter(function (comment) {
            return comment.author != author;
        });
        this.setState({data: comments});
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList onCommentDelete={this.handleCommentDelete} data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    propTypes: {
        onCommentDelete:   React.PropTypes.func.isRequired,
    },
    handleCommentDelete: function (author) {
        this.props.onCommentDelete(author);
    },
    render: function() {
        function makeComment(comment) {
            return (
                <Comment onCommentDelete={this.handleCommentDelete} author={comment.author} key={comment.author}>
                    {comment.text}
                </Comment>
            );
        }
        return (
            <div className="commentList">
                {this.props.data.map(makeComment, this)}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    propTypes: {
        onCommentSubmit:   React.PropTypes.func.isRequired,
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var author = React.findDOMNode(this.refs.author).value.trim();
        var text = React.findDOMNode(this.refs.text).value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        React.findDOMNode(this.refs.author).value = '';
        React.findDOMNode(this.refs.text).value = '';
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author"  />
                <input type="text" placeholder="Say something..." ref="text"  />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var Comment = React.createClass({
    propTypes: {
        onCommentDelete:   React.PropTypes.func.isRequired,
    },
    handleDelete: function(e){
        e.preventDefault();
        this.props.onCommentDelete(this.props.author);
    },
    render: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <a href="#" onClick={this.handleDelete}>delete</a>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});

React.render(
    <CommentBox url="data/comments.json" pollInterval={2000} />,
    document.getElementById('content')
);