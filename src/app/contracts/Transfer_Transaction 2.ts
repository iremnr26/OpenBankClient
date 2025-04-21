export interface Transfer_Transaction {
  id?: number;
  fromAccountId?: number;         // ← ? eklendi
  toAccountId?: number;           // ← ? eklendi
  amount: number;
  description: string;
  transactionDate?: Date;         // ← ? eklendi
  fromAccountNumber?: string;
  toAccountNumber?: string;
}
