import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-screen',
  templateUrl: './slide-screen.component.html',
  styleUrls: ['./slide-screen.component.scss'],
})
export class SlideScreenComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() image: string;

  constructor() {}

  ngOnInit() {}
}
