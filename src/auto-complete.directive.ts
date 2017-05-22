import {
  ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, Input, ViewContainerRef
} from '@angular/core';
import { AutoCompleteComponent } from './auto-complete.component';
import { isUndefined } from 'util';

@Directive({
  selector: '[baseAutoComplete]'
})
export class AutoCompleteDirective {

  @Input() source: Array<Object>;
  @Input() ngModel: string;

  private component: AutoCompleteComponent;
  private componentRef: ComponentRef<AutoCompleteComponent>;

  constructor (private componentFactoryResolver: ComponentFactoryResolver, public viewContainerRef: ViewContainerRef) {}

  ngOnChanges (changes): void {
    if (!isUndefined(changes.ngModel.currentValue)) {
      this.component || this.create();
      this.component.searchQuery = changes.ngModel.currentValue;
      changes.ngModel.currentValue.length || this.destroy();
    }
  }

  private create () {
    const factory: ComponentFactory<AutoCompleteComponent> = this.componentFactoryResolver.resolveComponentFactory(AutoCompleteComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.component = this.componentRef.instance;
    this.component.source = this.source;
  }

  private destroy () {
    this.componentRef.destroy();
    this.componentRef, this.component = undefined;
  }
}
