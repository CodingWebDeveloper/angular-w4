import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-traffic-light',
  standalone: true,
  imports: [],
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.scss'
})
export class TrafficLightComponent implements OnInit, OnDestroy {
  @Input() direction!: "vertical" | "horizontal";
  @Input() reversed!: boolean;
  @Input() startIndex!: number;
  @Input() isFailure!: boolean;

  light: string = 'red';
  private lightSequence: string[] = ['red', 'yellow', 'green'];
  private lightDurations: { [key: string]: number } = {
    red: 3000,    // 3 seconds
    yellow: 2000,  // 2 seconds
    green: 3000,  // 3 seconds
  };
  private currentIndex: number = 0;
  private increment: number = 1;
  private timeoutId: any;

  constructor(public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.currentIndex = this.startIndex;
    this.light = this.lightSequence[this.currentIndex];
  }

  startTrafficLight() {
    this.changeLight();
  }

  startFailureTrafficLight() {
    clearTimeout(this.timeoutId);
    this.failureTrafficLight();

  }

  failureTrafficLight() {
    this.light = "yellow";
    setTimeout(() => {
      this.startTrafficLight();
    }, 10 * 1000);
  }

  changeLight() {
    this.light = this.lightSequence[this.currentIndex];
    this.timeoutId = setTimeout(() => {

      if(this.currentIndex === this.lightSequence.length -1) {
        this.increment = -1;
      }

      if(this.currentIndex === 0) {
        this.increment = 1;
      }
      
      this.currentIndex+= this.increment;
      this.changeLight();
    }, this.lightDurations[this.light]);
  }

  cross() {
    if(this.light === "yellow") {
      this.snackBar.open("Wrong crossing", undefined, {
        duration: 500,
      });
    }

    if(this.light === "green") {
      console.log("Successful crossing");
    }
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
