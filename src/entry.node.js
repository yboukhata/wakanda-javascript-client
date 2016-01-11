import WakJSC from './wakjsc';
import NodeHttpClient from './data-access/http/node-http-client';

WakJSC.HttpClient = NodeHttpClient;

module.exports = WakJSC;
