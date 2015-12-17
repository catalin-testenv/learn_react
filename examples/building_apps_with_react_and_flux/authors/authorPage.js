'use strict';

import React from 'react';
import AuthorApi from '../api/authorApi';
import AuthorList from './authorList';
import { Link } from 'react-router';

var AuthorPage = React.createClass({
	getInitialState: function() {
		return {
			authors: []
		};
	},

	componentDidMount: function() {
		if (this.isMounted()) {
			this.setState({ authors: AuthorApi.getAllAuthors() });
		}
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