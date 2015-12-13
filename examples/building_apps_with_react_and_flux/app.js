'use strict';

import React from 'react';
import Header from './common/header';
import ReactRouter from 'react-router';

const RouteHandler = ReactRouter.RouteHandler;

const App = React.createClass({
	render: function() {
		return (
			<div>
				<Header/>
				<div className="container-fluid">
					<RouteHandler/>
				</div>
			</div>
		);
	}
});

module.exports = App;