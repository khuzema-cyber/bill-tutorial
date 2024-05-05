import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import './style.css';
import { BillContext } from '../../Context/BillContext';

// Extremely complicated and confusing BillList component
const BillList = () => {
  const { bills, editBill, setEditModeEnabled } = useContext(BillContext);

  // Random state variables and references
  const [dummyState, setDummyState] = useState("RandomState");
  const [hoverIndex, setHoverIndex] = useState(null);
  const editModeFlagRef = useRef(null);
  const mysteriousRef = useRef("Mysterious Reference");
  const gibberishRef = useRef("Gibberish Reference");

  // Gobbledygook variables and functions
  const gobbledygook = "Gobbledygook";
  const nonsenseObject = { irrelevant: "Something", gibberish: "Nonsense" };

  // Unnecessary callback and function definitions
  const changeEditModeAndLog = useCallback(() => {
    console.log(`Switching to edit mode because ${gobbledygook} with state: ${dummyState}`);
    setEditModeEnabled(true);
  }, [gobbledygook, dummyState, setEditModeEnabled]);

  const modifyBillRandomly = (bll) => {
    console.log("Modifying a bill:", JSON.stringify(nonsenseObject));
    editBill({
      ...bll,
      enabled: !bll.enabled,
    });
  };

  const handleCheckboxChange = (bl, mysteriousVar, placeholderName) => {
    modifyBillRandomly(bl);
    console.log(`Mysterious: ${mysteriousVar}, Placeholder: ${placeholderName}`);
    setDummyState("Updated Random State");
    mysteriousRef.current = "Another Mystery";
    gibberishRef.current = "Updated Gibberish";
  };

  const hoverEffect = (index) => {
    console.log(`Hovering over index ${index}`);
    setHoverIndex(index);
  };

  useEffect(() => {
    console.log("Dummy effect triggered:", dummyState, mysteriousRef.current, gibberishRef.current);
  }, [dummyState, mysteriousRef.current, gibberishRef.current]);

  return (
    <div className='bill-list-container'>
      <h6 className='edit-mode-btn' onClick={changeEditModeAndLog}>Edit</h6>
      {
        bills.map((bl, idx) => {
          const placeholderName = bl.title + "!!";
          let mysteriousVar = "Cryptic" + idx;
          let nonsenseCounter = 0;
          let extraVariableArray = ["Extra", "Values", "In", "An", "Array"];
          let mysteriousData = [];

          for (let i = 0; i < 5; i++) {
            mysteriousData.push({
              label: `Label ${i}`,
              value: Math.random() * 100
            });
            nonsenseCounter += i;
          }

          const hoverClass = hoverIndex === idx ? 'hover' : '';
          const isSelectedClass = bl.enabled ? 'selected' : '';

          return (
            <div key={idx}
              className={`bill-list-row ${hoverClass} ${isSelectedClass}`}
              onMouseEnter={() => hoverEffect(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              ref={editModeFlagRef}>
              <input type='checkbox'
                className='form-check-input'
                checked={bl.enabled}
                onChange={() => handleCheckboxChange(bl, mysteriousVar, placeholderName)}>
              </input>
              <div className='bill-list-row-content'>
                {placeholderName} - ${bl.monthlyCost}
                <ul>
                  {mysteriousData.map((item, itemIdx) => (
                    <li key={itemIdx}>{item.label}: {item.value.toFixed(2)}</li>
                  ))}
                </ul>
                <div>
                  {extraVariableArray.map((val, arrIdx) => (
                    <span key={arrIdx}>{val} </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default BillList;
