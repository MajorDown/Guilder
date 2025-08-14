import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UILastnameInput from "./UILastnameInput";
import { describe, expect, it, vi } from "vitest";
import React from "react";

describe("UILastnameInput", () => {
  it("rend un input avec le placeholder et la classe appropriée", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<UILastnameInput inputRef={ref} />);
    const input = screen.getByPlaceholderText("ex : De Vilaine");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("UILastnameInput");
  });

  it("accepte un nom valide et applique les styles de succès", async () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<UILastnameInput inputRef={ref} />);
    const input = screen.getByPlaceholderText("ex : De Vilaine");

    fireEvent.change(input, { target: { value: "Martin" } });

    await waitFor(() => {
      expect(input).toHaveStyle("background-color: #4fad4f");
      expect(input).toHaveStyle("border-color: #2a5205");
    });
  });

  it("rejette un nom invalide et applique les styles d’erreur", async () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<UILastnameInput inputRef={ref} />);
    const input = screen.getByPlaceholderText("ex : De Vilaine");

    fireEvent.change(input, { target: { value: "martin" } });

    await waitFor(() => {
      expect(input).toHaveStyle("background-color: #ff7676");
      expect(input).toHaveStyle("border-color: #750909");
    });
  });

  it("appelle onChangeInputValue si fourni", async () => {
    const ref = React.createRef<HTMLInputElement>();
    const handleChange = vi.fn();
    render(<UILastnameInput inputRef={ref} onChangeInputValue={handleChange} />);
    const input = screen.getByPlaceholderText("ex : De Vilaine");

    fireEvent.change(input, { target: { value: "Dupont" } });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith("Dupont");
    });
  });
});
