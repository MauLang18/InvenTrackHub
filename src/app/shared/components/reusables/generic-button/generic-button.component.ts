import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { GenericButton } from '../../../models/reusables/generic-button.interface';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [MatIcon, MatTooltip],
  templateUrl: './generic-button.component.html',
})
export class GenericButtonComponent {
  @Input() infoButton!: GenericButton;
  @Output() clickButton = new EventEmitter();
}
