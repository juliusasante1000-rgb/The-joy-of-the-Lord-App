import { Book } from "../types";
import { generateBismarkLibrary } from "./bismarkBooksGenerator";
import { CLASSIC_CHRISTIAN_BOOKS } from "./classicBooksData";

export const BISMARK_BOOKS: Book[] = generateBismarkLibrary();

export const ALL_BOOKS: Book[] = [
  ...BISMARK_BOOKS,
  ...CLASSIC_CHRISTIAN_BOOKS
];

export const INITIAL_BOOKS: Book[] = ALL_BOOKS;

