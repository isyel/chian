import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/OrderModel';
import { NavparamService } from '../services/navparam/navparam.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  order: OrderModel;
  constructor(
    private router: Router,
    private navParamService: NavparamService
  ) {}

  ngOnInit() {
    this.order = this.navParamService.navData;
  }

  goToCheckout() {
    this.router.navigate(['/payment']);
  }

  removeFromCart() {}
}
