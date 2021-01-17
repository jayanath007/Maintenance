import {
  Directive, Input, ElementRef, HostListener, OnDestroy, Output, EventEmitter, ViewContainerRef, ComponentRef,
  SimpleChanges, OnChanges
} from '@angular/core';
import {
  Overlay, ConnectionPositionPair, PositionStrategy,
  RepositionScrollStrategy, OverlayConfig, OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';

import { DateRangePickerComponent } from './date-range-picker.component';

export interface DpsDateRangeChange { fromDate: Date; toDate: Date; }

@Directive({
  selector: '[dpsDateRangePicker]'
})
export class DateRangePickerDirective implements OnDestroy, OnChanges {

  @Input() fromDate: Date;
  @Input() toDate: Date;

  @Output() datesChange: EventEmitter<DpsDateRangeChange> = new EventEmitter();

  private _overlayRef: OverlayRef;
  private okCancelbtnClick: Subscription;

  private _componentPortal: ComponentPortal<DateRangePickerComponent>;
  private _componentRef: ComponentRef<DateRangePickerComponent> | null;

  constructor(private elementRef: ElementRef<HTMLElement>, private overlay: Overlay, public viewContainerRef: ViewContainerRef) { }

  ngOnDestroy() {
    this.closeOverlay();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._componentRef) {
      if (changes.fromDate) {
        this._componentRef.instance._fromDate = changes.fromDate.currentValue;
      }
      if (changes.toDate) {
        this._componentRef.instance._toDate = changes.toDate.currentValue;
      }
    }
  }
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.toggleOverlay();
    if (this._componentRef) {
      this._componentRef.instance.refreshMatCalendars();
    }
    event.preventDefault();
    event.stopPropagation();

  }

  public showOverlay() {
    if (!this._overlayRef || !this._overlayRef.hasAttached()) {
      this._overlayRef = this.overlay.create(this.getOverlayConfig());
      this._componentPortal = new ComponentPortal(DateRangePickerComponent, this.viewContainerRef);
      this._componentRef = this._overlayRef.attach(this._componentPortal);
      this.setDateRange();
      this._overlayRef.backdropClick().subscribe(() => {
        this.setDateRange();
        this.closeOverlay();
      });
      if (this.okCancelbtnClick && !this.okCancelbtnClick.closed) {
        this.okCancelbtnClick.unsubscribe();
      }
      this.okCancelbtnClick = this._componentRef.instance.okCancelbtnClick.subscribe((btn) => {
        if (btn === 'Ok') {
          this.datesChange.emit({ fromDate: this._componentRef.instance._fromDate, toDate: this._componentRef.instance._toDate });
        } else {
          this.setDateRange();
        }
        this.closeOverlay();
      });

    } else {
      this._overlayRef.updatePosition();
    }
  }


  public closeOverlay() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.dispose();
    }
    if (this._componentPortal && this._componentPortal.isAttached) {
      this._componentPortal.detach();
    }
  }


  private setDateRange() {
    this._componentRef.instance._fromDate = this.fromDate;
    this._componentRef.instance._toDate = this.toDate;
  }

  private toggleOverlay() {
    if (!this._overlayRef || !this._overlayRef.hasAttached()) {
      this.showOverlay();
    } else if (this._overlayRef && this._overlayRef.hasAttached()) {
      this.closeOverlay();
    }
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      width: 'fit-content',
      height: 'fit-content',
      hasBackdrop: true,
      backdropClass: ['cdk-overlay-transparent-backdrop', 'dps-date-range-overlay-backdrop'],
      positionStrategy: this.getOverlayPosition(),
      scrollStrategy: this.getScrollStrategy(),
      disposeOnNavigation: true,
      panelClass: 'dps-date-range-overlay-pane'
    });
  }
  private getScrollStrategy(): RepositionScrollStrategy {
    const scrollStrategies = this.overlay.scrollStrategies.reposition();
    return scrollStrategies;
  }
  private getOverlayPosition(): PositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo(this.elementRef.nativeElement)
      .withPositions(this.getPositions())
      .withGrowAfterOpen(true)
      .withFlexibleDimensions(true)
      .withPush(false);
  }
  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
      },
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
      }
    ];
  }
}
