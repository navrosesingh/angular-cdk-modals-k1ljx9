import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';

import { FormModalOverlayRef } from '../classes/form-modal.ref';



interface FormModalConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: FormModalConfig = {
  hasBackdrop: true,
  backdropClass: 'my-overlay-modal-backdrop',
  panelClass: 'my-modal-panel'
};

@Injectable()
export class ComponentModalService {
  public dialogRef: FormModalOverlayRef;
  constructor(
    private injector: Injector,
    private overlay: Overlay
  ) { }

  open<T>(component: ComponentType<T>, config: FormModalConfig = {}) {
    // Returns an OverlayRef (which is a PortalHost)
    const modalConfig = { ...DEFAULT_CONFIG, ...config };
    const overlayRef = this.createOverlay(modalConfig);
    const dialogRef = new FormModalOverlayRef(overlayRef);

    const overlayComponent = this.attachModalContainer<T>(overlayRef, modalConfig, dialogRef, component);

    this.dialogRef = dialogRef;
    return dialogRef;
  }

  // tslint:disable-next-line:max-line-length
  private attachModalContainer<T>(overlayRef: OverlayRef, config: FormModalConfig, dialogRef: FormModalOverlayRef, component: ComponentType<T>) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<T> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  private createInjector(config: FormModalConfig, dialogRef: FormModalOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(FormModalOverlayRef, dialogRef);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: FormModalConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: FormModalConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }
}
