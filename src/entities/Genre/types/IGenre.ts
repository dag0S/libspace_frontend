export interface IGenre {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  bookId: string | null;
}
