import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UICounterInput, { UICounterInputProps } from "./UICounterInput";
import { describe, it, expect, vi } from "vitest";

describe("UICounterInput", () => {
  const baseProps: UICounterInputProps = {
    ariaLabel: "Coefficient",
    className: "",
  };

  it("rend un input de type number avec le pas à 0.01", () => {
    render(<UICounterInput {...baseProps} />);
    const input = screen.getByRole("spinbutton", { name: /coefficient/i });

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("step", "0.01");
    expect(input).toHaveValue(0);
  });

  it("met à jour l'affichage et appelle onChangeValue avec le bon nombre", () => {
    const onChange = vi.fn<(v: number) => void>();
    render(<UICounterInput {...baseProps} onChangeValue={onChange} />);

    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "1.75" } });

    expect(input).toHaveValue(1.75);
    expect(onChange).toHaveBeenCalledWith(1.75);
  });

  it("affiche la classe CSS transmise via props", () => {
    render(<UICounterInput {...baseProps} className="custom-style" />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveClass("UICounterInput");
    expect(input).toHaveClass("custom-style");
  });

  it("accepte les props HTML standards (min, max, required...)", () => {
    render(<UICounterInput {...baseProps} min={0} max={10} required />);
    const input = screen.getByRole("spinbutton");

    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "10");
    expect(input).toBeRequired();
  });
});
