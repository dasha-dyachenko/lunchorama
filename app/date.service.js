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
var DateService = (function () {
    function DateService() {
        this.today = new Date();
    }
    DateService.prototype.getStartDate = function () {
        var todayWeekDay = this.today.getDay();
        var monday;
        if (todayWeekDay == 0) {
            monday = this.today.getDate() + 1;
        }
        else if (todayWeekDay == 6) {
            monday = this.today.getDate() + 2;
        }
        else {
            monday = this.today.getDate() - todayWeekDay + 1;
        }
        return monday;
    };
    DateService.prototype.getEndDate = function () {
        var monday = this.getStartDate();
        return monday + 5;
    };
    DateService.prototype.getMondayDate = function () {
        var curr = new Date();
        var monday = curr.setDate(this.getStartDate());
        return new Date(monday);
    };
    DateService.prototype.getFridayDate = function () {
        var curr = new Date();
        var friday = curr.setDate(this.getEndDate());
        return new Date(friday);
    };
    DateService.prototype.getDateString = function (date) {
        var day = this.addZero(date.getDate());
        var month = this.addZero(date.getMonth() + 1);
        var year = date.getFullYear();
        return day + '.' + month + '.' + year;
    };
    DateService.prototype.getWeekRange = function () {
        return {
            start: this.getDateString(this.getMondayDate()),
            end: this.getDateString(this.getFridayDate())
        };
    };
    DateService.prototype.addZero = function (val) {
        return val < 10 ? '0' + val : val;
    };
    DateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DateService);
    return DateService;
}());
exports.DateService = DateService;
//# sourceMappingURL=date.service.js.map