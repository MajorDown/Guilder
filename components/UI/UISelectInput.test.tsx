import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UISelectInput, { UISelectInputProps } from "./UISelectInput";
import { describe, it, expect, vi } from "vitest";

describe("UISelectInput", () => {
  const baseProps: UISelectInputProps = {
    ariaLabel: "Choix de catégorie",
    className: "",
    options: [
      { name: "Aucune", value: "" },
      { name: "Option A", value: "A" },
      { name: "Option B", value: "B" },
    ],
  };

  it("rend toutes les options et l'input avec les bons attributs", () => {
    render(<UISelectInput {...baseProps} />);

    const select = screen.getByRole("combobox", { name: /choix de catégorie/i });
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("name", "password"); // valeur par défaut
    expect(select).toHaveClass("UISelectInput");

    // Vérifie les options
    expect(screen.getByRole("option", { name: "Aucune" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Option A" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Option B" })).toBeInTheDocument();
  });

  it("met à jour la valeur et appelle onChangeInputValue avec la bonne valeur", () => {
    const onChange = vi.fn<(value: string) => void>();

    render(<UISelectInput {...baseProps} onChangeInputValue={onChange} />);

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "B" } });

    expect(select).toHaveValue("B");
    expect(onChange).toHaveBeenCalledWith("B");
  });

  it("ajoute les styles verts si une option est sélectionnée", () => {
    render(<UISelectInput {...baseProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "A" } });

    expect(select).toHaveStyle({
      backgroundColor: "rgba(123, 255, 0, 0.243)",
      borderColor: "rgb(42, 82, 5)",
      color: "rgb(255, 255, 255)",
    });
  });

  it("ne colore pas le champ si aucune valeur n’est sélectionnée", () => {
    render(<UISelectInput {...baseProps} />);

    const select = screen.getByRole("combobox");
    expect(select).not.toHaveStyle({ backgroundColor: "rgba(123, 255, 0, 0.243)" });
  });
});
