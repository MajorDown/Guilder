import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock du router Next.js pour éviter les erreurs dans les composants qui l'utilisent
vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<any>("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
  };
});
