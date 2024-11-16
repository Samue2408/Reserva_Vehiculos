import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-background',
  templateUrl: './animated-background.component.html',
  styleUrls: ['./animated-background.component.scss']
})
export class AnimatedBackgroundComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.startAnimation();
  }

  private startAnimation(): void {
    const shapes = document.querySelectorAll('.square, .circle, .triangle');

    shapes.forEach((shape) => {
      this.animateShape(shape as HTMLElement);
    });
  }

  private animateShape(shape: HTMLElement): void {
    const getRandomValue = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const moveShape = () => {
      const x = getRandomValue(-500, 500);
      const y = getRandomValue(-300, 300);
      const rotation = getRandomValue(0, 360);
      const scale = getRandomValue(0.5, 2);

      shape.style.transform = `
        translate(${x}px, ${y}px)
        rotate(${rotation}deg)
        scale(${scale})
      `;

      setTimeout(moveShape, getRandomValue(1000, 3000));
    };

    moveShape();
  }
}
