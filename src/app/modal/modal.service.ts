import { Injectable, Injector, ComponentFactoryResolver, EmbeddedViewRef, ApplicationRef, ComponentRef, EventEmitter } from '@angular/core';
import { ModalContainerComponent } from './modal-container.component';

export interface AdComponent {
    properties: any;
    events: any;
    stateEvents: any;
    closeEvent: any;
    desktopMode?: boolean;
    mobileMode?: boolean;
    closeModal?: any;
    isShow?: boolean;
    overlayBackdrop?: boolean;
}

export interface Properties {
    mode?: 'desktop' | 'mobile' | 'dialog';
    overlayBackdrop?: boolean;
    id?: string;
    component: any;
    width?: string;
    maxWidth?: string;
    height?: string;
    maxHeight?: string;
    title?: string;
    backdropClass?: string | { [key: string]: any; };
    modalClass?: string | { [key: string]: any; };
    data?: any;
}

export const defaultProperties = {
    'mode': 'desktop',
    'overlayBackdrop': true
}

@Injectable()
export class Modal {

    events = new EventEmitter();
    stateEvents = new EventEmitter();
    componentRefs = {};
    _properties: any = {};
    _defaultProperties: any;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {
    }

    appendComponentToBody(properties: any, component: any = ModalContainerComponent):void {
        if (this.componentRefs[properties.id]){
            return;
        }

        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);

        this.componentRefs[properties.id] = componentRef;

        (<AdComponent>componentRef.instance).properties = properties;
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        // Add to body
        this.appendComponentToTag(domElem, properties.tagname);

        // Properties
        (<AdComponent>componentRef.instance).mobileMode = properties.mode === 'mobile';
        (<AdComponent>componentRef.instance).desktopMode = properties.mode === 'desktop' || properties.mode === 'dialog';

        // Show
        setTimeout(() => {
            (<AdComponent>componentRef.instance).isShow = true;
        }, 100);

        // User events
        (<AdComponent>componentRef.instance).events.subscribe((event: any) => {
            //console.log(properties);
            
            let newEvent = {};
            newEvent['componentId'] = properties.id;
            newEvent['response'] = event;
            newEvent['state'] = event.state;

            this.events.emit(newEvent);
        });

        // State events
        (<AdComponent>componentRef.instance).stateEvents.subscribe((event: any) => {
            this.stateEvents.emit(event);
        });

        // Closing event
        (<AdComponent>componentRef.instance).closeEvent.subscribe((event: any) => {
            this.handleClosingEvent({
                componentRef: componentRef, 
                componentId: properties.id,
                mobileMode: properties.mobileMode
            });
        });
    }

    appendComponentToTag(element: any, tagname: string = ''):void {
        if (tagname){
            document.getElementsByTagName(tagname)[0].appendChild(element);
        } else {
            document.body.appendChild(element);
        }
    }

    public load(properties:Properties):void {
        if (properties.mode === "mobile" || window.innerWidth <= 480){
            document.body.style.overflow = 'hidden';
        }
        properties = this.getOptionsDefault(defaultProperties, properties);
        this.appendComponentToBody(properties);
    }

    public close(prop: any = {}):void {
        if (this.componentRefs[prop.id]){
            (<AdComponent>this.componentRefs[prop.id].instance).closeModal();
        }
    }

    handleClosingEvent(properties: any = {}):void {
        this.appRef.detachView(properties.componentRef.hostView);
        properties.componentRef.destroy();
        delete this.componentRefs[properties.componentId];

        if (this.objectLength(this.componentRefs) == 0){
            document.body.style.overflow = '';
        }
    }

    getOptionsDefault(defaultOptions, options) {
        this._defaultProperties = Object.assign({}, defaultOptions);
        return Object.assign(this._defaultProperties, options);
    }

    objectLength(obj):number {
        let length = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) length++;
        }
        return length;
    };
}