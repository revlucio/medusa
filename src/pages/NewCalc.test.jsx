import { render, screen } from "@testing-library/react";
import { type } from "@testing-library/user-event/dist/type";
import { NewCalc } from "./NewCalc";

const get = (text) => screen.getByText(text);
const typeByLabel = (label, text) => type(screen.getByLabelText(label), text);

const renderCalc = ({ aPolymer, aPeptide } = {}) => {
  render(<NewCalc aPolymer={aPolymer} aPeptide={aPeptide} />);
  get("Gel calculator");
};

describe("given <Calc />", () => {
  it("when amount is entered, then it is adjusted up by 10%", () => {
    renderCalc();

    typeByLabel("Amount per gel (μL)", "30");

    get("Adjusted volume: 33 μL");
  });

  it("when amount and solid content is entered, then theoretical solid content takes into account adjustments", () => {
    renderCalc();

    typeByLabel("Amount per gel (μL)", "30");
    typeByLabel("Solid content (%)", "2.5");

    get("Theoretical solid content: 0.825 mg");
  });

  it("when no polymer is added to B the total molecular weight only A", () => {
    renderCalc({
      aPolymer: { weight: 1000, purity: 100 },
      aPeptide: { weight: 100, purity: 50 },
    });

    get("Molecular weight: 1000");
    get("Purity: 100%");
    get("Molecular weight: 100");
    get("Purity: 50%");
    get("Total molecular weight: 1400");
  });
});
