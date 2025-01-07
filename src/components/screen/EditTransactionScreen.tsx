import React, { useState, useEffect } from 'react';
import { EditTransactionProps } from "../../types/button/EditTransactionProps";
import LookupField  from ".././field/LookupField"; 
import NumberField from '../field/NumberField';
import TextField from '../field/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faPen } from '@fortawesome/free-solid-svg-icons';

const EditTransactionScreen: React.FC<EditTransactionProps> = ({ className, transaction, onUpdate, updateTransaction }) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(transaction.description);
  const [amount, setAmount] = useState<number>(transaction.amount);
  const [type, setType] = useState<string>(transaction.type);

  useEffect(() => {
      if (transaction) {
          setDescription(transaction.description);
          setAmount(transaction.amount);
          setType(transaction.type);
      }
  }, [transaction]);

  const handleButtonClick = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  const handleUpdate = async () => {
      const updatedData = { description, amount, type };
      await updateTransaction(transaction.id, updatedData);
      onUpdate();
      closeModal();
  };

  return (
      <div className={className}>
          <button className="icon-button" onClick={handleButtonClick}>
              <FontAwesomeIcon icon={faPen} />
          </button>

          {isModalOpen && (
              <div className="edit-modal">
                  <div className="modal-content">
                      <span className="close" onClick={closeModal}>&times;</span>
                      <h3>Transaction Details</h3>
                      <div>
                          <TextField 
                              id="destinatario"
                              className="text-field"
                              label="Destinatário"
                              placeholder="Insira o nome do destinatário"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)} 
                          />
                      </div>
                      <div className="edit-fields-line">
                          <NumberField 
                              id="valor"
                              className="number-field"
                              label="Valor"
                              placeholder="00,00"
                              value={amount}
                              onChange={(e) => setAmount(Number(e.target.value))}
                          />
                          <LookupField 
                              id="tipo-transacao"
                              className="lookup-field"
                              label="Tipo de transação"
                              options={["PIX", "TED"]}
                              placeholder="Selecione o tipo de transação"
                              value={type}
                              onChange={(e) => setType(e.target.value)} 
                          />
                      </div>
                      <div className="update-button">
                          <button className="primary" onClick={handleUpdate}>
                              Atualizar transação
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
};

export default EditTransactionScreen;