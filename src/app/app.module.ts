import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ModalModule } from './modal/modal.module';
import { MyComponent } from './my.component';
import { MyChildComponent } from './my-child.component';
import { MyDialogComponent } from './my-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MyComponent,
    MyChildComponent,
    MyDialogComponent
  ],
  imports: [
    BrowserModule,
    ModalModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    MyComponent, 
    MyChildComponent, 
    MyDialogComponent
  ]
})
export class AppModule { }
