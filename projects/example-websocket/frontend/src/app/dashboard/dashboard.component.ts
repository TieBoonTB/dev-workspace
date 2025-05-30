import { Component } from '@angular/core';
import { CameraComponent } from "../camera/camera.component";

@Component({
  selector: 'app-dashboard',
  imports: [CameraComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
