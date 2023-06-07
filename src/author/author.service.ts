import {db} from "../db.server";

export type Author = {
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
export const createAuthor = async (author : Omit<Author, "id">): Promise<Author> => {
    const {firstName, lastName} = author;
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
//Omit the id field from the author object since we don't want to update the id field
export const updateAuthor = async (author : Omit<Author, "id">,id:number  ): Promise<Author | null> => {
    const {firstName, lastName} = author;
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
export const deleteAuthor = async (id: number): Promise<void> => {
    await db.author.delete({
        where: {
            id: id
        },
    });
}

