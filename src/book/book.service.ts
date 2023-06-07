import {db} from "../db.server";
import type {Author} from "../author/author.service";
type BookRead = {
    id: number;
    title: string;
    datePublished: Date;
    isFiction: boolean;
    author: Author;
    // authorId: number;
}

type BookWrite = {
    title: string;
    datePublished: Date;
    isFiction: boolean;
    authorId: number;
}

export const listBooks = async (): Promise<BookRead[]> => {
    return db.book.findMany({
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
}

// Find a single book by id
export const findBookById = async (id: number): Promise<BookRead | null> => {
    return db.book.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
}


//Create a new book
export const createBook = async (book : Omit<BookWrite, "id">): Promise<BookRead> => {
    const {title, datePublished, isFiction, authorId} = book;
    const parsedDate = new Date(datePublished);
    return db.book.create({
        data: {
            title: title,
            datePublished: parsedDate,
            isFiction: isFiction,
            authorId: authorId
        },
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
}


//Update an existing book
//Omit the id field from the book object since we don't want to update the id field
export const updateBook = async (book : Omit<BookWrite, "id">,id:number  ): Promise<BookRead | null> => {
    const {title, datePublished, isFiction, authorId} = book;
    const parsedDate = new Date(datePublished);
    return db.book.update({
        where: {
            id: id
        },
        data: {
            title: title,
            datePublished: parsedDate,
            isFiction: isFiction,
            authorId: authorId
        },
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
}

//Delete an existing book
export const deleteBook = async (id: number): Promise<BookRead | null> => {
    return db.book.delete({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
}

export const getBooksByAuthorId = async (authorId: number): Promise<BookRead[]> => {
    return db.book.findMany({
        where: {
            authorId: authorId
        },
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
}