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
var date_service_1 = require('./date.service');
var UserComponent = (function () {
    function UserComponent(router, params, userService, dateService) {
        this.router = router;
        this.params = params;
        this.userService = userService;
        this.dateService = dateService;
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userId = parseInt(this.params.get('id'));
        this.initWeekDays();
        var that = this;
        this.userService.getLocations().then(function (data) {
            _this.locations = data;
            _this.selectedLocation = _this.locations[0];
            var range = _this.dateService.getWeekRange();
            _this.userService.getUser(_this.userId, range).then(function (user) {
                that.user = user;
                if (that.user) {
                    if (that.user.location_id) {
                        _this.setLocation();
                    }
                    if (that.user.lunch_days) {
                        _this.setDates();
                    }
                }
            });
        });
    };
    UserComponent.prototype.setLocation = function () {
        for (var j = 0; j < this.locations.length; j++) {
            if (this.locations[j].id == this.user.location_id) {
                this.selectedLocation = this.locations[j];
            }
        }
    };
    UserComponent.prototype.setDates = function () {
        for (var j = 0; j < this.user.lunch_days.length; j++) {
            var d = new Date(this.user.lunch_days[j].date);
            d.setHours(0, 0, 0, 0);
            for (var i = 0; i < this.weekDays.length; i++) {
                if (this.weekDays[i].date.getTime() == d.getTime()) {
                    this.weekDays[i].value = this.user.lunch_days[j].join;
                }
            }
        }
    };
    UserComponent.prototype.initWeekDays = function () {
        var curr = new Date();
        var monday = this.dateService.getStartDate();
        var dates = [];
        var dateStrings = [];
        for (var i = 0; i < 5; i++) {
            curr.setDate(monday + i);
            var tmpDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 0, 0, 0);
            dates[i] = tmpDate;
        }
        this.weekDays = [];
        this.weekDays[0] = { id: 0, value: false, name: 'Mo', date: dates[0] };
        this.weekDays[1] = { id: 1, value: false, name: 'Tue', date: dates[1] };
        this.weekDays[2] = { id: 2, value: false, name: 'Wed', date: dates[2] };
        this.weekDays[3] = { id: 3, value: false, name: 'Thu', date: dates[3] };
        this.weekDays[4] = { id: 4, value: false, name: 'Fr', date: dates[4] };
    };
    UserComponent.prototype.toggleDateValue = function (day) {
        day.value = !day.value;
    };
    UserComponent.prototype.sendData = function () {
        var _this = this;
        var promises = [];
        for (var i = 0; i < this.weekDays.length; i++) {
            promises.push(this.userService.setLunchDate(this.user.id, this.selectedLocation.id, this.dateService.getDateString(this.weekDays[i].date), this.weekDays[i].value));
        }
        Promise.all(promises).then(function () {
            _this.router.navigate(['Congratulation', { id: _this.userId }]);
        });
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/user.component.html',
            styleUrls: ['app/user.component.css'],
            providers: [app_service_1.UserService, date_service_1.DateService],
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, app_service_1.UserService, date_service_1.DateService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map