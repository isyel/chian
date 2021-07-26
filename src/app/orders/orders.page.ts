import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  viewDetails() {
    this.router.navigate(['/order-details']);
  }
}
