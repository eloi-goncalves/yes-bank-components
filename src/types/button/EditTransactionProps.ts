import { TransactionType } from './TransactionType';
import { Transaction } from '../container/ContainerProps';

export interface EditTransactionProps {
    transaction: TransactionType;
    className?: string;
    updateTransaction: (id: number | string , transaction: Transaction) => void;
    onUpdate: () => void;
}
