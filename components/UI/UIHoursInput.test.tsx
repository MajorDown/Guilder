import { render, fireEvent, screen } from "@testing-library/react";
import UIHoursInput from "./UIHoursInput";
import { describe, expect, it, vi } from "vitest";

describe("UIHoursInput", () => {
  it("affiche les valeurs initiales à 0", () => {
    render(<UIHoursInput onChangeValue={() => {}} />);
    const pTags = screen.getAllByText("0");
    expect(pTags.length).toBeGreaterThanOrEqual(3); // heures, décimales, centièmes
  });

  it("appelle onChangeValue avec la bonne valeur après une incrémentation simple", () => {
    const onChangeMock = vi.fn();
    render(<UIHoursInput onChangeValue={onChangeMock} />);
    const buttons = screen.getAllByText("+");
    fireEvent.mouseDown(buttons[2]); // centièmes +
    expect(onChangeMock).toHaveBeenLastCalledWith(0.01);
  });

  it("incrémente correctement les heures, décimales et centièmes", () => {
    const onChangeMock = vi.fn();
    render(<UIHoursInput onChangeValue={onChangeMock} />);

    const buttons = screen.getAllByText("+");

    fireEvent.mouseDown(buttons[2]); // centièmes +
    fireEvent.mouseDown(buttons[1]); // décimales +
    fireEvent.mouseDown(buttons[0]); // heures +

    const pTags = screen.getAllByText("1");
    expect(pTags.length).toBeGreaterThanOrEqual(3); // 1h, 1d, 1c
    expect(onChangeMock).toHaveBeenLastCalledWith(1.11);
  });

  it("décrémente correctement les centièmes en passant à 9 si 0", () => {
    const onChangeMock = vi.fn();
    render(<UIHoursInput onChangeValue={onChangeMock} />);

    const btnCentimalsDown = screen.getAllByText("-")[2];
    fireEvent.mouseDown(btnCentimalsDown);

    const pTags = screen.getAllByText("9");
    expect(pTags.length).toBeGreaterThanOrEqual(1);

    expect(onChangeMock).toHaveBeenLastCalledWith(23.99); // 23h 9d 9c
  });

  it("réinitialise les heures à 0 après dépassement de 23", () => {
    const onChangeMock = vi.fn();
    render(<UIHoursInput onChangeValue={onChangeMock} />);

    const btnHoursUp = screen.getAllByText("+")[0];

    for (let i = 0; i <= 23; i++) {
      fireEvent.mouseDown(btnHoursUp);
    }

    expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(1);
    expect(onChangeMock).toHaveBeenLastCalledWith(0.00);
  });
});
