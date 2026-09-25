import { Book } from "../types";
import { MASTER_15_CHAPTER_TEXTBOOK } from "./master15ChapterBookData";
import { GLOBAL_CLASSIC_BOOKS, BOOK_1_JOY_OF_THE_LORD, BOOK_2_WELLS_OF_SALVATION } from "./globalClassicBooksData";
import { LIBRARY_200_MESSAGES } from "./libraryMessagesData";

export {
  MASTER_15_CHAPTER_TEXTBOOK,
  BOOK_1_JOY_OF_THE_LORD,
  BOOK_2_WELLS_OF_SALVATION,
  GLOBAL_CLASSIC_BOOKS
};

// Unified alias for the Master Textbook
export const MASTER_TEXTBOOK_JOY_OF_THE_LORD = MASTER_15_CHAPTER_TEXTBOOK;

// Master 15-Chapter Textbook (>25 pages per chapter, >400 pages in MS Word) placed first,
// followed by the two study volumes and the 200 distinct 5-page expository messages
export const INITIAL_BOOKS: Book[] = [
  MASTER_15_CHAPTER_TEXTBOOK,
  BOOK_1_JOY_OF_THE_LORD,
  BOOK_2_WELLS_OF_SALVATION,
  ...LIBRARY_200_MESSAGES
];

export const ALL_BOOKS: Book[] = INITIAL_BOOKS;
export const BISMARK_BOOKS: Book[] = INITIAL_BOOKS;
