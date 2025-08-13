import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UITextInput, { UITextInputProps } from "./UITextInput";
import { describe, beforeEach, vi, it, expect } from "vitest";

describe("UITextInput", () => {
  const baseProps: UITextInputProps = {
    ariaLabel: "Champ texte",
    placeholder: "votre saisie",
    className: "",
    conditions: {
      regex: /^[a-z]+$/i,
      error: "Seulement des lettres",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rend l'input avec aria-label, placeholder et title (message d'erreur)", () => {
    render(<UITextInput {...baseProps} />);
    const input = screen.getByRole("textbox", { name: /champ texte/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "votre saisie");
    expect(input).toHaveAttribute("title", "Seulement des lettres");
  });

  it("met à jour la valeur, appelle onChangeInputValue et applique le style VALIDE (vert) quand la regex matche", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: string) => void>();

    render(<UITextInput {...baseProps} onChangeInputValue={onChange} />);
    const input = screen.getByRole("textbox", { name: /champ texte/i });

    await user.type(input, "Hello");

    expect(onChange).toHaveBeenCalled();
    const lastArg = onChange.mock.calls.at(-1)?.[0] ?? "";
    expect(lastArg).toBe("Hello");

    expect(input).toHaveStyle({
      backgroundColor: "#4fad4f",
      borderColor: "#2a5205",
    });
  });

  it("applique le style ERREUR (rouge) quand la valeur ne respecte pas la regex", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: string) => void>();

    render(<UITextInput {...baseProps} onChangeInputValue={onChange} />);
    const input = screen.getByRole("textbox", { name: /champ texte/i });

    await user.clear(input);
    await user.type(input, "Hello123");

    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveStyle({
      backgroundColor: "#ff7676",
      borderColor: "#750909",
    });
  });

  it("retire les styles quand la valeur est vide", async () => {
    const user = userEvent.setup();
    render(<UITextInput {...baseProps} />);
    const input = screen.getByRole("textbox", { name: /champ texte/i });

    await user.type(input, "Abc");
    await user.clear(input);

    expect(input).not.toHaveStyle({ backgroundColor: "#4fad4f" });
    expect(input).not.toHaveStyle({ backgroundColor: "#ff7676" });
  });

  it("expose un pattern conforme à la regex fournie", () => {
    const props: UITextInputProps = {
      ...baseProps,
      conditions: {
        regex: /^\d{4}-\d{2}-\d{2}$/,
        error: "Format AAAA-MM-JJ",
      },
    };
    render(<UITextInput {...props} />);
    const input = screen.getByRole("textbox", { name: /champ texte/i });
    expect(input).toHaveAttribute("pattern", "^\\d{4}-\\d{2}-\\d{2}$");
  });
});
