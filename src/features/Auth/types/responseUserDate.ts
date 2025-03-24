export interface ResponseUserDate {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarURL: string | null;
  role: Role;
}

enum Role {
  ADMIN,
  LIBRARIAN,
  READER,
}
