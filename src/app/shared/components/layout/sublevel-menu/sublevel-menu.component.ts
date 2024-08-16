import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { fadeInOutAnimation } from '../../../animations/fade-in-out.animation';
import { sublevelMenuAnimation } from '../../../animations/sublevel-menu.animation';
import { INavbarData } from '../../../models/layout/navbar-data.interface';

@Component({
  selector: 'app-sublevel-menu',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sublevel-menu.component.html',
  styleUrls: ['./../sidebar/sidebar.component.scss'],
  animations: [fadeInOutAnimation, sublevelMenuAnimation],
})
export class SublevelMenuComponent {
  private readonly router = inject(Router);

  @Input() data: INavbarData = {
    path: '',
    icon: '',
    label: '',
    items: [],
  };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let subItem of this.data.items) {
          if (item !== subItem && subItem.expanded) {
            subItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url.includes(item.path)
      ? 'active-sublevel'
      : '';
  }
}
