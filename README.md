# Modal for Angular 2

This module allows for show modal and dialog boxes.

## Installation

Install the npm package.

	npm i angular-modal@crystal

Import module:

```ts
import {ModalModule} from 'angular-modal@crystal';

@NgModule({
    imports: [ModalModule]
})
```

## Usage
To open the window, import the `Modal` service and call the `load()` method. As a parameter, pass your component. It will be the contents of the window..

```ts
import {Modal} from 'angular-modal@crystal';
import {MyComponent} from './my.component';

public constructor(private modal: Modal) {};

showModal() {
    this.modal.load({
        id: 'my-modal', 
        component: MyComponent
    });
}
```

## Properties

| name | description |
|------------------------|---------------------------------------------|
| `id: string = undefined` | The identifier of the window. It will distinguish one window from another. |
| `mode: "desktop" / "mobile" / "dialog" = "desktop"` | The type of the window template. |
| `data: any` | Any data that needs to be pass to the window. In the window component, you can get them using `@Input() modalData: any`. |
| `width: string = "800px"` | Width of the window. |
| `height: string = "auto"` | Height of the window. By default, the height of the window is determined by the height of its content. |
| `maxWidth: string = "calc(100% - 32px)"` | Maximum width of the window. |
| `maxHeight: string = "calc(100% - 32px)"` | Maximum height of the window. |
| `overlayBackdrop: boolean = true` | Whether the window has a backdrop. |
| `backdropClass: string / { [key: string]: any; }` | Custom classes for the backdrop. Supports the same syntax as ngClass. |
| `modalClass: string / { [key: string]: any; }` | Custom classes for the modal window. Supports the same syntax as ngClass. |

## Methods

| name | description |
|------------------------|---------------------------------------------|
| `load({ id: "my-modal", component: MyComponent })` | Shows the modal. |
| `close({ id: "my-modal" })` | Hides the modal. |

## Events

Window state changes are available by subscription `stateEvents.subscribe()`.

| name | description |
|------------------------|---------------------------------------------|
| `show` | The event is called before the modal appears. |
| `shown` | The event is called after the animation of the appearance of the modal. |
| `hide` | The event is called before the modal is hidden. |
| `hidden` | The event is called after the animation of the modal is hidden. |


## Demo 

http://crystalui.org/components/pinch-zoom
