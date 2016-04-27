
'use strict';

import 'babel-polyfill';
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import _ from 'lodash';
window._ = _;

// examples ... choose one

// import {play} from  '../examples/comments';
import {play} from  '../examples/comments_flux';
//import {play} from  '../examples/products';
//import {play} from  '../examples/products_react_link';
//import {play} from  '../examples/author_quiz'; // has css/author_quiz.css dependency
//import {play} from  '../examples/building_apps_with_react_and_flux/main';

play();