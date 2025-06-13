import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdleService } from './app/pages/service/idle.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    constructor(){}
}
