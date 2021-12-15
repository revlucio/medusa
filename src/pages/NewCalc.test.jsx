import { render, screen } from "@testing-library/react";
import { type } from "@testing-library/user-event/dist/type";
import { NewCalc } from "./NewCalc";

describe("given <Calc />", () => {
  it("when amount is entered, then it is adjusted up by 10%", () => {
    render(<NewCalc />);
    screen.getByText("Gel calculator");

    type(screen.getByLabelText("Amount per gel (μL)"), "30");

    screen.getByText("Adjusted volume: 33μL");
  });
});
