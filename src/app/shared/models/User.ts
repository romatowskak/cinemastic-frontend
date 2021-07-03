export interface User {
  jwt?: string;
  user: {
    id: number;
    username: string;
    email: string;
    admin: boolean;
  };
}
