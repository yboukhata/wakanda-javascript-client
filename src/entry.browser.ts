import 'core-js/fn/function/bind';
import 'core-js/fn/array/from';
import 'core-js/fn/array/is-array';
import 'core-js/fn/map';
import 'core-js/fn/promise';

import WakandaClient from './wakanda-client';
import BrowserHttpClient from './data-access/http/browser-http-client';

WakandaClient.HttpClient = BrowserHttpClient;

export {WakandaClient}; 
