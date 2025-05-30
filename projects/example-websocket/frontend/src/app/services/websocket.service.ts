import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket!: WebSocket;

  connect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.warn("WebSocket already connected");
      return;
    }

    this.socket = new WebSocket('ws://localhost:8000/ws/stream');

    this.socket.onopen = () => console.log('WebSocket connected');
    this.socket.onerror = (error) => console.error('WebSocket error:', error);
    this.socket.onclose = () => console.log('WebSocket disconnected');
  }

  sendFrame(base64Image: string) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(base64Image);
    }
  }

disconnect() {
  if (this.socket && this.socket.readyState === WebSocket.OPEN) {
    this.socket.close();
  }
  this.socket = undefined!;
}
}
