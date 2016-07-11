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
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var app_service_1 = require('./app.service');
var user_component_1 = require('./user.component');
var unknown_component_1 = require('./unknown.component');
var error_component_1 = require('./error.component');
var congratulation_component_1 = require('./congratulation.component');
core_1.enableProdMode();
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n            <div class=\"header\">\n              <img width=\"100px\" class=\"logo\" src=\"img/etv_logo.svg\"/>\n            </div>\n            <router-outlet></router-outlet>",
            styleUrls: ['app/app.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                app_service_1.UserService
            ]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/user/:id',
                name: 'User',
                component: user_component_1.UserComponent
            },
            {
                path: '/congratulation/:id',
                name: 'Congratulation',
                component: congratulation_component_1.CongratulationComponent
            },
            {
                path: '/unknown',
                name: 'Unknown',
                component: unknown_component_1.UnknownComponent,
                useAsDefault: true
            },
            {
                path: '/error',
                name: 'Error',
                component: error_component_1.ErrorComponent
            },
            {
                path: '/**',
                redirectTo: ['Unknown']
            }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map