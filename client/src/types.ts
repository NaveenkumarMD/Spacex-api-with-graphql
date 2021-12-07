type rocket={
    rocket_id:string,
    mission_name:string,
    rocket_type:string
}
type launch={
    mission_name:string,
    launch_success:boolean,
    flight_number:number,
    launch_year:string,
    launch_date_local:string,
    rocket:rocket,
}

export type {launch}