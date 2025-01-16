export type Transaction = {
  id?: number | string;
  amount?: number; 
  type?: string; 
  description?: string, 
  dateTransaction?: Date | string, 
  file?: string
};

type createTransactionAPI = (transaction: Transaction) => Promise<void>;
type getTransactionsAPI = ({ id, description, type } : { id?: number | string, description?: string; type?: string; }) => Promise<Transaction[]>;
type updateTransactionsAPI = (id: number | string, transaction: Transaction) => Promise<Transaction | undefined>;
type deleteTransactionsAPI = (id: number | string) => Promise<Transaction | undefined>;


type externalReactProps = {
  dispatch: any;
  updateTransaction: (transaction: any) => void;
  setTransaction : (transaction: any) => void;
}

export interface ContainerComponentProps {
  componentType?: string;
  className?: string;
  urlUploadPath?: string;
  createTransactionAPI: createTransactionAPI;
  getTransactionsAPI: getTransactionsAPI;
  deleteTransactionsAPI: deleteTransactionsAPI;
  updateTransactionsAPI: updateTransactionsAPI;
  externalReactProps?:  externalReactProps;
}