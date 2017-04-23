import { Component, Input} from '@angular/core';



@Component({
    moduleId : module.id,
    selector: "block-item",

    templateUrl: 'block-item.component.html'
})
export class BlockItemComponent {

    @Input() blockItem;




    constructor(){

       console.log("In block Item");
    }

}
