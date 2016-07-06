import { Component, enableProdMode } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { UserService } from './app.service';
import { UserComponent } from './user.component';
import { UnknownComponent } from './unknown.component';
import { ErrorComponent } from './error.component';
import { CongratulationComponent } from './congratulation.component';

enableProdMode();

@Component({
    selector: 'my-app',
    template: `
            <div class="header">
              <img width="100px" class="logo" src="img/etv_logo.svg"/>
            </div>
            <router-outlet></router-outlet>`,
    styleUrls:  ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        UserService
    ]
})

@RouteConfig([
    {
        path: '/user/:id',
        name: 'User',
        component: UserComponent
    },
    {
        path: '/congratulation/:id',
        name: 'Congratulation',
        component: CongratulationComponent
    },
    {
        path: '/unknown',
        name: 'Unknown',
        component: UnknownComponent,
        useAsDefault: true
    },
    {
        path: '/error',
        name: 'Error',
        component: ErrorComponent
    }
])

export class AppComponent {
}


