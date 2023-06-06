const express = require('express');
import {Request, Response} from 'express';
import {body, validationResult} from "express-validator";

import * as authorService from './author.service';

export const authorRouter =  express.Router();

authorRouter.get('/', async (req: Request, res: Response) => {
    try {
        const authors = await authorService.listAuthors();
        res.json(authors);
    } catch (e : any) {
        console.error(e);
        res.status(500).send();
    }
} );

authorRouter.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const author = await authorService.findAuthorById(id);
        if (author) {
            res.json(author);
        } else {
            res.status(404).json( {error: `Author ${id} not found`} );
        }
    } catch (e : any) {
        console.error(e);
        res.status(500).send();
    }
} );

authorRouter.post('/', [
    body('firstName').isLength({min: 1}).withMessage('First name is required'),
    body('lastName').isLength({min: 1}).withMessage('Last name is required')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json( {errors: errors.array()} );
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    try {
        const author = await authorService.createAuthor(firstName, lastName);
        res.json(author);
    } catch (e : any) {
        console.error(e);
        res.status(500).send();
    }
} );
