import React, { useEffect, useState } from "react";
import './Container.css';
import { ContainerComponentProps } from "../../types/container/ContainerProps";

import AttachmentField from "../field/AttachmentField";
import DateField from "../field/DateField";
import EmailField from "../field/EmailField";
import NumberField from "../field/NumberField";
import TextField from "../field/TextField";
import LookupField from "../field/LookupField";
import PasswordField from "../field/PasswordField";
import Menu from "../menu/Menu";
import Modal from  "../modal/Modal";
import InsertTransactionButton from '../button/InsertTransactionButton';
import LoginButton from '../button/LoginButton';
import EditTransactionScreen from '../screen/EditTransactionScreen';
import DeleteTransactionButton from "../button/DeleteTransactionButton";
import FilterIconButton from "../button/FilterIconButton";
import FilterComponent from '../filter/Filter';

// import { useSelector, useDispatch } from "react-redux";
// import { setTransaction, updateTransaction } from '../../store/transactionSlice';


const ContainerComponent: React.FC<ContainerComponentProps>  = ({ componentType, className, createTransactionAPI, deleteTransactionsAPI, getTransactionsAPI, updateTransactionsAPI, externalReactProps, urlUploadPath }) => {
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [type, setType] = useState<string>("PIX");
    const [dateTransaction, setDate] = useState<string>(new Date().toISOString());
    const [file, setFile] = useState<string>("");
    const [transactions, setTransactions] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showFilter, setShowFilter] = useState<boolean>(false);

    // Redux
    // const dispatch = useDispatch();

    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDescription(value);

        if (externalReactProps) {
          externalReactProps.dispatch(externalReactProps.updateTransaction({
              description: value ?? '',
              data: null,
              type: null,
              value: null,
              file: null
          }));
        }
    };

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const onChangeTransactionType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    };

    const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.value);
    };

    const fetchTransactions = async ({ id, description, type } : { id?: number | string, description?: string; type?: string; } = {}) => {
        if (getTransactionsAPI) {
            const data = await getTransactionsAPI({ id, description, type });
            if (data) {
              setTransactions(data);
            }
        }

        setShowFilter(false);
        return null;
    };

    const insertTransaction = async (amount: number, type: string, description: string, dateTransaction: string, file: string) => {
        if (!description || amount <= 0 || !type) {
            setErrorMessage("Todos os campos devem ser preenchidos corretamente.");
            setIsModalOpen(true);
            setTimeout(closeModal, 3000);
            return;
        }

        try {
            setErrorMessage("");
            setSuccessMessage("");
            await createTransactionAPI({ amount, type, description, dateTransaction, file });
            fetchTransactions();
            setSuccessMessage("Transação realizada com sucesso!");
            setIsModalOpen(true);
            setTimeout(closeModal, 2000);
            setDescription("");
            setAmount(0);
            setType("PIX");
        } catch (error) {
            setErrorMessage("Ocorreu um erro ao realizar a transação. Tente novamente.");
            setIsModalOpen(true);
            setTimeout(closeModal, 3000);
        }
    };

    const handleDeleteTransaction = async (id: string) => {
        await deleteTransactionsAPI(id);
        fetchTransactions();
        setSuccessMessage("Transação excluida com sucesso!");
        setIsModalOpen(true);
        setTimeout(closeModal, 2000);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOnClickFilterIcon = () => {
        setShowFilter(true);
        console.log('ShowFilter True');
    }

    useEffect(() => {
        if (componentType === 'extrato-detalhado' || componentType === 'extrato-simplificado') {
            fetchTransactions();
        }
    }, [componentType]);

    switch (componentType) {
        case 'welcome':
            return (
                <div className={`container ${className}`}>
                    <h1>Bem-vinda, Eduarda!</h1>
                </div>
            );
        case 'saldo':
            return (
                <div className="container border-normal">
                    <h2>Saldo</h2>
                    <hr />
                    <a>Conta corrente</a>
                    <br />
                    <div className={className}>
                        <a>2450,34 R$</a>
                    </div>
                </div>
            );
        case 'nova-transacao':
            return (
                <div className={`container ${className}`}>
                    <h2>Nova transação</h2>
                    <div className="fields-gap">
                        <AttachmentField urlUpload={urlUploadPath ?? `http://localhost:3000/api/upload`} onChange={onChangeFile}/>

                        <TextField
                            id="destinatario"
                            className="text-field"
                            label="Nome da transação"
                            placeholder="Insira o nome do destinatário"
                            value={description}
                            onChange={onChangeDescription}
                        />
                        <div className="transaction-gap">
                            <div className="grid-fields">
                                <LookupField
                                    id="tipo-transacao"
                                    className="lookup-field"
                                    label="Tipo de transação"
                                    options={["PIX", "TED"]}
                                    placeholder="Selecione o tipo de transação"
                                    value={type}
                                    onChange={onChangeTransactionType}
                                />
                                <DateField
                                    id={"data-transacao"}
                                    label={"Data da transação"}
                                    className="number-field"
                                    placeholder="00,00"
                                    value={amount}
                                    onChange={onChangeDate}
                                />
                                <NumberField
                                    id="valor"
                                    className="number-field"
                                    label="Valor"
                                    placeholder="00,00"
                                    value={amount}
                                    onChange={onChangeValue}
                                />
                            </div>
                            <div>
                                <InsertTransactionButton
                                    className="insert-transaction"
                                    title="Fazer transação"
                                    action={() => insertTransaction(amount, type, description, dateTransaction, file)}
                                />
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        message={errorMessage || successMessage}
                        onClose={closeModal}
                        type={errorMessage ? 'error' : 'success'}
                    />
                </div>
            );
        case 'extrato-detalhado':
            return (
                <div className="container border-gradient">
                    <div className="header-extrato">
                        <h2>Extrato</h2>
                        <FilterIconButton className={'filter-icon-button-external'} onClick={handleOnClickFilterIcon}/>
                    </div>
                    <hr />
                    <div className={className}>
                        {transactions.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Tipo de transação</th>
                                        <th scope="col">Destinatário</th>
                                        <th scope="col">Valor</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr className="extrato-detalhado" key={transaction.id}>
                                            <td>{transaction.type}</td>
                                            <td>{transaction.description}</td>
                                            <td>{transaction.amount}</td>
                                            <td>
                                                <EditTransactionScreen
                                                    className="update-transaction"
                                                    transaction={transaction}
                                                    onUpdate={fetchTransactions}
                                                    updateTransaction={updateTransactionsAPI}
                                                />
                                            </td>
                                            <td>
                                                <DeleteTransactionButton
                                                    className="update-transaction"
                                                    transaction={transaction}
                                                    onDelete={() => handleDeleteTransaction(transaction.id)}
                                                    deleteTransaction={deleteTransactionsAPI} 
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Nenhuma transação encontrada.</p>
                        )}
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        message={errorMessage || successMessage}
                        onClose={closeModal}
                        type={errorMessage ? 'error' : 'success'}
                    />
                    <FilterComponent showFilter={showFilter} okClick={fetchTransactions}/>
                </div>
            );
        case 'cartao':
            return (
                <div className="container border-gradient-cartao">
                    <h2>Cartão</h2>
                    <hr />
                    <div className={className}>
                        Funcionalidade bloqueada.
                        <br></br>
                        Entre em contato com a central.
                    </div>
                </div>
            );
        case 'menu':
            return (
                <div className={`container ${className}`}>
                    <Menu />
                </div>
            );
        case 'extrato-simplificado':
            return (
                <div className="container border-gradient">
                    <h2>Extrato</h2>
                    <hr />
                    <div className={className}>
                        {transactions.length > 0 ? (
                            <table>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.type} - {transaction.description}</td>
                                            <td></td>
                                            <td>{transaction.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Nenhuma transação encontrada.</p>
                        )}
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        message={errorMessage || successMessage}
                        onClose={closeModal}
                        type={errorMessage ? 'error' : 'success'}
                    />
                </div>
            );
        case 'login':
            return (
                <div className={className}>
                    <form>
                        <TextField id={"nm-usuario"} label={"Nome de usuário"} className="" onChange={()=>{}} placeholder=""/>
                        <PasswordField id={"pswd-usuario"} label={"Nome de usuário"} className="" onChange={()=>{}} placeholder=""/>
                        <LoginButton className="login" />
                    </form>
                </div>
            );
        case 'register':
            return (
                <div className="login">
                    <form>
                        <TextField id={"nm-usuario"} label={"Nome de usuário"} className="" onChange={()=>{}} placeholder=""/>
                        <PasswordField id={"pswd-usuario"} label={"Nome de usuário"} className="" onChange={()=>{}} placeholder=""/>
                        <EmailField id={"email-usuario"} label={"Nome de usuário"}className="" onChange={()=>{}} placeholder="" />
                        <LoginButton className="login" />
                    </form>
                </div>
            );
        default:
            return null;
    }
}

export default ContainerComponent;
