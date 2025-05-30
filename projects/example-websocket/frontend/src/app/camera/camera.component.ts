import { Component, ViewChild, ElementRef } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-camera',
  imports: [],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent {
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  intervalId: any;

  constructor(private wsService: WebSocketService) {}

  ngAfterViewInit() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoRef.nativeElement.srcObject = stream;
      })
      .catch((err) => console.error('Camera access denied:', err));
  }

  startStreaming() {
    this.wsService.connect();

    this.intervalId = setInterval(() => {
      const canvas = document.createElement('canvas');
      canvas.width = this.videoRef.nativeElement.videoWidth;
      canvas.height = this.videoRef.nativeElement.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(this.videoRef.nativeElement, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg');

      this.wsService.sendFrame(base64Image);
    }, 1000 / 15); // 15 fps
  }

  stopStreaming() {
    clearInterval(this.intervalId);
    this.wsService.disconnect();

    setTimeout(() => this.startStreaming(), 500);
  }


}
