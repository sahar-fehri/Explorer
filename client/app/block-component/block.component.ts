import { Component , OnInit} from '@angular/core';
import { BlockItemComponent} from '../block-item-component/block-item.component';
import * as io from 'socket.io-client';
import { BlockService } from '../services/blocks.service';
import {Block} from '../models/Block';


///<reference path="../typings/jquery/jquery.d.ts" />







@Component({
    moduleId : module.id,
    selector: "blocks",
   // directives:[ BlockItemComponent],
    templateUrl: 'block.component.html',
    styleUrls: ['block.component.css']
})
export class BlockComponent implements OnInit{
    block_number ;

    blocks : Block[];

    socket = null;

    firstBlockItem = {
        number : 123
        //hash : "azertyuiop123qsdfghjklm"
    };

    dataList= [];


    constructor(private _blockService: BlockService){



        this.socket = io('http://localhost:3001');
            var sahar = 0 ;
        this.socket.on('new_block_coming', function(data){
            sahar++
            console.log(sahar)
            console.log("compooooooooooooooonennnt");

           // this.block_number= data.number ;

          /*  $("#myTable tbody").prepend("<tr><td></td></tr>")*/
        this.blocks.push(data);


        }.bind(this));
    }


    ngOnInit(){

        this.blocks = [];
        this._blockService.getBlocks()
            .subscribe(blocks => {
                //console.log(blocks)
                this.blocks= blocks;
                console.log(blocks)
            })
    }

}
