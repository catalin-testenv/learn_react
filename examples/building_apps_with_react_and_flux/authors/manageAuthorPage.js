'use strict';

import React from 'react';
import {History, Lifecycle} from 'react-router';
import AuthorForm from './authorForm';
import AuthorApi from '../api/authorApi';
import toastr from 'toastr';


const ManageAuthorPage = React.createClass({

	mixins: [ History, Lifecycle ],

	getInitialState: function() {
		return {
			author: { id: '', firstName: '', lastName: '' },
			errors: {},
			dirty: false
		};
	},

	routerWillLeave: function(){
		if(this.state.dirty && !confirm('Leave without saving?')) {
			return false;
		}
	},

	setAuthorState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.author[field] = value;
		return this.setState({author: this.state.author});
	},

	authorFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous errors.

		if (this.state.author.firstName.length < 3) {
			this.state.errors.firstName = 'First name must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.author.lastName.length < 3) {
			this.state.errors.lastName = 'Last name must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveAuthor: function(event) {
		event.preventDefault();

		if (!this.authorFormIsValid()) {
			return;
		}

		AuthorApi.saveAuthor(this.state.author);
		this.setState({dirty: false});
		toastr.success('Author saved.');
		this.history.pushState(null, '/play.html/authors');
	},

	render: function() {
		return (
			<AuthorForm
				author={this.state.author}
				onChange={this.setAuthorState}
				onSave={this.saveAuthor}
				errors={this.state.errors}
			/>
		);
	}
});

export default ManageAuthorPage;