import { createContext, useEffect, useState,ReactNode } from 'react';
import { api } from './services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createAt: string;

}
interface TransactionsProviderPropos{
    children: ReactNode;
}

type TransactionImput = Omit<Transaction, 'id' | 'createAt'>

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionImput) => Promise<void>;
}


export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({children}: TransactionsProviderPropos){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    
    useEffect(() => {
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionImput: TransactionImput){

      const response = await api.post('/transactions', {
          ...transactionImput, 
          createAt: new Date()
        });

      const {transaction} = response.data
      

      setTransactions([
          ...transactions,
          transaction
      ])
      
    }


    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

