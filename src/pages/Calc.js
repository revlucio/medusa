import { useState } from "react";
import styled from "styled-components";

const Page = styled.main`
  margin: 50px;
  display: flex;
  flex-direction: column;
`;

const PeptideContainer = styled.div`
  border: 1px solid black;
  margin: 10px;
  padding: 5px;
  text-align: center;
`;

const Peptides = styled.div`
  display: flex;
`;

const Peptide = ({ peptide }) => (
  <PeptideContainer>
    <strong>{peptide.name}</strong>
    <div>Molecular weight: {peptide.molecularWeight}</div>
    <div>Purity: {peptide.purity}%</div>
  </PeptideContainer>
);

const calcMass = (peptide, totalMoles) =>
  (peptide.molecularWeight / peptide.purity) * 100 * totalMoles;

const PeptideAmount = ({ peptide, totalMoles, adjustedAmountOfGel }) => (
  <PeptideContainer>
    <strong>{peptide.name}</strong>
    <div>
      {calcMass(peptide, totalMoles).toFixed(4)}
      mg in {Math.round(adjustedAmountOfGel / 2)} μL
    </div>
  </PeptideContainer>
);

const Calculated = styled.fieldset`
  color: gray;
`;

export const Calc = () => {
  const [amountOfGel, setAmountOfGel] = useState(50);
  const [numberOfGels, setNumberOfGels] = useState(1);
  const [solidContent, setSolidContent] = useState(10);
  const peg4Npc = {
    name: "PEG4NPC",
    molecularWeight: 10275,
    purity: 89,
  };
  const kdwrk = {
    name: "KDWRK",
    molecularWeight: 876.972 * 4,
    purity: 98,
  };
  const peg4Vs = {
    name: "PEGVS",
    molecularWeight: 10275,
    purity: 99.2,
  };

  const adjustedAmountOfGel = amountOfGel * 1.1;
  const theoreticalSolidContent = adjustedAmountOfGel * (solidContent / 100);
  const totalMolecularWeight =
    peg4Npc.molecularWeight + kdwrk.molecularWeight + peg4Vs.molecularWeight;

  const totalMoles = theoreticalSolidContent / totalMolecularWeight;
  return (
    <Page>
      <h1>Gel Calc</h1>
      <div>
        <label>
          Amount per gel (μL):{" "}
          <input
            type="range"
            min="1"
            max="100"
            onChange={(e) => setAmountOfGel(e.target.value)}
          />
        </label>
        <span>{amountOfGel} μL</span>
      </div>
      <div>
        <label>
          Solid content (%):{" "}
          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            onChange={(e) => setSolidContent(e.target.value)}
          />
        </label>
        <span>{solidContent}%</span>
      </div>

      <Peptides>
        <div>
          <h2>A</h2>
          <Peptide peptide={peg4Npc} />
          <Peptide peptide={kdwrk} />
        </div>
        <div>
          <h2>B</h2>
          <Peptide peptide={peg4Vs} />
        </div>
      </Peptides>

      <Calculated>
        <legend>Calculated</legend>
        <div>Adjusted volume: {Math.round(adjustedAmountOfGel)}μL</div>
        <div>
          Theoretical solid content: {theoreticalSolidContent.toFixed(3)}
        </div>
        <div>Total molecular weight: {totalMolecularWeight}</div>
        <div>Total moles: {totalMolecularWeight} mmol</div>
      </Calculated>

      <Peptides>
        <PeptideAmount
          peptide={kdwrk}
          totalMoles={totalMoles}
          adjustedAmountOfGel={adjustedAmountOfGel}
        />
        <PeptideAmount
          peptide={peg4Vs}
          totalMoles={totalMoles}
          adjustedAmountOfGel={adjustedAmountOfGel}
        />
      </Peptides>

      <div>
        <label>
          How many gels
          <input
            type="range"
            min="1"
            max="100"
            defaultValue="1"
            onChange={(e) => setNumberOfGels(e.target.value)}
          />
        </label>
        <span>{numberOfGels} gels</span>
      </div>

      <Peptides>
        <PeptideAmount
          peptide={kdwrk}
          totalMoles={totalMoles * numberOfGels}
          adjustedAmountOfGel={adjustedAmountOfGel * numberOfGels}
        />
        <PeptideAmount
          peptide={peg4Vs}
          totalMoles={totalMoles * numberOfGels}
          adjustedAmountOfGel={adjustedAmountOfGel * numberOfGels}
        />
      </Peptides>
    </Page>
  );
};
