import { Component } from '@angular/core';
import { BlockService} from './services/blocks.service';

@Component({
    moduleId : module.id,
    selector: "my-app",
    templateUrl: 'app.component.html',
    providers: [BlockService]
})
export class AppComponent {  }
