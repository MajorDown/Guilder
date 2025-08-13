import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UISwitch, { UISwitchProps } from "./UISwitch";
import { describe, vi, beforeEach, it, expect } from "vitest";

describe("UISwitch", () => {
  const baseProps: UISwitchProps = {
    options: ["Oui", "Non"],
    value: true,
    onChange: vi.fn(),
    minWidth: "120px",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rend le switch avec la valeur initiale et les bons styles", () => {
    const { container } = render(<UISwitch {...baseProps} />);

    expect(screen.getByText("Oui")).toBeInTheDocument();

    const root = container.querySelector(".UISwitch") as HTMLDivElement;
    expect(root).toBeTruthy();
    expect(root).toHaveStyle({ minWidth: "120px" });

    // ✅ couleur rgba attendue
    expect(root.style.backgroundColor).toBe("rgba(123, 255, 0, 0.243)");

    const knob = container.querySelector(".UISwitchBtn") as HTMLDivElement;
    expect(knob).toBeTruthy();
    expect(knob.style.left).toBe("100%");
    expect(knob.style.transform).toBe("translateX(-100%)");
  });

  it("toggle en cliquant sur le conteneur et appelle onChange avec la nouvelle valeur", () => {
    const onChange = vi.fn<(v: boolean) => void>();
    const { container } = render(<UISwitch {...baseProps} onChange={onChange} />);

    const root = container.querySelector(".UISwitch") as HTMLDivElement;

    fireEvent.click(root);

    expect(onChange).toHaveBeenCalledWith(false);
    expect(screen.getByText("Non")).toBeInTheDocument();

    // ✅ couleur rgba attendue
    expect(root.style.backgroundColor).toBe("rgba(255, 0, 0, 0.243)");

    const knob = container.querySelector(".UISwitchBtn") as HTMLDivElement;
    expect(knob.style.left).toBe("0%");
    expect(knob.style.transform).toBe("translateX(5%)");
  });

  it("toggle aussi en cliquant sur le label (p) et le bouton (div)", () => {
    const onChange = vi.fn<(v: boolean) => void>();
    const { container } = render(<UISwitch {...baseProps} onChange={onChange} />);

    const label = screen.getByText("Oui");
    fireEvent.click(label);
    expect(onChange).toHaveBeenCalledWith(false);
    expect(screen.getByText("Non")).toBeInTheDocument();

    const knob = container.querySelector(".UISwitchBtn") as HTMLDivElement;
    fireEvent.click(knob);
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(screen.getByText("Oui")).toBeInTheDocument();

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("utilise les libellés fournis dans options pour true/false", () => {
    const props: UISwitchProps = {
      ...baseProps,
      options: ["ON", "OFF"],
      value: false,
    };
    const { container } = render(<UISwitch {...props} />);

    expect(screen.getByText("OFF")).toBeInTheDocument();

    const root = container.querySelector(".UISwitch") as HTMLDivElement;
    fireEvent.click(root);
    expect(screen.getByText("ON")).toBeInTheDocument();
  });
});
