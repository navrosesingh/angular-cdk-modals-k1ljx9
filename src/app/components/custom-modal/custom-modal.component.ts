import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent implements OnInit {
  @Output() public close = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  public closeModal($event) {
    this.close.emit('close')
  }

}