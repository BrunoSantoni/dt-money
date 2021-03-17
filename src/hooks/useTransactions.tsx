import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

type TransactionT = {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
};

type TransationInput = Omit<TransactionT, 'id' | 'createdAt'>;

type TransactionsProviderProps = {
  children: ReactNode;
};

type TransactionsContextData = {
  transactions: TransactionT[];
  createTransaction: (transaction: TransationInput) => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionT[]>([]);

  useEffect(() => {
    api.get('/transactions')
    .then(response => setTransactions(response.data.transactions));
  });

  async function createTransaction(transactionInput: TransationInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return(
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}