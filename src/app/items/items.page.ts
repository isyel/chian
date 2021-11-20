import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OptionsModel } from '../models/OptionsModel';
import { NavparamService } from '../services/navparam/navparam.service';
import { OptionsService } from '../services/options/options.service';
import { UserData } from '../user-data';
import { CommonMethods } from '../util/common';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  options: OptionsModel[];
  activeTab = 0;

  constructor(
    private router: Router,
    private optionsService: OptionsService,
    private userData: UserData,
    private commonMethods: CommonMethods,
    private navParamService: NavparamService
  ) {}

  async ngOnInit() {
    this.options = await this.userData.getOptions();
    this.getLiveOptions();
  }

  orderItem(option) {
    this.navParamService.navData = option;
    this.router.navigate(['/order']);
  }

  switchTab(tab) {
    this.activeTab = tab;
  }

  getLiveOptions() {
    this.optionsService.getAll().subscribe(
      (result) => {
        this.options = result.data?.data;
        this.userData.setOptions(this.options);
      },
      (error) => {
        console.error(error);
        this.commonMethods.presentToast('Network or Server Error', false);
      }
    );
  }
}
