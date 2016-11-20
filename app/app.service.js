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
var http_1 = require('@angular/http');
var router_deprecated_1 = require('@angular/router-deprecated');
require('rxjs/add/operator/toPromise');
var UserService = (function () {
    function UserService(http, router) {
        this.http = http;
        this.router = router;
        this.baseUrl = 'http://lunchorama.etventure-labs.com/api'; // URL to web api
    }
    UserService.prototype.getLocations = function () {
        return this.http.get(this.baseUrl + '/locations')
            .toPromise()
            .then(function (response) { return JSON.parse(response._body); })
            .catch(this.handleError);
    };
    UserService.prototype.getUser = function (id, range) {
        var _this = this;
        return this.http.get(this.baseUrl + '/users/' + id + '?start=' + range.start + '&end=' + range.end)
            .toPromise()
            .then(function (response) {
            return JSON.parse(response._body);
        })
            .catch(function (error) {
            if (error && error.status) {
                if (error.status == 404) {
                    _this.goToState('Unknown');
                }
                else if (error.status == 500) {
                    _this.goToState('Error');
                }
                else {
                    return Promise.reject(error.statusText);
                }
            }
        });
    };
    UserService.prototype.setLunchDate = function (id, locationId, date, join) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var params = {
            lunch_day: { date: date, join: join },
            location_id: locationId
        };
        return this.http.put(this.baseUrl + '/users/' + id, JSON.stringify(params), { headers: headers })
            .toPromise()
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    UserService.prototype.getOrders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('https://api.staging.rbn.etventure-labs.com/purchase_orders/', { headers: headers })
            .toPromise()
            .then(function (response) { return console.log('!!!!!!', response); })
            .catch(this.handleError);
    };
    UserService.prototype.goToState = function (stateName) {
        this.router.navigate([stateName]);
    };
    UserService.prototype.handleError = function (error) {
        if (error && error.status) {
            return Promise.reject(error.statusText);
        }
        return Promise.reject(error.message || error);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=app.service.js.map