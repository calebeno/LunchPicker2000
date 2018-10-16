export interface FoodPlace {
    name: FoodPlacesToEat;
    okOption: boolean;
}

export interface LunchAttendee {
    name: string;
    goingToday: boolean;
    dislikes: FoodPlacesToEat[];
}
export enum FoodPlacesToEat {
    None = 'None',
    Yats = 'Yats',
    Chipotle = 'Chipotle',
    Fukuryu = 'Fukuryu',
    Canes = 'Canes',
    HYAsian = 'HY Asian',
    Potbelly = 'Potbelly',
    Piada = 'Piada',
    HotChickenTakeover = 'Hot Chicken Takeover',
    Lavash = 'Lavash',
}
