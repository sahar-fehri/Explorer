"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var io = require("socket.io-client");
var blocks_service_1 = require("../services/blocks.service");
///<reference path="../typings/jquery/jquery.d.ts" />
var BlockComponent = (function () {
    function BlockComponent(_blockService) {
        this._blockService = _blockService;
        this.socket = null;
        this.firstBlockItem = {
            number: 123
            //hash : "azertyuiop123qsdfghjklm"
        };
        this.dataList = [];
        this.socket = io('http://localhost:3001');
        var sahar = 0;
        this.socket.on('new_block_coming', function (data) {
            sahar++;
            console.log(sahar);
            console.log("compooooooooooooooonennnt");
            // this.block_number= data.number ;
            /*  $("#myTable tbody").prepend("<tr><td></td></tr>")*/
            this.blocks.push(data);
        }.bind(this));
    }
    BlockComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.blocks = [];
        this._blockService.getBlocks()
            .subscribe(function (blocks) {
            //console.log(blocks)
            _this.blocks = blocks;
            console.log(blocks);
        });
    };
    return BlockComponent;
}());
BlockComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "blocks",
        // directives:[ BlockItemComponent],
        templateUrl: 'block.component.html',
        styleUrls: ['block.component.css']
    }),
    __metadata("design:paramtypes", [blocks_service_1.BlockService])
], BlockComponent);
exports.BlockComponent = BlockComponent;
//# sourceMappingURL=block.component.js.map