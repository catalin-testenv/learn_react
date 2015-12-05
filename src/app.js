
'use strict';

import 'babel-polyfill';
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;

// examples ... choose one

//import {play} from  '../examples/comments';
//import {play} from  '../examples/products';
//import {play} from  '../examples/products_react_link';
import {play} from  '../examples/author_quiz';

play();