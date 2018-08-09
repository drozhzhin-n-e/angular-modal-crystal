import { Component, OnInit } from '@angular/core';
import { Modal, Properties as ModalProperties } from './modal/modal.service';
import { MyComponent } from './my.component';
import { MyDialogComponent } from './my-dialog.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

    dialogTitle: string = 'Your title';
    modalMode: string = 'desktop';
    dialogResponse: string;

    constructor(public modal: Modal) { }

    ngOnInit(){
        this.modal.events.subscribe((event: any) => {
            if (event.componentId === 'my-modal-dialog'){
                this.dialogResponse = event.response.response;
            }
        });
    }

    showModal(params: ModalProperties):void {
        if (params.mode === 'desktop') {
            this.modal.load({
                id: 'my-desktop-modal',
                component: MyComponent,
                data: 'My data'
            });
        }

        if (params.mode === 'mobile') {
            this.modal.load({
                id: 'my-mobile-modal', 
                component: MyComponent, 
                mode: 'mobile',
                data: 'My data'
            });
        }
    }

    showDialog():void {
        this.modal.load({
            id: 'my-modal-dialog',
            component: MyDialogComponent,
            mode: 'dialog',
            title: this.dialogTitle,
            width: "400px",
            height: "100px"
        });
    }
}
