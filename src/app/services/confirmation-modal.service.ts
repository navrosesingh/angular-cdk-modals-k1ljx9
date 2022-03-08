import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';

import { ConfirmationModalOverlayRef } from '../classes/confirmation-modal.ref';
import { ConfirmationModalData } from '../interfaces/confirmation-modal-data';
import { CONFIRMATION_MODAL_DATA } from '../tokens/confirmation-data.token';

import { ConfirmationComponent } from '../components/confirmation/confirmation.component'


interface ConfirmationModalConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: ConfirmationModalData;
}

const DEFAULT_CONFIG: ConfirmationModalConfig = {
  hasBackdrop: true,
  backdropClass: 'my-overlay-modal-backdrop',
  panelClass: 'my-confirmation-panel'
};


@Injectable()
export class ConfirmationModalService {
  public dialogRef: ConfirmationModalOverlayRef;
  constructor(
    private injector: Injector,
    private overlay: Overlay
  ) { }

  open(config: ConfirmationModalConfig = {}) {
    // Returns an OverlayRef (which is a PortalHost)
    const modalConfig = { ...DEFAULT_CONFIG, ...config };
    const overlayRef = this.createOverlay(modalConfig);
    const dialogRef = new ConfirmationModalOverlayRef(overlayRef);

    const overlayComponent = this.attachModalContainer(overlayRef, modalConfig, dialogRef);

    this.dialogRef = dialogRef;
    return dialogRef;
  }

  private attachModalContainer(overlayRef: OverlayRef, config: ConfirmationModalConfig, dialogRef: ConfirmationModalOverlayRef) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(ConfirmationComponent, null, injector);
    const containerRef: ComponentRef<ConfirmationComponent> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  private createInjector(config: ConfirmationModalConfig, dialogRef: ConfirmationModalOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(ConfirmationModalOverlayRef, dialogRef);
    injectionTokens.set(CONFIRMATION_MODAL_DATA, config.data);
    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: ConfirmationModalConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: ConfirmationModalConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }
}
