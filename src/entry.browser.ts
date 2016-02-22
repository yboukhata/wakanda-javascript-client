import "babel-polyfill";
import WakJSC from './wakjsc';
import BrowserHttpClient from './data-access/http/browser-http-client';

WakJSC.HttpClient = BrowserHttpClient;

var wakjsc = new WakJSC();

module.exports = wakjsc;
