import { render, screen, fireEvent } from "@testing-library/react";
import UIButton from "./UIButton";
import { describe, expect, it, vi } from "vitest";

describe("UIButton", () => {
  it("affiche son contenu", () => {
    render(<UIButton>Cliquer ici</UIButton>);
    expect(screen.getByRole("button", { name: /cliquer ici/i })).toBeInTheDocument();
  });

  it("ajoute la classe isActive si isActive=true", () => {
    render(<UIButton isActive>Actif</UIButton>);
    expect(screen.getByRole("button", { name: /actif/i })).toHaveClass("isActive");
  });

  it("passe les props HTML au bouton", () => {
    const handleClick = vi.fn();
    render(<UIButton onClick={handleClick}>Test</UIButton>);

    fireEvent.click(screen.getByRole("button", { name: /test/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("combine la classe passée via className", () => {
    render(<UIButton className="extra-class">Test</UIButton>);
    const button = screen.getByRole("button", { name: /test/i });
    expect(button).toHaveClass("UIButton");
    expect(button).toHaveClass("extra-class");
  });
});
