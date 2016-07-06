import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router-deprecated';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    constructor(private http: Http,
                private router: Router) {}

    private baseUrl = 'http://lunchorama.etventure-labs.com';  // URL to web api

    getLocations() {
        return this.http.get(this.baseUrl + '/locations')
            .toPromise()
            .then(response => JSON.parse((<any>response)._body))
            .catch(this.handleError);
    }

    getUser(id, range) {
        return this.http.get(this.baseUrl + '/users/' + id + '?start=' + range.start +'&end=' + range.end)
            .toPromise()
            .then(response =>{
                return JSON.parse((<any>response)._body);
            })
            .catch((error) => {
                if(error && error.status){
                    if(error.status == 404){
                        this.goToState('Unknown');
                    }
                    else if(error.status == 500){
                        this.goToState('Error');
                    }
                    else {
                        return Promise.reject(error.statusText);
                    }
                }
            });
    }

    setLunchDate(id, locationId, date, join) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let params = {
            lunch_day: {date: date, join: join},
            location_id: locationId
        };

        return this.http.put(this.baseUrl + '/users/' + id, JSON.stringify(params), {headers: headers})
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }

    private goToState(stateName: string){
        this.router.navigate([stateName]);
    }

    private handleError(error: any) {
        if(error && error.status){
            return Promise.reject(error.statusText);
        }
        return Promise.reject(error.message || error);
    }
}