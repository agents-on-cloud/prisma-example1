import {db} from "../db.server";

type Author = {
    id: number;
    firstName: string;
    lastName: string;
}

export const listAuthors = async (): Promise<Author[]> => {
    return db.author.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    });
}

//Find a single author by id
export const findAuthorById = async (id: number): Promise<Author | null> => {
    return db.author.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    });
}

//Create a new author
export const createAuthor = async (firstName: string, lastName: string): Promise<Author> => {
    return db.author.create({
        data: {
            firstName: firstName,
            lastName: lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    });
}

//Update an existing author
export const updateAuthor = async (id: number, firstName: string, lastName: string): Promise<Author | null> => {
    return db.author.update({
        where: {
            id: id
        },
        data: {
            firstName: firstName,
            lastName: lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    });
}

//Delete an existing author
export const deleteAuthor = async (id: number): Promise<Author | null> => {
    return db.author.delete({
        where: {
            id: id
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    });
}

