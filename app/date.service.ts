import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

    private today;

    constructor() {
        this.today = new Date();
    }

    getStartDate() {
        var todayWeekDay = this.today.getDay();
        var monday;
        if(todayWeekDay == 0){
            monday = this.today.getDate() + 1;
        }
        else if(todayWeekDay == 6){
            monday = this.today.getDate() + 2;
        }
        else {
            monday = this.today.getDate() - todayWeekDay + 1;
        }
        return monday;
    }

    getEndDate(){
        var monday = this.getStartDate();
        return monday + 5;
    }

    getMondayDate(){
        var curr = new Date();
        var monday = curr.setDate(this.getStartDate());
        return new Date(monday);
    }

    getFridayDate() {
        var curr = new Date();
        var friday = curr.setDate(this.getEndDate());
        return new Date(friday);
    }

    getDateString(date: Date){
        var day = this.addZero(date.getDate());
        var month = this.addZero(date.getMonth() + 1);
        var year = date.getFullYear();
        return  day + '.' + month  + '.' + year;
    }

    getWeekRange() {
        return {
            start: this.getDateString(this.getMondayDate()),
            end: this.getDateString(this.getFridayDate())
        };
    }

    private addZero(val) {
        return val < 10 ? '0' + val : val;
    }
}