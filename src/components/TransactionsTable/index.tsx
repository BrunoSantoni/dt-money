import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import * as S from './styles';

type TransactionsT = {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: 'deposit' | 'withdraw';
  createdAt: string;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<TransactionsT[]>([]);

  useEffect(() => {
    api.get('/transactions')
    .then(response => setTransactions(response.data.transactions));
  })

  return(
    <S.Wrapper>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>

              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.amount)}
              </td>

              <td>{transaction.category}</td>


              <td>
                {new Intl.DateTimeFormat('pt-BR', {
                }).format(new Date(transaction.createdAt))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.Wrapper>
  );
}