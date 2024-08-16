import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';

    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-origin';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md';
    }

    return styleClass;
  }
}
