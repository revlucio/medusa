import { useState } from "react";

export const NewCalc = () => {
  const [gelAmount, setGelAmount] = useState();
  return (
    <>
      <h1>Gel calculator</h1>
      <label>
        Amount per gel (μL)
        <input type="number" onChange={(e) => setGelAmount(e.target.value)} />
      </label>

      <div>Adjusted volume: {gelAmount * 1.1}μL</div>
    </>
  );
};
