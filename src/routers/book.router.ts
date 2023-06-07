const express = require('express');
import type {Request, Response} from 'express';
import {body, validationResult} from "express-validator";
import * as bookService from '../book/book.service';

export const bookRouter =  express.Router();


//GET: List all books
bookRouter.get('/', async (req: Request, res: Response) => {
    try {
        const books = await bookService.listBooks();
        res.json(books);
    } catch (e : any) {
        console.error(e);
        res.status(500).send();
    }
} );

// //GET: Get a book by id
bookRouter.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const book = await bookService.findBookById(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json( {error: `Book ${id} not found`} );
        }
    } catch (e : any) {
        console.error(e);
        res.status(500).json( {error: e.message} );
    }
} );

// //POST: Create a new book
// //Params: title, datePublished, isFiction, authorId
bookRouter.post('/', [
    body('title').isString().notEmpty(),
    body('datePublished').isDate().toDate(),
    body('isFiction').isBoolean(),
    body('authorId').isInt()
], async (req: Request, res: Response) => {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) { //If there are errors then return 422 status code with the errors
        return res.status(422).json( {errors: errors.array()} );
    }
    const book = req.body;
    try {
        const newBook = await bookService.createBook(book);
        return res.status(201).json(newBook);
    } catch (e : any) {
        console.error(e);
        res.status(500).json( {error: e.message} );
    }
} );

bookRouter.put('/:id', [
    body('title').isString().notEmpty(),
    body('datePublished').isDate().toDate(),
    body('isFiction').isBoolean(),
    body('authorId').isInt()
], async (req: Request, res: Response) => {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) { //If there are errors then return 422 status code with the errors
        return res.status(422).json( {errors: errors.array()} );
    }
    const id = parseInt(req.params.id);
    const book = req.body;
    try {
        const updatedBook = await bookService.updateBook(book,id);
        if (updatedBook) {
            return res.json(updatedBook);
        } else {
            return res.status(404).json( {error: `Book ${id} not found`} );
        }
    } catch (e : any) {
        console.error(e);
        res.status(500).json( {error: e.message} );
    }
} );


// //DELETE: Delete a book by id
bookRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const deletedBook = await bookService.deleteBook(id);
        if (deletedBook) {
            res.json(deletedBook);
        } else {
            res.status(404).json( {error: `Book ${id} not found`} );
        }
    } catch (e : any) {
        console.error(e);
        res.status(500).json( {error: e.message} );
    }
} );


// //GET: List all books by author id
bookRouter.get('/author/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const books = await bookService.getBooksByAuthorId(id);
        res.json(books);
    } catch (e : any) {
        console.error(e);
        res.status(500).send();
    }
} );