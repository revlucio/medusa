import { useState } from "react";

export const NewCalc = () => {
  const [gelAmount, setGelAmount] = useState();
  const [solidContent, setSolidContent] = useState();

  const adjustedVolume = gelAmount * 1.1;
  const theoreticalSolidContent = (adjustedVolume * solidContent) / 100;

  return (
    <>
      <h1>Gel calculator</h1>
      <label>
        Amount per gel (μL)
        <input type="number" onChange={(e) => setGelAmount(e.target.value)} />
      </label>
      <label>
        Solid content (%)
        <input
          type="number"
          onChange={(e) => setSolidContent(e.target.value)}
        />
      </label>

      <div>Adjusted volume: {adjustedVolume} μL</div>
      <div>
        Theoretical solid content: {theoreticalSolidContent.toFixed(3)} mg
      </div>
      <div>Total molecular weight: 24057.888</div>
    </>
  );
};
