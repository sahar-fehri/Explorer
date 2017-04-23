import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class BlockService {

    constructor(private _http:Http){


    }

    getBlocks(){


        return this._http.get('/api/blocks')
            .map(res => res.json())
    }




}