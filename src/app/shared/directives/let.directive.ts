import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

interface LetContext<T> {
  dpsLet: T;
}

@Directive({
  selector: '[dpsLet]'
})
export class LetDirective<T> {

  private _context: LetContext<T> = { dpsLet: null };

  constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<LetContext<T>>) {
    _viewContainer.createEmbeddedView(_templateRef, this._context);
  }

  @Input()
  set dpsLet(value: T) {
    this._context.dpsLet = value;
  }

}
