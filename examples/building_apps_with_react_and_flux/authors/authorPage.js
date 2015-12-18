'use strict';

import React from 'react';
import AuthorActions from '../actions/authorActions';
import AuthorStore from '../stores/authorStore';
import AuthorList from './authorList';
import { Link } from 'react-router';

var AuthorPage = React.createClass({
	getInitialState: function() {
		return {
			authors: AuthorStore.getAllAuthors()
		};
	},

	componentWillMount: function() {
		AuthorStore.addChangeListener(this._onChange);
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		AuthorStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ authors: AuthorStore.getAllAuthors() });
	},

	render: function() {
		return (
			<div>
				<h1>Authors</h1>
				<Link to="/play.html/author" className="btn btn-default" activeStyle={{fontWeight: 'bold'}}>Add Author</Link>
				<AuthorList authors={this.state.authors} />
			</div>
		);
	}
});

export default AuthorPage;