import { render, screen } from "@testing-library/react";
import { type } from "@testing-library/user-event/dist/type";
import { NewCalc } from "./NewCalc";

describe("given <Calc />", () => {
  it("when amount is entered, then it is adjusted up by 10%", () => {
    render(<NewCalc />);
    screen.getByText("Gel calculator");

    type(screen.getByLabelText("Amount per gel (μL)"), "30");

    screen.getByText("Adjusted volume: 33 μL");
  });

  it("when amount and solid content is entered, then theoretical solid content takes into account adjustments", () => {
    render(<NewCalc />);
    screen.getByText("Gel calculator");

    type(screen.getByLabelText("Amount per gel (μL)"), "30");
    type(screen.getByLabelText("Solid content (%)"), "2.5");

    screen.getByText("Theoretical solid content: 0.825 mg");
  });
});
