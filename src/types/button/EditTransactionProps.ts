import { TransactionType } from './TransactionType';

export interface EditTransactionProps {
    transaction: TransactionType;
    className?: string;
    updateTransaction: (id: number, updatedData: object) => Promise<void>;
    onUpdate: () => void;
}
