import {db} from "./db.server";

// Path: src/db.server.ts

type Author = {
    firstName : string;
    lastName : string;
}

type Book = {
    title : string;
    isFiction : boolean;
    datePublished : Date;
}

async function seed() {
    await Promise.all(
        getAuthors().map(author => db.author.create({
            data: {
            firstName: author.firstName,
            lastName: author.lastName
            }})),
    );

    const author = await db.author.findFirst({
        where: {
            firstName: "Stephen",
        }
    });

    await Promise.all(
        getBooks().map((book) => {
            const  {title, isFiction, datePublished} = book;
            return db.book.create({data: {
                title,
                isFiction,
                datePublished,
                authorId: author.id
                }
        })
    }));
}

seed()

function getAuthors() : Array<Author> {
    return [
        {
            firstName: "Stephen",
            lastName: "King"
        },
        {
            firstName: "J.R.R.",
            lastName: "Tolkien"
        },
        {
            firstName: "George R.R.",
            lastName: "Martin"
        }
    ]
}

function getBooks() : Array<Book> {
    return [
        {
            title: "The Lord of the Rings",
            isFiction: true,
            datePublished: new Date("1954-07-29")
        },
        {
            title: "A Game of Thrones",
            isFiction: true,
            datePublished: new Date("1996-08-01")
        },
        {
            title: "The Shining",
            isFiction: true,
            datePublished: new Date("1977-01-28")
        }
    ]
}

