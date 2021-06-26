import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  icon = 'arrow-back';
  hasBackButton = true;
  pageTitle: string;
  hasPageTitle: boolean;

  constructor() {}

  ngOnInit() {}
}
