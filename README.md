# auto-complete
This package can be included in your Angular project quickly and can be extended easily by additional features. This module allows the user to select a value in a pre-populated list while typing and supports arrow keys to traverse suggestions as well as mouse input.

## Usage it in your code
    <input type="text" baseAutoComplete [source]="data" [(ngModel)]="variable">

### Attributes
* **`source: Array<Object>`** - Array of items from which to select. Should be an array of objects with **`id`** and **`name`** properties.

