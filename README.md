# Prisma Typescript Example

## Description

This is a simple example of how to use Prisma with Typescript, using the Prisma Client, the project includes a simple CRUD of Authors and Books.

## How to use

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Check .env file

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/prisma-ts?schema=public"
```

### Check Prisma schema

```bash
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```
