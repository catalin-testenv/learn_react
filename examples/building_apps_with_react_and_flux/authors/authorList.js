'use strict';

import React from 'react';
import { Link } from 'react-router';
import AuthorActions from '../actions/authorActions';
import toastr from 'toastr';

var AuthorList = React.createClass({
	propTypes: {
		authors: React.PropTypes.array.isRequired
	},

	deleteAuthor: function(id, event) {
		event.preventDefault();
		AuthorActions.deleteAuthor(id);
		toastr.success('Author Deleted');
	},

	render: function() {
		var createAuthorRow = function(author) {
			return (
				<tr key={author.id}>
					<td><a href="#" onClick={this.deleteAuthor.bind(this, author.id)}>Delete</a></td>
					<td><Link to={'/play.html/author/' + author.id}>{author.id}</Link></td>
					<td>{author.firstName} {author.lastName}</td>
				</tr>
			);
		};

		return (
			<div>
				<table className="table">
					<thead>
					<tr>
						<th></th>
						<th>ID</th>
						<th>Name</th>
					</tr>
					</thead>
					<tbody>
						{this.props.authors.map(createAuthorRow, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

export default AuthorList;