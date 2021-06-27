import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() icon = 'chevron-back';
  @Input() hasBackButton = true;
  @Input() pageTitle: string;
  @Input() hasPageTitle = true;
  @Input() hasNotifications: boolean;

  constructor() {}

  ngOnInit() {}
}
