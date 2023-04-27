#!/usr/bin/env node
import WebSocket from 'ws';

export default async function main() {
  try {
    const socket = new WebSocket('ws://splitscale.systems:8081/logs/ws');

    socket.addEventListener('open', () => {
      console.log('WebSocket connected');
    });

    socket.addEventListener('message', (event) => {
      console.log(event.data);
    });

    socket.addEventListener('error', (error) => {
      console.error(error.message);
    });
  } catch (error) {
    console.error(error);
  }
}
