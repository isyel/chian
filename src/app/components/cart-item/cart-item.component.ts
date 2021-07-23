import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() quantity: number;
  @Input() item: any;
  @Output() handleRemove: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  emitClickEvent() {
    this.handleRemove.emit();
  }
}
