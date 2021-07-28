import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    public modalController: ModalController,
    private router: Router
  ) {}

  goToItemsPage() {
    this.router.navigate(['/items']);
  }

  goToCartPage() {
    this.router.navigate(['/cart']);
  }

  viewDetails() {
    this.router.navigate(['/order-details']);
  }
}
