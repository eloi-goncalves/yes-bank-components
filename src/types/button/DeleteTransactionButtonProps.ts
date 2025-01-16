import { TransactionType } from './TransactionType';
import { Transaction } from '../container/ContainerProps';

export interface DeleteTransactionButtonProps {
  className?: string;
  transaction: TransactionType;
  onDelete: () => void;
  deleteTransaction: (id: number | string) => void;
}