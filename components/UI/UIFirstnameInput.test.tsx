import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UIFirstnameInput from "./UIFirstnameInput";
import { describe, expect, it, vi } from "vitest";

describe("UIFirstnameInput", () => {
  const baseProps = {
    inputRef: { current: null },
    "aria-label": "Prénom",
  };

  it("rend un input avec le placeholder et la classe appropriée", () => {
    render(<UIFirstnameInput {...baseProps} />);
    const input = screen.getByPlaceholderText("ex : Jean-Claude");

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("UIFirstnameInput");
  });

  it("accepte un prénom valide et applique les styles de succès", () => {
    render(<UIFirstnameInput {...baseProps} />);
    const input = screen.getByPlaceholderText("ex : Jean-Claude");

    fireEvent.change(input, { target: { value: "Jean-Claude" } });

    expect(input).toHaveStyle({
      backgroundColor: "#4fad4f",
      borderColor: "#2a5205",
    });
  });

  it("rejette un prénom invalide et applique les styles d’erreur", () => {
    render(<UIFirstnameInput {...baseProps} />);
    const input = screen.getByPlaceholderText("ex : Jean-Claude");

    fireEvent.change(input, { target: { value: "jean" } });

    expect(input).toHaveStyle({
      backgroundColor: "#ff7676",
      borderColor: "#750909",
    });
  });

  it("appelle onChangeInputValue avec la bonne valeur", async () => {
    const handleChange = vi.fn();
    render(
      <UIFirstnameInput {...baseProps} onChangeInputValue={handleChange} />
    );
    const input = screen.getByPlaceholderText("ex : Jean-Claude");

    fireEvent.change(input, { target: { value: "Léa" } });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith("Léa");
    });
  });
});
