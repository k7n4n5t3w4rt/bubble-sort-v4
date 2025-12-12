# CONTINUE.md
> High-level instructions for the Continue agent working in this repository.

---

## 🌍 Project Context

This is a **JavaScript-first** codebase that uses **TypeScript strictly for static type checking**.

Important:
- **TypeScript MUST NOT be used to emit or compile code**
- There is **no TypeScript build step**
- All runtime code is **plain JavaScript**
- TypeScript exists only to improve correctness, readability, and tooling

Treat TypeScript as **a linter with types**, not a language target.

---

## 🧭 Agent Orientation

You are collaborating in a live system with established constraints.

Before making changes:
- Understand the intent of the code
- Respect existing patterns
- Prefer small, reversible steps
- Explain *why* a change improves correctness or flow

Do not introduce build tooling, transpilation, or framework changes unless explicitly requested.

---

## 🧠 TypeScript Usage Rules (CRITICAL)

### Allowed
- `// @ts-check` in `.js` files
- JSDoc type annotations (`@param`, `@returns`, `@typedef`, `@template`)
- `*.d.ts` files for shared or complex types
- `tsconfig.json` with:
  - `"noEmit": true`
  - `"allowJs": true`
  - `"checkJs": true`

### Not Allowed
❌ Converting `.js` files to `.ts`  
❌ Adding a TypeScript compile step  
❌ Emitting JavaScript via `tsc`  
❌ Introducing ts-node, babel, swc, or bundlers for types  
❌ Suggesting “just convert this to TS”

If you are unsure, **ask before changing file extensions or tooling**.

---

## 🧪 Test-Driven Development (TDD)

This project follows **TDD**.

### Workflow
1. Write or modify a **failing test first**
2. Implement the minimal code required to pass the test
3. Refactor for clarity and simplicity
4. Keep tests readable and intention-revealing

### Agent Expectations
- When adding behaviour, **propose a test first**
- When fixing a bug, **add a regression test**
- Do not silently change existing tests without explanation
- Prefer fewer, clearer tests over exhaustive but opaque ones

Tests are part of the design, not an afterthought.

---

## ⚙️ Coding Style

- Use modern JavaScript (ES2023+)
- Prefer pure functions where possible
- Avoid hidden side effects
- Keep modules small and cohesive
- Use explicit names that reveal intent
- Avoid cleverness; optimise for readability

Comments should explain **why**, not **what**.

---

## 🧩 Architectural Principles

Inspired by Wardley Mapping and evolutionary design:

- **Map before modifying** — understand where code sits in the value chain
- **Stabilise the obvious** — standardise commodity logic
- **Explore at the edges** — isolate experimental code
- **Encapsulate volatility**
- **Prefer flow over structure**

If you believe a change affects architectural evolution, say so explicitly.

---

## 🤝 Collaboration Style

- Treat prompts as part of an ongoing conversation
- Surface assumptions and trade-offs
- Offer alternatives when appropriate
- Be concise but reflective
- Use a calm, senior-engineer tone

Example:
> “I’m assuming this module is stable and widely used. If that’s wrong, we could instead…”

---

## 🛡️ Guardrails

- Do not introduce new dependencies unless requested
- Do not run installs or modify configs without permission
- Do not expose secrets or tokens
- Limit changes to files relevant to the task
- Always show minimal diffs

---

## 🧭 TL;DR

- JavaScript is the runtime language
- TypeScript is for **checking only**
- TDD is the default mode of work
- Small, intentional changes
- Explain intent, not just mechanics
