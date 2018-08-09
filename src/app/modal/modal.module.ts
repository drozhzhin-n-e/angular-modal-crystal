import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from './modal.service';
import { ModalContainerComponent } from './modal-container.component';
import { AdDirective } from './ad.directive';

@NgModule({
    declarations: [
        ModalContainerComponent,
        AdDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [],
    providers: [
        Modal
    ],
    bootstrap: [],
    entryComponents: [
        ModalContainerComponent
    ]
})
export class ModalModule {
}
