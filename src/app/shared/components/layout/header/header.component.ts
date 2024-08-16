import { Component, HostListener, Input } from '@angular/core';
import {
  languages,
  notifications,
  userItems,
} from '../../../utils/global-constants.util';
import { NgClass } from '@angular/common';
import { CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, CdkMenuTrigger],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;
  selectedLanguage: any;

  languages = languages;
  notifications = notifications;
  userItems = userItems;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.selectedLanguage = this.languages[0];
  }

  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }

    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }
}
