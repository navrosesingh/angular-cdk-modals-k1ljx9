import { NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';

import { AppComponent } from './app.component';
import { ComponentModalService } from './services/component-modal.service';
import { ConfirmationModalService } from './services/confirmation-modal.service';
import { TemplateModalService } from './services/template-modal.service';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule,  
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    OverlayModule,
    PlatformModule,
    ObserversModule,
    PortalModule
  ],
  declarations: [ 
    AppComponent, 
    ConfirmationComponent, 
    FormModalComponent, 
    CustomModalComponent 
    ],
  bootstrap:    [ AppComponent ],
  providers: [
    ComponentModalService, 
    ConfirmationModalService, 
    TemplateModalService
  ],
  entryComponents: [
    FormModalComponent,
    ConfirmationComponent
  ]
})
export class AppModule { }
