import { useState } from "react";

export const Calc = () => {
  const [amountOfGel, setAmountOfGel] = useState(1);

  return (
    <div>
      <h1>calc</h1>
      <label>
        amount per gel (μL):{" "}
        <input
          type="range"
          min="1"
          max="100"
          onChange={(e) => setAmountOfGel(e.target.value)}
        />
      </label>
      <span>{amountOfGel} μL</span>
    </div>
  );
};
