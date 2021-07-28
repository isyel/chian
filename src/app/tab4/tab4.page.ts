import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  constructor(private router: Router) {}

  goToCards() {
    this.router.navigate(['/cards']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }
}
