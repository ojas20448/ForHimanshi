---
name: superpowers-brainstorming
description: Advanced brainstorming, structured ideation, product requirement distillation, system architecture design, edge-case analysis, and systematic decision-making framework. Activate when starting new features, exploring technical solutions, designing software systems, or evaluating architectural trade-offs.
---

# Superpowers Skill: Brainstorming & Problem Solving

The `superpowers-brainstorming` skill empowers the agent and user to systematically transform vague ideas into airtight technical designs, product feature maps, and phased execution roadmaps.

---

## 1. Core Framework

```
  [1. Problem & Goal]  -->  [2. Divergent Exploration]  -->  [3. Trade-off Analysis]  -->  [4. Concrete Blueprint]
  Deconstruct Problem        Generate 3+ Approaches         Evaluate Complexity/Impact      Produce Phased Specs & Plan
```

### Stage 1: Problem Definition & First Principles
- **Deconstruct the Core Objective**: What problem are we solving? Who is the user/system affected?
- **Root Drivers (5 Whys)**: Uncover implicit assumptions, hidden constraints, and technical non-negotiables.
- **Scope Boundaries**: Define explicitly what is **In-Scope** vs **Out-of-Scope** for this iteration.

### Stage 2: Divergent Exploration (Option Generation)
Generate at least 3 distinct architectural/technical options:
- **Option A (Conservative / Minimal)**: Simplest path using existing patterns and minimal new dependencies.
- **Option B (Modern / Scalable)**: Ideal modern architecture leveraging best-in-class patterns, decoupling, and high maintainability.
- **Option C (Innovative / Alternative)**: Unconventional approach that eliminates core bottlenecks or redefines the workflow.

### Stage 3: Systematic Trade-off Analysis
Evaluate options across standard dimensions:
| Dimension | Option A (Conservative) | Option B (Modern) | Option C (Innovative) |
| :--- | :--- | :--- | :--- |
| Implementation Complexity | Low | Medium | High |
| Performance & Scalability | Moderate | High | Very High |
| Risk / Edge-case Exposure | Low | Low | Medium |
| Maintenance Overhead | Low | Low | Medium |

### Stage 4: Edge-Case & Failure Mode Discovery
Before writing specs, stress-test the concept against:
- **State & Race Conditions**: Concurrent requests, network drops, unhandled nulls.
- **Scalability Thresholds**: Large payload sizes, database connection limits, API rate limits.
- **UX & Ergonomics**: Slow load states, input validation feedback, mobile responsiveness.

---

## 2. Interactive Protocol with the User

1. **Be Concise & Iterative**: Ask 2-3 targeted clarifying questions at a time. Never dump an overwhelming questionnaire.
2. **Present Clear Recommendations**: When proposing options, highlight the recommended path with rationale: `(Recommended) Option B because...`
3. **Produce Structured Artifacts**: Distill finalized decisions into an `implementation_plan.md` or architecture document containing:
   - Clear Problem Statement
   - Architectural Diagram / Data Flow
   - Component & File Breakdown
   - Step-by-Step Task Checklist
   - Verification & Risk Mitigation Plan
