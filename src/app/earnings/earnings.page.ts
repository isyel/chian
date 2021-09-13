import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.page.html',
  styleUrls: ['./earnings.page.scss'],
})
export class EarningsPage implements OnInit {
  dates = [
    { date: '25', month: 'july' },
    { date: '26', month: 'july' },
    { date: '27', month: 'july', active: true },
    { date: '28', month: 'july' },
    { date: '29', month: 'july' },
  ];
  earnings = [];

  constructor() {}

  ngOnInit() {}
}
