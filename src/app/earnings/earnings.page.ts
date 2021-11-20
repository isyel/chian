import { Component, OnInit } from '@angular/core';
import { EarningsModel } from '../models/EarningsModel';
import { UserData } from '../user-data';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.page.html',
  styleUrls: ['./earnings.page.scss'],
})
export class EarningsPage implements OnInit {
  dates = [
    { date: 25, month: 'july' },
    { date: 26, month: 'july' },
    { date: 27, month: 'july', active: true },
    { date: 28, month: 'july' },
    { date: 29, month: 'july' },
  ];
  earnings: EarningsModel;

  constructor(private userData: UserData) {}

  async ngOnInit() {
    const userData = await this.userData.getUserData();
    this.earnings = userData.earnings;
  }

  selectDate(date: number) {
    this.dates = this.dates.map((singleDate) =>
      singleDate.date === date
        ? { ...singleDate, active: true }
        : { ...singleDate, active: false }
    );
  }
}
