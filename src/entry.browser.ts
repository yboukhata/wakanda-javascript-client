import 'core-js/fn/function/bind';
import 'core-js/fn/array/from';
import 'core-js/fn/array/is-array';
import 'core-js/fn/map';

import WakJSC from './wakjsc';
import BrowserHttpClient from './data-access/http/browser-http-client';

WakJSC.HttpClient = BrowserHttpClient;

var wakjsc = new WakJSC();

export = wakjsc; 
