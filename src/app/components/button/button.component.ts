import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  buttonText: string;
  classModifier: string;
  iconName: string;

  constructor() {}

  ngOnInit() {}
}
