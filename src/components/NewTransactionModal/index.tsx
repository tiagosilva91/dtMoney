import Modal from 'react-modal';
import { Container, RadioButton, TransactionTypeContainer } from './styles'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'
import { FormEvent, useContext, useState } from 'react';
import { TransactionsContext } from '../../TransactionsContext';

export interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const {createTransaction} = useContext(TransactionsContext);

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

   async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();
        
        await createTransaction({
            title,
            amount,
            category,
            type
        })
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
        
    }

    function restartModal(){
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={restartModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" 
            onClick={restartModal}
            className="react-modal-close">
                <img src={closeImg} alt="Fechar Modal"  />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input
                    placeholder="Titulo"
                    value={title}
                    onChange={event => setTitle(event.target.value)}

                />

                <input
                    
                    placeholder="Valor"
                    value={amount}
                    type="number"
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>

                    <RadioButton
                        type="button"
                        isActive={type === 'deposit'}
                        aciveColor='green'
                        onClick={() => {setType('deposit')} }>
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>

                    </RadioButton>

                    <RadioButton
                        type="button"
                        isActive={type === 'withdraw'}
                        aciveColor='red'
                        onClick={() => {setType('withdraw')} }>
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saida</span>

                    </RadioButton>
                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>

        </Modal>

    );
}