import { useState } from "react";
import styled from "styled-components";

const Page = styled.main`
  margin: 50px;
  display: flex;
  flex-direction: column;
`;

export const Calc = () => {
  const [amountOfGel, setAmountOfGel] = useState(1);
  const [solidContent, setSolidContent] = useState(1);

  return (
    <Page>
      <h1>Gel Calc</h1>
      <div>
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
      <div>
        <label>
          solid content (%):{" "}
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
    </Page>
  );
};
