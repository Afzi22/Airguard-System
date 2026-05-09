/// <reference types="vitest" />
import type { AxeResults } from 'axe-core'

// Augment Vitest's Assertion interface to include jest-axe's toHaveNoViolations matcher
declare module 'vitest' {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void
  }
}

// Suppress the implicit-any error for jest-axe (no bundled types in v9)
declare module 'jest-axe' {
  import type { RunOptions, Spec, ImpactValue, Result } from 'axe-core'

  export interface JestAxeConfigureOptions extends RunOptions {
    globalOptions?: Spec | undefined
    impactLevels?: ImpactValue[]
  }

  export type JestAxe = (
    html: Element | string,
    options?: RunOptions
  ) => Promise<AxeResults>

  export const axe: JestAxe
  export function configureAxe(options?: JestAxeConfigureOptions): JestAxe

  export interface AssertionsResult {
    actual: Result[]
    message(): string
    pass: boolean
  }

  export type IToHaveNoViolations = (
    results?: Partial<AxeResults>
  ) => AssertionsResult

  export const toHaveNoViolations: {
    toHaveNoViolations: IToHaveNoViolations
  }
}
