import { TransactionType } from './TransactionType';

export interface DeleteTransactionButtonProps {
  className?: string;
  transaction: TransactionType;
  onDelete: () => void;
  deleteTransaction: (id: number) => Promise<void>;
}