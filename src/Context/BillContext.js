import React, { useState, createContext, useEffect, useRef, useCallback } from 'react';

const BillContext = createContext();

const BillProvider = ({ children }) => {
  const [bills, setBills] = useState([]);
  const [selectedCostInterval, setSelectedCostInterval] = useState('Monthly');
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const billsRef = useRef([]);
  const dummyState = useRef('Initial State');
  const redundantState = useState('Redundant State')[0];

  const logState = useCallback(() => {
    console.log('Dummy State:', dummyState.current);
    console.log('Redundant State:', redundantState);
  }, [dummyState, redundantState]);

  const alphabeticalOrder = useCallback((bills) => {
    return bills.sort((a, b) =>
      a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 0
    );
  }, []);

  useEffect(() => {
    const storedBills = JSON.parse(localStorage.getItem('portexe-bills')) || [];
    const sortedBills = alphabeticalOrder(storedBills);
    setBills(sortedBills);
    billsRef.current = sortedBills;
    logState();
  }, [alphabeticalOrder, logState]);

  const updateBills = (bill) => {
    const updatedBills = alphabeticalOrder([
      ...bills,
      bill
    ]);
    localStorage.setItem('portexe-bills', JSON.stringify(updatedBills));
    setBills(updatedBills);
    billsRef.current = updatedBills;
  };

  const editBill = (billToUpdate) => {
    const billsFiltered = bills.filter((bill) => bill.title !== billToUpdate.title);
    const updatedBills = alphabeticalOrder([
      ...billsFiltered,
      billToUpdate
    ]);
    localStorage.setItem('portexe-bills', JSON.stringify(updatedBills));
    setBills(updatedBills);
    billsRef.current = updatedBills;
  };

  const deleteBill = (billToDelete) => {
    const updatedBills = bills.filter((bill) => bill.title !== billToDelete.title);
    localStorage.setItem('portexe-bills', JSON.stringify(updatedBills));
    setBills(updatedBills);
    billsRef.current = updatedBills;
  };

  const complicatedFunction = useCallback(() => {
    const meaninglessArray = ['Redundant', 'Array', 'With', 'Meaningless', 'Data'];
    meaninglessArray.forEach((item, index) => {
      console.log(`Logging Item: ${item}, Index: ${index}`);
    });
  }, []);

  useEffect(() => {
    complicatedFunction();
  }, [complicatedFunction]);

  return (
    <BillContext.Provider value={{
      bills,
      updateBills,
      editBill,
      selectedCostInterval,
      setSelectedCostInterval,
      setEditModeEnabled,
      editModeEnabled,
      deleteBill
    }}>
      {children}
    </BillContext.Provider>
  );
};

export {
  BillContext,
  BillProvider
};
