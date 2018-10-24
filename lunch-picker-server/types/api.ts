import {Request} from 'express';

export interface WebtaskRequest extends Request {
    webtaskContext: any;
}
