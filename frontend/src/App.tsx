import { useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext';
import Login from './Login';

function App() {
  interface Expense {
    id: string;
    details: string;
    cents: number;
  }

  const { token, logout } = useContext(AuthContext);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [details, setDetails] = useState('');
  const [dollars, setDollars] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [modalDetails, setModalDetails] = useState('');
  const [modalDollars, setModalDollars] = useState(0);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:4343/api/expenses/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const createExpense = async () => {
    try {
      const response = await fetch('url goes here!', {
        method: 'method',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ details, cents: dollars * 100 })
      });
      const newExpense = await response.json();
      setExpenses([...expenses, { id: newExpense.id, details, cents: dollars * 100 }]);
      setDetails('');
      setDollars(0);
    } catch (error) {
      console.error('Error creating expense:', error);
      alert('Error creating expense. Check your backend code and try again!');
    }
  };

  const updateExpense = async (id: string) => {
    try {
      await fetch('url goes here! do not forget to append the id!', {
        method: 'method',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ details: modalDetails, cents: modalDollars * 100 })
      });
      fetchExpenses();
      setModalDetails('');
      setModalDollars(0);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Error updating expense. Check your backend code and try again!');
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await fetch('url goes here! do not forget to append the id!', { 
        method: 'method',
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      });
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Error deleting expense. Check your code and try again!');
    }
  };

  const openModal = (expense: Expense) => {
    setCurrentExpense(expense);
    setModalDetails(expense.details);
    setModalDollars(expense.cents / 100);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentExpense(null);
    setModalDetails('');
    setModalDollars(0);
  };

  const formatCentsToDollars = (cents: number) => (cents / 100).toFixed(2);

  if (!token) {
    return <Login />
  }

  return (
    <>
      <div>
        <h2>Expenses</h2>
        <button onClick={() => logout()}>Log Out</button>
        <ul>
          {expenses.map(expense => (
            <li key={expense.id}>
              {expense.details} - ${formatCentsToDollars(expense.cents)}
              <button onClick={() => openModal(expense)}>Edit</button>
              <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Details"
        />
        <input
          type="number"
          step="0.01"
          value={dollars}
          onChange={(e) => setDollars(Number(e.target.value))}
          placeholder="Dollars"
        />
        <button onClick={createExpense}>Add Expense</button>
      </div>

      {isModalOpen && currentExpense && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Expense</h2>
            <input
              type="text"
              value={modalDetails}
              onChange={(e) => setModalDetails(e.target.value)}
              placeholder="Details"
            />
            <input
              type="number"
              step="0.01"
              value={modalDollars}
              onChange={(e) => setModalDollars(Number(e.target.value))}
              placeholder="Dollars"
            />
            <button onClick={() => updateExpense(currentExpense.id)}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App;
