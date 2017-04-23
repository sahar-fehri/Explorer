import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import  { BlockComponent} from './block-component/block.component';
import {BlockItemComponent} from "./block-item-component/block-item.component";
import { HttpModule } from '@angular/http';








@NgModule({
    imports:      [ BrowserModule,HttpModule ],
    declarations: [ AppComponent, BlockComponent, BlockItemComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
