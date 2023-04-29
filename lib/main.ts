#!/usr/bin/env node
import WebSocket from 'ws';

interface LogMessage {
  logger: string;
  level: string;
  method: string;
  uri: string;
  status: number;
  requestHeaders: object;
  requestPayload: object;
  responseHeaders: object;
  responsePayload: object;
}

interface ErrorMessage {
  logger: string;
  level: string;
  uri: string;
  message: string;
  requestHeaders: object;
  requestPayload: object;
  responseHeaders: object;
  responsePayload: object;
}

export default async function main() {
  try {
    const socket = new WebSocket('ws://splitscale.systems:8081/logs/ws');

    socket.addEventListener('open', () => {
      console.log('WebSocket connected');
    });

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data.toString());

      if (message.level === 'INFO') {
        const logMessage: LogMessage = {
          logger: message.logger,
          level: message.level,
          method: message.method,
          uri: message.uri,
          status: message.status,
          requestHeaders: message.requestHeaders,
          requestPayload: message.requestPayload,
          responseHeaders: message.responseHeaders,
          responsePayload: message.responsePayload,
        };
        console.log('INFO', logMessage);
      } else if (message.level === 'ERROR') {
        const errorMessage: ErrorMessage = {
          logger: message.logger,
          level: message.level,
          uri: message.uri,
          message: message.message,
          requestHeaders: message.requestHeaders,
          requestPayload: message.requestPayload,
          responseHeaders: message.responseHeaders,
          responsePayload: message.responsePayload,
        };
        console.log('ERROR', errorMessage);
      }
    });

    socket.addEventListener('error', (error) => {
      console.error(error.message);
    });
  } catch (error) {
    console.error(error);
  }
}
