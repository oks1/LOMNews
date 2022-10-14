import {check, validationResult} from 'express-validator';

export const newsValidation = [
    check('title')
    .notEmpty()
    .withMessage('Title is required'),

    check('newsText')
    .notEmpty()
    .withMessage('text is required')
    .isLength({min:50})
    .withMessage('Text must be at least 50 characters long!'),

    check('image')
    .optional()
    // .isURL()
    // .withMessage('Invalid URL'),

    // check('author')
    // .notEmpty()
    // .withMessage('Author is required'),

];

export const newsValidationResult = (req, res, next)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = result.array()[0].msg;
        return res.status(400).json({success: false, error: error})
    }
    next();
};
