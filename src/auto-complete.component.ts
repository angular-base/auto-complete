import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'base-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

  @Input() source: Array<Object>;
  @Input('search-query') searchQuery: string;

  constructor () { }

  ngOnInit () {
  }

}
