import { useState } from "react";

const calcMass = (compound, totalMoles) =>
  (compound.weight / compound.purity) * 100 * totalMoles;

export const NewCalc = ({ aPolymer, aPeptide }) => {
  const [gelAmount, setGelAmount] = useState();
  const [solidContent, setSolidContent] = useState();
  const [bPolymer, setBPolymer] = useState();

  const polymer = aPolymer ?? { weight: 0, purity: 0 };
  const peptide = aPeptide ?? { weight: 0, purity: 0 };

  const adjustedVolume = gelAmount * 1.1;
  const theoreticalSolidContent = (adjustedVolume * solidContent) / 100;
  const totalMolecularWeight = polymer.weight + peptide.weight * 4;
  const totalMoles = theoreticalSolidContent / totalMolecularWeight;

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

      <div>
        <div>Molecular weight: {polymer.weight}</div>
        <div>Purity: {polymer.purity}%</div>
      </div>
      <div>
        <div>Molecular weight: {peptide.weight}</div>
        <div>Purity: {peptide.purity}%</div>
      </div>

      <button onClick={() => setBPolymer({ weight: 600, purity: 100 })}>
        Add PEG 600
      </button>

      {bPolymer && (
        <div>
          <div>Molecular weight: 600</div>
          <div>Purity: 100%</div>
        </div>
      )}

      <div>Adjusted volume: {adjustedVolume} μL</div>
      <div>
        Theoretical solid content: {theoreticalSolidContent.toFixed(3)} mg
      </div>
      <div>Total molecular weight: {totalMolecularWeight}</div>

      {bPolymer && (
        <div>
          <div>
            {calcMass(
              { weight: peptide.weight * 4, purity: peptide.purity },
              totalMoles,
            ).toFixed(3)}{" "}
            mg in {adjustedVolume / 2} μL
          </div>
          <div>
            {calcMass(bPolymer, totalMoles).toFixed(3)} mg in{" "}
            {adjustedVolume / 2} μL
          </div>
        </div>
      )}
    </>
  );
};
