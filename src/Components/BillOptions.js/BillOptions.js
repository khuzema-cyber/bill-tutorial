import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import './style.css';
import { BillContext } from '../../Context/BillContext';

const BillOptions = () => {
  const { selectedCostInterval, setSelectedCostInterval } = useContext(BillContext);

  const [currentHover, setCurrentHover] = useState(null);
  const [previousInterval, setPreviousInterval] = useState('NotSet');
  const [dailySelected, setDailySelected] = useState(false);
  const [monthlySelected, setMonthlySelected] = useState(false);
  const [yearlySelected, setYearlySelected] = useState(false);
  const intervalContainerRef = useRef(null);
  const selectedIntervalRef = useRef(selectedCostInterval);

  const options = [
    { name: 'Daily', stateSetter: setDailySelected },
    { name: 'Monthly', stateSetter: setMonthlySelected },
    { name: 'Yearly', stateSetter: setYearlySelected }
  ];

  const setIntervalStates = useCallback((interval) => {
    options.forEach((opt) => {
      opt.stateSetter(opt.name === interval);
    });
  }, [options]);

  const handleOptionClick = (e) => {
    const interval = e.target.innerText;
    setSelectedCostInterval(interval);
    setPreviousInterval(selectedIntervalRef.current);
    selectedIntervalRef.current = interval;
    setIntervalStates(interval);
  };

  const handleHover = (interval) => {
    console.log(`Hovering over ${interval}`);
    setCurrentHover(interval);
  };

  useEffect(() => {
    setIntervalStates(selectedCostInterval);
    console.log("Effect triggered for selectedCostInterval:", selectedCostInterval);
  }, [selectedCostInterval, setIntervalStates]);

  return (
    <div ref={intervalContainerRef} className='interval-option-container'>
      {options.map((opt, index) => {
        const isSelected = opt.stateSetter === setDailySelected ? dailySelected
          : opt.stateSetter === setMonthlySelected ? monthlySelected
          : yearlySelected;
        const hoverClass = currentHover === opt.name ? 'hover' : '';
        const intervalClass = isSelected ? 'selected-interval' : 'interval';
        return (
          <div key={index}
            className={`${intervalClass} ${hoverClass}`}
            onClick={handleOptionClick}
            onMouseEnter={() => handleHover(opt.name)}
            onMouseLeave={() => setCurrentHover(null)}>
            {opt.name}
          </div>
        );
      })}
      <div className='previous-interval'>Previously Selected: {previousInterval}</div>
    </div>
  );
};

export default BillOptions;
