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

const Peptide = ({ peptide, onClick }) => (
  <PeptideContainer onClick={onClick}>
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
      mg in {(adjustedAmountOfGel / 2).toFixed(1)} μL
    </div>
  </PeptideContainer>
);

const Calculated = styled.fieldset`
  color: gray;
`;

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
const pegAcr = {
  name: "PEG ACR",
  molecularWeight: 10275,
  purity: 99.2,
};

function getTotalMolecularWeight(aPeptides, bPeptides) {
  const aTotal = aPeptides
    .map((peptide) => peptide.molecularWeight)
    .reduce((prev, cur) => prev + cur, 0);

  const bTotal = bPeptides
    .map((peptide) => peptide.molecularWeight)
    .reduce((prev, cur) => prev + cur, 0);

  return aTotal + bTotal;
}

export const Calc = () => {
  const [amountOfGel, setAmountOfGel] = useState(50);
  const [numberOfGels, setNumberOfGels] = useState(1);
  const [solidContent, setSolidContent] = useState(10);

  const aPeptides = [peg4Npc, kdwrk];
  const [bPeptides, setBPeptides] = useState([peg4Vs]);
  const [bRatio, setBRatio] = useState(100);

  const adjustedBPeptides = bPeptides.map((b) => ({
    ...b,
    molecularWeight:
      b.name === "PEGVS"
        ? (b.molecularWeight * bRatio) / 100
        : (b.molecularWeight * (100 - bRatio)) / 100,
  }));

  const adjustedAmountOfGel = amountOfGel * 1.1;
  const theoreticalSolidContent = adjustedAmountOfGel * (solidContent / 100);
  const totalMolecularWeight = getTotalMolecularWeight(
    aPeptides,
    adjustedBPeptides,
  );

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
          {aPeptides.map((a) => (
            <Peptide key={a.name} peptide={a} />
          ))}
        </div>
        <div>
          <h2>B</h2>
          {bPeptides.map((b) => (
            <Peptide
              key={b.name}
              peptide={b}
              onClick={() =>
                setBPeptides(bPeptides.filter((p) => p.name !== b.name))
              }
            />
          ))}
          {bPeptides.length === 1 && (
            <button
              onClick={() => {
                setBPeptides(bPeptides.concat([pegAcr]));
              }}
            >
              Add peptide
            </button>
          )}
          {bPeptides.length > 1 && (
            <label>
              {bRatio}
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="100"
                onChange={(e) => setBRatio(e.target.value)}
              />
              {100 - bRatio}
            </label>
          )}
        </div>
      </Peptides>

      <Calculated>
        <legend>Calculated</legend>
        <div>Adjusted volume: {Math.round(adjustedAmountOfGel)}μL</div>
        <div>
          Theoretical solid content: {theoreticalSolidContent.toFixed(3)} mg
        </div>
        <div>Total molecular weight: {totalMolecularWeight}</div>
        <div>Total moles: {totalMolecularWeight} mmol</div>
      </Calculated>

      <Peptides>
        <div>
          <PeptideAmount
            peptide={kdwrk}
            totalMoles={totalMoles}
            adjustedAmountOfGel={adjustedAmountOfGel}
          />
        </div>
        <div>
          {adjustedBPeptides.map((b) => (
            <PeptideAmount
              peptide={b}
              totalMoles={totalMoles / bPeptides.length}
              adjustedAmountOfGel={adjustedAmountOfGel / bPeptides.length}
            />
          ))}
        </div>
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
        <div>
          <PeptideAmount
            peptide={kdwrk}
            totalMoles={totalMoles * numberOfGels}
            adjustedAmountOfGel={adjustedAmountOfGel * numberOfGels}
          />
        </div>
        <div>
          {adjustedBPeptides.map((b) => (
            <PeptideAmount
              peptide={b}
              totalMoles={(totalMoles / bPeptides.length) * numberOfGels}
              adjustedAmountOfGel={
                (adjustedAmountOfGel / bPeptides.length) * numberOfGels
              }
            />
          ))}
        </div>
      </Peptides>
    </Page>
  );
};
