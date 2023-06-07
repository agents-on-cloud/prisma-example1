const express = require('express');
import {Request, Response} from 'express';
import {body, validationResult} from "express-validator";
import * as authorService from '../author/author.service';

export const authorRouter =  express.Router();

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors.
 *     responses:
 *       '200':
 *         description: Successful response with the list of authors.
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *       '500':
 *         description: Internal server error.
 */
authorRouter.get('/', async (req: Request, res: Response) => {
    try {
        const authors = await authorService.listAuthors();
        res.json(authors);
    } catch (e: any) {
        console.error(e);
        res.status(500).send();
    }
});


/**
 * @swagger
 * paths:
 *   /api/authors/{id}:
 *     get:
 *       summary: Get author by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the author
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '404':
 *           description: Author not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '500':
 *           description: Internal server error*/

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

//POST: Create a new author
//Params: firstName, lastName
authorRouter.post('/', [
    body('firstName').isString().notEmpty(),
    body('lastName').isString().notEmpty()
], async (req: Request, res: Response) => {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) { //If there are errors then return 422 status code with the errors
        return res.status(422).json( {errors: errors.array()} );
    }
    const author = req.body;
    try {
        const newAuthor = await authorService.createAuthor(author);
        return res.status(201).json(newAuthor);
    } catch (e : any) {
        console.error(e);
        res.status(500).json( {error: e.message} );
    }
} );


//PUT: Update an existing author
//Params: firstName, lastName
authorRouter.put('/:id', [
    body('firstName').isString().notEmpty(),
    body('lastName').isString().notEmpty()
], async (req: Request, res: Response) => {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) { //If there are errors then return 422 status code with the errors
        return res.status(422).json( {errors: errors.array()} );
    }
    const id :number = parseInt(req.params.id, 10);
    try {
        const author = req.body;
        const updatedAuthor = await authorService.updateAuthor(author, id);
        if (updatedAuthor) {
            return res.json(updatedAuthor);
        } else {
            return res.status(404).json( {error: `Author ${id} not found`} );
        }
    } catch (e : any) {
        console.error(e);
        res.status(500).json( {error: e.message} );
    }
} );

//DELETE: Delete an existing author by id
authorRouter.delete('/:id', async (req: Request, res: Response) => {
    const id :number = parseInt(req.params.id, 10);
    try {
        await authorService.deleteAuthor(id);
        return res.status(204).json("Author has been deleted");
    } catch (e : any) {
        console.error(e);
        res.status(500).json( {error: e.message} );
    }
} );