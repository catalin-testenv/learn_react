'use strict';

let React = require('react');

let Header = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">
                        <img src="examples/building_apps_with_react_and_flux/images/pluralsight-logo.png" />
                    </a>
                    <ul className="nav navbar-nav">
                        <li><a href="/play.html#">Home</a></li>
                        <li><a href="/play.html#about">About</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
});

export default Header;