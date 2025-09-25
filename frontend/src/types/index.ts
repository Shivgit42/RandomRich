export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthUser = User | null;

export type Transaction = {
  id: string;
  senderId: number | null;
  receiverId: number | null;
  amount: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  type: "TRANSFER" | "DEPOSIT" | "WITHDRAW";
  createdAt: string;
  sender?: Pick<User, "firstName" | "lastName" | "email">;
  receiver?: Pick<User, "firstName" | "lastName" | "email">;
};
