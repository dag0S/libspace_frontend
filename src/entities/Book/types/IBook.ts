export interface IBook {
  id: string;
  title: string;
  description: string;
  bookCoverURL: string | null;
  authorId: string;
  copies: number;
  createdAt: Date;
  updatedAt: Date;
}
