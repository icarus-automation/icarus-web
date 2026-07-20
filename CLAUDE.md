# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dependency constraints

- **Do NOT use or install `gsap`** (or its plugins: ScrollTrigger, MotionPathPlugin, etc.). It will never be added to this project. The former `IcarusFlight` component that depended on it has been removed. For any animation, use the already-installed `motion` package (Framer Motion, imported from `motion/react`) plus CSS. Note: `components/greek/icarus-glyph.tsx` is now unused — reuse or delete as needed.

## Picking the right models for workflows and subagents
 
Rankings, higher = better. Cost = what you actually pay, not list price. Intelligence = how hard a problem you can hand the model unsupervised. Taste = UI/UX, code quality, API design, copy.
 
| model     | cost | intelligence | taste |
|-----------|------|---------------|-------|
| gpt-5.5   | 9    | 8             | 5     |
| sonnet-5  | 5    | 5             | 6     |
| opus-4.8  | 4    | 7             | 8     |
| fable-5   | 2    | 9             | 9     |
 
How to apply:
- Treat these as defaults: if a cheaper model's output doesn't meet the bar, rerun the work with a smarter model. Judge the output, not the price tag.
- When axes conflict, prioritize intelligence > taste > cost.
- Use gpt-5.5 for bulk/mechanical work — clear-spec implementation, data analysis, migrations.
- Use a model with taste ≥ 8 for anything user-facing — UI, copy, API design.
- Use fable-5 or opus-4.8 to review plans and implementations; add gpt-5.5 as an extra independent perspective when useful.
- Use sonnet-5, opus-4.8, or fable-5 for Claude-side work.
- Reach gpt-5.5 through the `codex-plugin-cc` slash commands:
  - `/codex:review [--base <ref>] [--wait|--background]` — review the current diff or a branch. Use for the reviews case above.
  - `/codex:adversarial-review [--base <ref>] [--wait|--background] <focus text>` — run a steerable, challenge-focused review of tradeoffs, hidden assumptions, and failure modes.
  - `/codex:rescue <task>` — delegate implementation, investigation, or bulk work to Codex. Supports `--model`, `--effort`, `--background`, `--wait`, `--resume`, `--fresh`. Use it for bulk/mechanical work and anything the review commands don't cover — give it a self-contained prompt.
  - `/codex:status [task-id]` / `/codex:result [task-id]` / `/codex:cancel [task-id]` — check, retrieve, or cancel a background job.
- Run Claude models via the Agent/Workflow `model` parameter.
Using gpt-5.5 inside workflows and subagents:
- Use the `codex:codex-rescue` subagent (in `/agents`) as the wrapper for reaching Codex from a workflow or subagent step. Reference it like any other subagent, or call `/codex:rescue [--model gpt-5.5] [--effort <level>] <self-contained task prompt>` directly.
- Run long tasks in the background and poll: `/codex:rescue --background ...` then `/codex:status` / `/codex:result`. Apply the same pattern to `/codex:adversarial-review --background`.
- Set the default model/effort once in `~/.codex/config.toml` (user-level) or `.codex/config.toml` (project-level, trusted projects only):
```toml
  model = "gpt-5.5"
  model_reasoning_effort = "xh"
```