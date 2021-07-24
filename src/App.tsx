import { GlobalStyle } from "./styles/global"
import { Header } from "./components/Header"
import { Dashboard } from "./components/Dashboard"
import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal"
import {TransactionsProvider} from "./TransactionsContext"

Modal.setAppElement('#root');

export function App() {
  const [isNewTransacitonModalOpen, setIsNewTransacitonModalOpen] = useState(false);

  function handleOpenNewTransacitonModal() {
    setIsNewTransacitonModalOpen(true)
  }

  function handleCloseNewTransacitonModal() {
    setIsNewTransacitonModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransacitonModal} />

      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransacitonModalOpen}
        onRequestClose={handleCloseNewTransacitonModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}

