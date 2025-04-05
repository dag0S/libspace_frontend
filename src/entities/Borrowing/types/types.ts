import { IBook } from "../../Book";

export interface IBorrowing {
  id: string;
  userId: string;
  bookId: string;
  book: IBook;
  borrowedAt: Date;
  dueDate: Date;
  returnedAt: Date | null;
}

export interface IBorrowData {
  userId: string;
  bookId: string;
}
