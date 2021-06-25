export interface User {
  jwt?: string;
  user: {
    id: number;
    username: string;
    email: string;
    admin: boolean;
    blocked: boolean;
    confirmed: boolean;
    created_at: string;
    provider: string;
    role: { id: number; name: string; description: string; type: string };
    updated_at: string;
  };
}
