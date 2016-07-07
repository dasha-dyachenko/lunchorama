import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Router, RouteParams } from '@angular/router-deprecated';
import { UserService } from './app.service';
import { DateService } from './date.service';

@Component({
    selector: 'my-congratulation',
    templateUrl: 'app/congratulation.component.html',
    styleUrls: ['app/congratulation.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService, DateService]
})

export class CongratulationComponent{
    userId: number;
    user;
    lunch_days;

    constructor( private router: Router,
                 private params: RouteParams,
                 private userService: UserService,
                 private dateService: DateService) { }

    ngOnInit() {
        this.userId = parseInt(this.params.get('id'));
        var range = this.dateService.getWeekRange();

        this.userService.getUser(this.userId, range).then((data) => {
            this.user = data;
            this.lunch_days = this.user.lunch_days;
            this.lunch_days.sort((a ,b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
        });
    }
}