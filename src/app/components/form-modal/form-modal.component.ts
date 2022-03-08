import { Component, OnInit } from '@angular/core';
import { FormModalOverlayRef } from '../../classes/form-modal.ref';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: FormModalOverlayRef,
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    if(this.form.valid) {
      console.log('form is valid, save it...');
      this.dialogRef.close();
    }
  }

  cancel() {
    this.form.reset();
    this.dialogRef.close();
  }

}