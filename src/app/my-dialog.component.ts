import {Component, OnInit, EventEmitter, Input} from '@angular/core';

@Component({
    selector: 'my-dialog-component',
    templateUrl: './my-dialog.component.html',
    styleUrls: ['./my-dialog.component.sass']
})
export class MyDialogComponent {
	
	modalEvents = new EventEmitter();
    @Input() properties: any;

    dialogResponse(response: string){
    	this.modalEvents.emit({response, close: true});
    }
}
