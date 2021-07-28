import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  addCardMode = false;
  addCardForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addCardForm = this.formBuilder.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required]],
      validDate: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {}

  switchMode() {
    this.addCardMode = !this.addCardMode;
  }

  handleAddCard() {}
}
