import { render, screen } from "@testing-library/react";
import { type } from "@testing-library/user-event/dist/type";
import { NewCalc } from "./NewCalc";

const get = (text) => screen.getByText(text);
const typeByLabel = (label, text) => type(screen.getByLabelText(label), text);

const renderCalc = () => {
  render(<NewCalc />);
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

  it("when no polymer is added to B the total molecular weight only includes KDWRK", () => {
    renderCalc();

    get("Total molecular weight: 24057.888");
  });
});
