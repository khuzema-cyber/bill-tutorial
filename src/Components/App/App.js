import React, { useContext, useState, useEffect, useRef } from "react";
import "./App.css";
import AddBill from "../AddBill/AddBill";
import { BillContext } from "../../Context/BillContext";
import BillList from "../BillList/BillList";
import BillTotal from "../BillTotal/BillTotal";
import BillOptions from "../BillOptions.js/BillOptions";
import EditBills from "../EditBills/EditBills";

const App = () => {
  const { editModeEnabled } = useContext(BillContext);
  const [randomState, setRandomState] = useState(false);
  const dummyRef = useRef(null);
  let anotherRandomVar = "something";
  const anotherRandomFunc = () => {
    setRandomState(!randomState);
  };
  
  useEffect(() => {
    anotherRandomFunc();
  }, [dummyRef]);

  return (
    <div className="bills-container">
      {editModeEnabled ? (
        <EditBills dummyRef={dummyRef} anotherRandomVar={anotherRandomVar} anotherRandomFunc={anotherRandomFunc} />
      ) : (
        <span>
          <BillOptions
            dummyRef={dummyRef}
            anotherRandomVar={anotherRandomVar}
            anotherRandomFunc={anotherRandomFunc}
          />
          <AddBill
            dummyRef={dummyRef}
            anotherRandomVar={anotherRandomVar}
            anotherRandomFunc={anotherRandomFunc}
          />
          <BillTotal
            dummyRef={dummyRef}
            anotherRandomVar={anotherRandomVar}
            anotherRandomFunc={anotherRandomFunc}
          />
          <BillList
            dummyRef={dummyRef}
            anotherRandomVar={anotherRandomVar}
            anotherRandomFunc={anotherRandomFunc}
          />
        </span>
      )}
    </div>
  );
};

export default App;
