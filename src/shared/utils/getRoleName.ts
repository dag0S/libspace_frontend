import { Role } from "../types";

export const getRoleName = (role: Role) => {
  switch (role) {
    case "ADMIN":
      return "Администратор";
    case "LIBRARIAN":
      return "Библиотекарь";
    case "READER":
      return "Читатель";
    default:
      return "Нет роли";
  }
};
