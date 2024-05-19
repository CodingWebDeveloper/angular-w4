import { Component, NgModule, QueryList, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrafficLightComponent, CommonModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'traffic-lights';
  failureTrafficLights: boolean = false;

  @ViewChildren(TrafficLightComponent) children!: QueryList<TrafficLightComponent>;
  
   startTrafficLights() {
    this.children.forEach(child => child.startTrafficLight());
  }

  startFailureTrafficLights() {
    this.failureTrafficLights = true;
    this.children.forEach(child => child.startFailureTrafficLight());

    setTimeout(() => {
      this.failureTrafficLights = false
    }, 10 * 1000);
  }
}
