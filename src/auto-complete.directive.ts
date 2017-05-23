import {
    ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, HostBinding, HostListener, Input,
    ViewContainerRef
} from '@angular/core';
import { AutoCompleteComponent } from './auto-complete.component';
import { isUndefined } from 'util';

@Directive({
    selector: '[baseAutoComplete]'
})
export class AutoCompleteDirective {

    @Input() source: Array<Object>;
    @Input() ngModel: string;

    @HostBinding() value;
    @HostBinding('attr.data-id') dataId;

    private component: AutoCompleteComponent;
    private componentRef: ComponentRef<AutoCompleteComponent>;
    private element: HTMLElement;

    constructor (private componentFactoryResolver: ComponentFactoryResolver, public viewContainerRef: ViewContainerRef) {
        this.element = this.viewContainerRef.element.nativeElement;
    }

    /**
     * Listening on ngOnChanges event. If condition meets, create component and pass input,
     * otherwise destroy component if it has been initialized before.
     * @param changes
     */
    ngOnChanges (changes): void {
        if (!isUndefined(changes.ngModel.currentValue)) {
            this.component || this.create();
            this.component.query = changes.ngModel.currentValue;
            this.dataId = '';
            this.value = changes.ngModel.currentValue;
            changes.ngModel.currentValue.length || this.destroy();
        }
    }

    @HostListener('keydown', ['$event']) onKeyDown ($event: any): boolean | void {
        if (isUndefined(this.component)) return true;
        this.component.onKeyDown($event);
    }

    /**
     * Create auto-complete component to display auto-completion list.
     */
    private create () {
        const factory: ComponentFactory<AutoCompleteComponent> = this.componentFactoryResolver.resolveComponentFactory(AutoCompleteComponent);

        this.componentRef = this.viewContainerRef.createComponent(factory);
        this.component = this.componentRef.instance;
        this.component.source = this.source;
        this.component.value.subscribe((data) => {
            this.dataId = data.id;
            this.value = data.company || data.name;
            this.destroy();
            this.element.focus();
        });
    }

    /**
     * Destroy auto-complete component.
     */
    private destroy () {
        this.component.value.unsubscribe();
        this.componentRef.destroy();
        this.componentRef = undefined;
        this.component = undefined;
    }

}
