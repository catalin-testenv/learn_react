'use strict';

let React = require('react');
import { Link, IndexLink } from 'react-router';

let Header = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <a href="/play.html" className="navbar-brand">
                        <img src="examples/building_apps_with_react_and_flux/images/pluralsight-logo.png" />
                    </a>
                    <ul className="nav navbar-nav">
                        <li><IndexLink to="/play.html" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink></li>
                        <li><Link to="/play.html/authors" activeStyle={{fontWeight: 'bold'}}>Authors</Link></li>
                        <li><Link to="/play.html/about" activeStyle={{fontWeight: 'bold'}}>About</Link></li>
                        <li><Link to="/play.html/about-us" activeStyle={{fontWeight: 'bold'}}>About-us</Link></li>
                        <li><Link to="/play.html/undefined" activeStyle={{fontWeight: 'bold'}}>Undefined</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
});

export default Header;