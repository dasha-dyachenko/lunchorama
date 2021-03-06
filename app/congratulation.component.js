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
var router_deprecated_2 = require('@angular/router-deprecated');
var app_service_1 = require('./app.service');
var date_service_1 = require('./date.service');
var CongratulationComponent = (function () {
    function CongratulationComponent(router, params, userService, dateService) {
        this.router = router;
        this.params = params;
        this.userService = userService;
        this.dateService = dateService;
    }
    CongratulationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userId = parseInt(this.params.get('id'));
        var range = this.dateService.getWeekRange();
        this.userService.getUser(this.userId, range).then(function (data) {
            _this.user = data;
            _this.lunch_days = _this.user.lunch_days;
            _this.lunch_days.sort(function (a, b) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
        });
    };
    CongratulationComponent = __decorate([
        core_1.Component({
            selector: 'my-congratulation',
            templateUrl: 'app/congratulation.component.html',
            styleUrls: ['app/congratulation.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [app_service_1.UserService, date_service_1.DateService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_2.Router, router_deprecated_2.RouteParams, app_service_1.UserService, date_service_1.DateService])
    ], CongratulationComponent);
    return CongratulationComponent;
}());
exports.CongratulationComponent = CongratulationComponent;
//# sourceMappingURL=congratulation.component.js.map