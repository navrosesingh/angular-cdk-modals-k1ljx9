import { Component, ViewChild } from '@angular/core';
import { ComponentModalService } from './services/component-modal.service';
import { FormModalOverlayRef } from './classes/form-modal.ref';
import { FormModalComponent } from './components/form-modal/form-modal.component';

import { TemplateModalOverlayRef } from './classes/template-modal.ref';
import { TemplateModalService } from './services/template-modal.service';

import { ConfirmationModalService } from './services/confirmation-modal.service';
import { ConfirmationModalOverlayRef } from './classes/confirmation-modal.ref';

import { TemplatePortal } from '@angular/cdk/portal';

import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public name = 'Angular 6 CDK Modals';
  public confirmationRef: ConfirmationModalOverlayRef;  
  private templateRef: TemplateModalOverlayRef;

  @ViewChild('modalTemplate') modalTemplate: TemplatePortal<any>;
  @ViewChild('modalSimpleTemplate') modalSimpleTemplate: TemplatePortal<any>;

  constructor(
    private templateModalService: TemplateModalService, 
    private componentModalService: ComponentModalService, 
    private confirmationModalService: ConfirmationModalService
    //private store: Store<State>
    ) {}

  public openFormModal() {
    const dialogRef: FormModalOverlayRef = this.componentModalService.open<FormModalComponent>(FormModalComponent);
  }
  
  openConfirmationModal() {
    this.confirmationRef = this.confirmationModalService.open({
      data: {
        action: 'delete this section'
      }
    });

    this.confirmationRef.events.pipe(
      filter((event) => !!event),
      filter((event) => {
        return event.type === 'confirm' || event.type === 'close';
      }),
      take(1)
    ).subscribe((events) => {
      switch (events.type) {
        case 'confirm':
          console.log('confirmed action, proceed');
          this.confirmationRef.close();
        break;
        case 'close':
          console.log('close modal');
          this.confirmationRef.close();
        break;
      }
    });
  }
  public openTemplateModal() {
    this.templateRef = this.templateModalService.open(this.modalTemplate, {}, {
      hasBackdropClick: true
    });
  }

   public openSimpleTemplateModal() {
    this.templateRef = this.templateModalService.open(this.modalSimpleTemplate, {}, {
      hasBackdropClick: true
    });
  }

  public closeTemplateModal($event) {
    this.templateRef.close();
  }
}
