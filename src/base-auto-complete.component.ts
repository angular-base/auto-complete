import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'base-auto-complete',
  templateUrl: './base-auto-complete.component.html',
  styleUrls: ['./base-auto-complete.component.scss']
})
export class BaseAutoCompleteComponent {

  @Input() source: Array<Object>;
  @Input() query: string;
  @Input() input: HTMLElement;

  @Output() value: EventEmitter<Object> = new EventEmitter();

  private filteredSource: Array<Object>;
  private autoCompleteMenuItems: Array<HTMLElement>;
  private numberOfMatches: number = 0;
  private selectedIndex: number = -1;
  private element: HTMLElement;

  constructor (private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

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
        this.select();
        $event.preventDefault();
        break;
      case KEY.DOWN:
        this.selectedIndex = this.selectedIndex === this.numberOfMatches ? 0 : ++this.selectedIndex;
        this.select();
        $event.preventDefault();
        break;
      case KEY.ENTER:
      case KEY.TAB:
        this.confirm(this.selectedIndex);
        break;
    }
  }

  public confirm (index: number): void {
    if (this.filteredSource[index])
      this.value.emit(this.filteredSource[index]);
  }

  public filter (query: string): Array<Object> {
    this.filteredSource = this.source.filter(item =>
      Object.keys(item)
        .filter(key => item[key] !== null)
        .some(key => (item[key].toString().toLowerCase()).indexOf(query.toLowerCase()) !== -1)
    );

    this.element.style.visibility = (this.filteredSource.length) ? 'visible' : 'hidden';
    this.numberOfMatches = this.filteredSource.length - 1;
    return this.filteredSource;
  }

  private select (): void {
    this.autoCompleteMenuItems.forEach((item, index) => {
      this.selectedIndex === index ? item.classList.add('active') : item.classList.remove('active');
    });
  }

}
