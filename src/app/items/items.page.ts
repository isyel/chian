import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  orderItem() {
    console.log('in order item');

    this.router.navigate(['/order']);
  }
}
