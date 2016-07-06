export class User {
    id: number;
    name: string;
    location_id: number;
    lunch_days: LunchDay[];
}

export class LunchDay{
    join: boolean;
    date: string;
}