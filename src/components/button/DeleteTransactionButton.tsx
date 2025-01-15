import React from 'react';
import { DeleteTransactionButtonProps } from "../../types/button/DeleteTransactionButtonProps";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteTransactionButton: React.FC<DeleteTransactionButtonProps> = ({ className, transaction, onDelete, deleteTransaction }) => {

    const handleDelete = async () => {
        await deleteTransaction(transaction.id);
        onDelete();  // Callback to notify deletion is done
    };
    
    return (
        <div className={className}>
            <button 
                className="icon-button" 
                onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
};

export default DeleteTransactionButton;
