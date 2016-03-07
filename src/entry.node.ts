import WakandaClient from './wakanda-client';
import NodeHttpClient from './data-access/http/node-http-client';

WakandaClient.HttpClient = NodeHttpClient;

export = WakandaClient;
