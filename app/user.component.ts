import { Component, OnInit} from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { UserService } from './app.service';
import { DateService } from './date.service';

import { User } from './user';
import { WeekDay } from './week.day';
import { Location }  from './location';

@Component({
    selector: 'my-app',
    templateUrl: 'app/user.component.html',
    styleUrls:  ['app/user.component.css'],
    providers: [UserService, DateService],
})

export class UserComponent implements OnInit {
    locations;
    selectedLocation: Location;
    user: User;
    weekDays:WeekDay[];
    userId: number;

    constructor( private router: Router,
                 private params: RouteParams,
                 private userService: UserService,
                 private dateService: DateService) { }

    ngOnInit() {
        this.userId = parseInt(this.params.get('id'));
        this.initWeekDays();
        var that = this;

        this.userService.getLocations().then((data) => {
            this.locations = data;
            this.selectedLocation = this.locations[0];
            var range = this.dateService.getWeekRange();
            
            this.userService.getUser(this.userId, range).then((user) => {
                that.user = user;
                if(that.user){
                    if(that.user.location_id){
                        this.setLocation();
                    }
                    if(that.user.lunch_days){
                        this.setDates();
                    }
                }
            });
        });
    }

    setLocation(){
        for(var j = 0; j < this.locations.length; j++){
            if(this.locations[j].id == this.user.location_id){
                this.selectedLocation = this.locations[j];
            }
        }
    }

    setDates(){
        for(var j=0; j < this.user.lunch_days.length; j++){
            var d = new Date(this.user.lunch_days[j].date);
            d.setHours(0,0,0,0);
            for(var i=0; i < this.weekDays.length; i++){
                if(this.weekDays[i].date.getTime() == d.getTime()){
                    this.weekDays[i].value = this.user.lunch_days[j].join;
                }
            }
        }
    }

    initWeekDays(){
        var curr = new Date();
        var monday = this.dateService.getStartDate();
        var dates = [];
        var dateStrings = [];
        for(var i = 0; i < 5; i++){
            curr.setDate(monday + i);
            var tmpDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 0, 0, 0);
            dates[i] = tmpDate;
        }

        this.weekDays = [];
        this.weekDays[0] = {id: 0, value: false, name: 'Mo', date: dates[0]};
        this.weekDays[1] = {id: 1, value: false, name: 'Tue', date: dates[1]};
        this.weekDays[2] = {id: 2, value: false, name: 'Wed', date: dates[2]};
        this.weekDays[3] = {id: 3, value: false, name: 'Thu', date: dates[3]};
        this.weekDays[4] = {id: 4, value: false, name: 'Fr', date: dates[4]};
    }

    toggleDateValue(day: WeekDay){
        day.value = !day.value;
    }
    
    sendData() {
        var promises = [];
        for(var i = 0; i <  this.weekDays.length; i++){
            promises.push(this.userService.setLunchDate(this.user.id, this.selectedLocation.id,
                this.dateService.getDateString(this.weekDays[i].date), this.weekDays[i].value));
        }

        Promise.all(promises).then(()=> {
            this.router.navigate(['Congratulation', { id: this.userId }]);
        });
    }
}