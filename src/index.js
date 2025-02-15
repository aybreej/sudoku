import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./Sudoku";
import Sudoku from "./Sudoku";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Sudoku />
  </StrictMode>
);