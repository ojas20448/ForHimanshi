---
name: impeccable
description: Enforces flawless code execution, strict architectural integrity, type safety, bug prevention, empirical error traceback analysis, and rigorous verification. Activate when writing high-stakes code, refactoring complex modules, or fixing stubborn bugs.
---

# Impeccable Skill: Engineering & Execution Excellence

The `impeccable` skill sets an uncompromising standard for code quality, structural integrity, bug prevention, and empirical verification.

---

## 1. Core Principles

1. **Zero Superficial Symptom Patches**: Never swallow exceptions, return dummy fallback values, comment out assertions, or delete failing tests. Always identify and resolve the true upstream root cause.
2. **Empirical Verification Required**: Never declare a task complete or a bug fixed without running actual build, test, or lint commands to verify clean execution.
3. **No Unchecked Assumptions**: Never infer data structures, API endpoints, function signatures, or variable names from snippets or memory. Inspect the full authoritative definition first.
4. **Defensive Type Safety**: Explicitly verify non-null states, validate props and function parameters, and handle all edge cases to prevent `NullPointerException`, `TypeError`, or `KeyError` crashes.
5. **Preserve Architectural Integrity**: Follow project patterns, maintain existing API contracts, preserve code comments/docstrings, and avoid unnecessary tight coupling.

---

## 2. Execution Guidelines

### Phase 1: Context & Source Inspection
- Before modifying any function or component, view the full definition and surrounding code context.
- Trace upstream dependencies and downstream callers to prevent unintentional side effects.
- Verify exact signatures, imported types, and schema definitions.

### Phase 2: Root-Cause Diagnosis
- If an error occurs, inspect the **full un-truncated log or traceback** before forming hypotheses.
- Analyze the precise line number, stack trace, and variable state.
- Justify every code modification with concrete log evidence.

### Phase 3: Impeccable Implementation
- Write clean, self-documenting code with explicit variable names.
- Scope conditional branches clearly and cover all failure/edge cases.
- Use strong typing and runtime validation schemas (e.g., Zod, TypeScript interfaces) where applicable.

### Phase 4: Automated & Empirical Verification
- Execute build scripts (`npm run build`, `tsc`, `go build`, `pytest`, etc.).
- Run relevant unit, integration, or end-to-end tests.
- Re-check for lint warnings, console errors, or broken layout boundaries.

---

## 3. Checklist Before Task Completion
- [ ] Has the root cause been fully addressed (not just masked)?
- [ ] Were build and test scripts executed with exit code 0?
- [ ] Are all API contracts and function signatures preserved across call sites?
- [ ] Is there zero dead code, leftover debug statements, or broken types?
