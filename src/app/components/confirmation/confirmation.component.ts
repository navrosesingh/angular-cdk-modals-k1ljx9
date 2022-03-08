import { Component, OnInit, Inject } from '@angular/core';
import { ConfirmationModalData } from '../../interfaces/confirmation-modal-data';
import { CONFIRMATION_MODAL_DATA } from '../../tokens/confirmation-data.token';
import { ConfirmationModalOverlayRef } from '../../classes/confirmation-modal.ref';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: ConfirmationModalOverlayRef,
    @Inject(CONFIRMATION_MODAL_DATA) public data: any
  ) { }

  ngOnInit() {
  }


  public closeModal($event) {
    this.dialogRef.events.next({
        type: 'close',
        data: null
      });
  }

  public confirmModal($event) {
    this.dialogRef.events.next({
        type: 'confirm',
        data: this.data
      });
  }
}