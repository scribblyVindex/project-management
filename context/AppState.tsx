import { useState } from "react";
import { saveAs } from "file-saver";
import AppContext from "./AppContext";

// const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;

const AppState = (props) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({
    success: false,
    message: "Error occured",
  });
  return (
    <AppContext.Provider
      value={{
        open,
        setOpen,
        status,
        setStatus,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
