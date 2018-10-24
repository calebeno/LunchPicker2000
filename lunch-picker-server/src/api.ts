import {Request} from 'express';
import {FoodPlace, FoodPlacesToEat, LunchAttendee} from '../../lunch-picker-app/src/models/picker.model';

export interface WebtaskRequest extends Request {
    webtaskContext: {
        storage: {
            get: (callback: (error: any, data: StorageData) => void) => void;
            set: (data: StorageData, callback: (error: any) => void) => void;
        };
    };
}

export interface UpdateDislikesRequest extends WebtaskRequest {
    body: UpdateDislikesBody;
}

export interface UpdateDislikesBody {
    attendeeName: string;
    newDislikeList: FoodPlacesToEat[];
}

export interface StorageData {
    foodPlaces: FoodPlace[];
    lunchAttendees: LunchAttendee[];
}
