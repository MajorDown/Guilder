// components/UI/UIGuildNameInput.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UIGuildNameInput from "./UIGuildNameInput";

describe("UIGuildNameInput", () => {
  const baseProps = {
    id: "guildname",
    name: "guildname",
  };

  it("rend un input avec le placeholder et la classe appropriée", () => {
    render(<UIGuildNameInput {...baseProps} />);
    const input = screen.getByPlaceholderText("ex : Collectif85");

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("UIGuildNameInput");
  });

  it("accepte un nom de guilde valide et applique les styles de succès", () => {
    render(<UIGuildNameInput {...baseProps} />);
    const input = screen.getByPlaceholderText("ex : Collectif85");

    fireEvent.change(input, { target: { value: "Guild42" } });

    expect(input).toHaveStyle({
      backgroundColor: "#4fad4f",
      borderColor: "#2a5205",
    });
  });

  it("rejette un nom de guilde invalide et applique les styles d’erreur", () => {
    render(<UIGuildNameInput {...baseProps} />);
    const input = screen.getByPlaceholderText("ex : Collectif85");

    fireEvent.change(input, { target: { value: "guil_de42" } });

    expect(input).toHaveStyle({
      backgroundColor: "#ff7676",
      borderColor: "#750909",
    });
  });

  it("met à jour la valeur de l’input correctement", () => {
    render(<UIGuildNameInput {...baseProps} />);
    const input = screen.getByPlaceholderText("ex : Collectif85");

    fireEvent.change(input, { target: { value: "Guild42" } });

    expect(input).toHaveValue("Guild42");
  });
});
