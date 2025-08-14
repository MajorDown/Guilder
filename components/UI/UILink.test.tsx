import { render, screen } from "@testing-library/react";
import UILink from "./UILink";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";

describe("UILink", () => {
  it("rend un lien avec le texte et le href corrects", () => {
    render(<UILink href="/accueil" color="green">Accueil</UILink>);
    const link = screen.getByRole("link", { name: "Accueil" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/accueil");
  });

  it("applique la classe de couleur correspondante", () => {
    render(<UILink href="/profil" color="dark">Profil</UILink>);
    const link = screen.getByRole("link", { name: "Profil" });

    expect(link).toHaveClass("UILink", "dark");
  });

  it("gère correctement d'autres couleurs", () => {
    const colors = ["white", "light", "green", "dark"] as const;

    colors.forEach((color) => {
      render(<UILink href={`/${color}`} color={color}>{color}</UILink>);
      const link = screen.getByRole("link", { name: color });

      expect(link).toHaveClass("UILink", color);
    });
  });
});
