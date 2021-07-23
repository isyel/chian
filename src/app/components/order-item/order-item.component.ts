import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Output() handleClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  emitClickEvent() {
    this.handleClick.emit();
  }
}
