import { Component, EventEmitter, Input } from '@angular/core';
import { Modal } from './modal/modal.service';
import { MyChildComponent } from './my-child.component';

@Component({
    selector: 'my-component',
    templateUrl: './my.component.html',
})
export class MyComponent {
    
    events = new EventEmitter();
    @Input() modalProperties: any;
    @Input() modalData: any;

    constructor(public modal: Modal) { }

    showChildModal() {
        this.modal.load({
            id: 'my-child-modal',
            component: MyChildComponent,
            width: "400px",
            height: "400px",
            maxWidth: 'calc(100% - 48px)'    
        });
    }
}
