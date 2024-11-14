import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-item',
  templateUrl: './button-item.component.html',
  styleUrl: './button-item.component.scss'
})
export class ButtonItemComponent {
 @Input() route!: any;
 @Input() icon!: any;
 @Input() name!: string;
 @Input() cssClass!: string;
 @Input() activeClass!: string;

}
