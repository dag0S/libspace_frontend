export interface IBookWithGenresAndAuthor {
  id: string;
  title: string;
  description: string;
  bookCoverURL: string | null;
  authorId: string;
  copies: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
  };
  genres: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    bookId: string | null;
  }[];
}
