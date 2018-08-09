import {
    Component, 
    OnInit,
    EventEmitter, 
    HostBinding, 
    HostListener, 
    ViewChild, 
    ElementRef, 
    Input, 
    ComponentFactoryResolver
} from '@angular/core';

import { AdDirective } from './ad.directive';

export interface AdComponent {
    modalProperties: any;
    modalEvents: any;
    modalData?: any;
}

@Component({
    selector: 'modal',
    templateUrl: './modal-container.component.html',
    styleUrls: ['./modal-container.component.css']
})

export class ModalContainerComponent implements OnInit {
    events = new EventEmitter();
    closeEvent = new EventEmitter();
    stateEvents = new EventEmitter();
    public overlayBackdrop: boolean = true;

    @ViewChild(AdDirective) adHost: AdDirective;

    @Input() properties: any;

    @HostBinding('class.modal-desktop') desktopMode: boolean = false;
    @HostBinding('class.modal-mobile') mobileMode: boolean = false;
    @HostBinding('class.modal-show') isShow: boolean = false;

    @HostListener('transitionend', ['$event'])
    transitionEnd(event) {
        if (this.isShow) {
            if (event.propertyName === "transform"){
                this.stateEvents.emit("shown");
            }
        } else {
            this.closeEvent.emit(true);
            this.stateEvents.emit("hidden");
        }
    }

    get data(){
        return this.properties.data;
    }

    get containerStyles(){
        let styles = {};

        if (this.properties.width){
            styles['width'] = this.properties.width;
        }
        if (this.properties.height){
            styles['height'] = this.properties.height;
        }
        if (this.properties.maxWidth){
            styles['max-width'] = this.properties.maxWidth;
        }
        if (this.properties.maxHeight){
            styles['max-height'] = this.properties.maxHeight;
        }

        return styles;
    }

    get containerWrapperStyles(){
        let styles = {};

        if (this.properties.height){
            styles['height'] = '100%';
        }
        return styles; 
    }

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.loadComponent();
        this.stateEvents.emit("show");
    }

    closeModal() {
        this.isShow = false;
        this.stateEvents.emit("hide");
    }

    loadComponent() {
        let adItem = this.properties;
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
        let viewContainerRef = this.adHost.viewContainerRef;

        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<AdComponent>componentRef.instance).modalProperties = this.properties;
        (<AdComponent>componentRef.instance).modalData = this.data;

        // Modal events
        if ((<AdComponent>componentRef.instance).modalEvents){
            (<AdComponent>componentRef.instance).modalEvents.subscribe((event: any) => {
                this.events.emit(event);

                if (event.close){
                    this.closeModal();
                }
            });
        }
    }
}
