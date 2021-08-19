import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionsModel } from 'src/app/models/OptionsModel';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input() name: string;
  @Input() price: number;
  @Input() size: number;
  @Output() handleClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  emitClickEvent() {
    this.handleClick.emit();
  }
}
