import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UIEmailInput from "./UIEmailInput";

describe("UIEmailInput", () => {
  const baseProps = {
    ariaLabel: "Adresse email",
    onChangeInputValue: vi.fn(),
  };

  it("rend un input de type email avec les bons attributs", () => {
    render(<UIEmailInput {...baseProps} />);
    const input = screen.getByRole("textbox", { name: /adresse email/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveClass("UIEmailInput");
  });

  it("affiche les styles de succès si l'email est valide", () => {
    render(<UIEmailInput {...baseProps} />);
    const input = screen.getByRole("textbox", { name: /adresse email/i });

    fireEvent.change(input, { target: { value: "user@example.com" } });

    expect(input).toHaveStyle({
      backgroundColor: "#4fad4f",
      borderColor: "#2a5205",
    });
  });

  it("affiche les styles d'erreur si l'email est invalide", () => {
    render(<UIEmailInput {...baseProps} />);
    const input = screen.getByRole("textbox", { name: /adresse email/i });

    fireEvent.change(input, { target: { value: "invalidemail" } });

    expect(input).toHaveStyle({
      backgroundColor: "#ff7676",
      borderColor: "#750909",
    });
  });

  it("appelle onChangeInputValue à chaque modification", () => {
    const handleChange = vi.fn();
    render(<UIEmailInput {...baseProps} onChangeInputValue={handleChange} />);
    const input = screen.getByRole("textbox", { name: /adresse email/i });

    fireEvent.change(input, { target: { value: "a@b.c" } });
    expect(handleChange).toHaveBeenCalledWith("a@b.c");
  });
});
