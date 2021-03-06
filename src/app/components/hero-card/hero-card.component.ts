import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
})
export class HeroCardComponent implements OnInit {
  @Input() dark = false;
  @Input() radiusBottom = true;
  @Input() radiusTop = true;

  constructor() {}

  ngOnInit() {}
}
