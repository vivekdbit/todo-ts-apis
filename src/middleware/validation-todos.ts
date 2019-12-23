import {check} from 'express-validator';

export class ValidationTodos{

    static createTodos(){
        return [
            check('title')
                .not().isEmpty().withMessage('Title should not be empty'),
            check('description')
                .not().isEmpty().withMessage('Description should not be empty'),
            check('user_id')
                .not().isEmpty().withMessage('user_id should not be empty'),
        ]
    }

    static updateTodos(){
        return [
            check('title')
                .not().isEmpty().withMessage('Title should not be empty'),
            check('description')
                .not().isEmpty().withMessage('Description should not be empty'),
        ]
    }

    static getTodo(){
        return [
            check('id')
                .not().isEmpty().withMessage('_id should not be empty'),
        ]
    }
}