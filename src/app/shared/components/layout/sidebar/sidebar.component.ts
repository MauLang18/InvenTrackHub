import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SublevelMenuComponent } from '../sublevel-menu/sublevel-menu.component';
import { fadeInOutAnimation } from '../../../animations/fade-in-out.animation';
import { ISidebarToggle } from '../../../models/layout/sidebar-toggle.interface';
import {
  INavbarData,
  navbarData,
} from '../../../models/layout/navbar-data.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, NgIf, RouterLink, RouterLinkActive, SublevelMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [fadeInOutAnimation],
})
export class SidebarComponent {
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  @Output() onToggleSideNav: EventEmitter<ISidebarToggle> = new EventEmitter();
  collapsed: boolean = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.path) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let subItem of this.navData) {
        if (item !== subItem && subItem.expanded) {
          subItem.expanded = false;
        }
      }
    }
  }
}
