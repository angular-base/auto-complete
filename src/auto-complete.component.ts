import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'base-auto-complete',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent {

    @Input() source: Array<Object>;
    @Input() query: string;
    @Input() input: HTMLElement;

    @Output() value: EventEmitter<Object> = new EventEmitter();

    private filteredSource: Array<Object>;
    private autoCompleteMenuItems: Array<HTMLElement>;
    private numberOfMatches: number = 0;
    private selectedIndex: number = -1;

    constructor (private elementRef: ElementRef) {}

    ngAfterViewChecked () {
        this.autoCompleteMenuItems = this.elementRef.nativeElement.querySelectorAll('li');
    }

    public onKeyDown ($event): void {
        const KEY = {
            ESC: 27,
            UP: 38,
            DOWN: 40,
            ENTER: 13,
            TAB: 9
        };

        switch ($event.keyCode) {
            case KEY.UP:
                this.selectedIndex = this.selectedIndex === -1 || this.selectedIndex === 0 ? this.numberOfMatches : --this.selectedIndex;
                this.selectAutoCompleteMenuItem();
                $event.preventDefault();
                break;
            case KEY.DOWN:
                this.selectedIndex = this.selectedIndex === this.numberOfMatches ? 0 : ++this.selectedIndex;
                this.selectAutoCompleteMenuItem();
                $event.preventDefault();
                break;
            case KEY.ENTER:
            case KEY.TAB:
                this.confirmSelectedAutoCompleteMenuItem();
                break;
        }
    }

    public autoCompleteFilter (query: string): Array<Object> {
        this.filteredSource = this.source.filter(item =>
            Object.keys(item)
                .filter(key => item[key] !== null)
                .some(key => (item[key].toString().toLowerCase()).indexOf(query.toLowerCase()) !== -1)
        );

        this.numberOfMatches = this.filteredSource.length - 1;
        return this.filteredSource;
    }

    private selectAutoCompleteMenuItem (): void {
        this.autoCompleteMenuItems.forEach((item, index) => {
            this.selectedIndex === index ? item.classList.add('selected') : item.classList.remove('selected');
        });
    }

    private confirmSelectedAutoCompleteMenuItem (): void {
        this.value.emit(this.filteredSource[this.selectedIndex]);
    }

}
