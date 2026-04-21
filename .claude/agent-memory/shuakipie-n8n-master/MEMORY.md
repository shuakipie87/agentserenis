# Shuakipie — Memory

> Loaded at session start. Updated at session end. Keep under 300 lines — overflow to topic files.

## Workspace Conventions

### [CONVENTION] — Platform in active use here is Make.com
**Platform:** make.com
**Scope:** workspace
**Confidence:** high
**Source:** observation
**Date:** 2026-04-21

The user has active Make.com scenarios (ApexRacquetClub AI-Performance-Summaries, Current & Calm Battery Slack Field Updates, Guest Roaster Quality Waste Sync, Thorne Immigration Urgent Case Intake). Default to Make.com unless the user explicitly says *n8n*, *workflow JSON*, *$json*, or *typeVersion*.

### [ANTI-PATTERN] — User mixes n8n terms into Make.com requests
**Platform:** both
**Scope:** workspace
**Confidence:** high
**Source:** aria-memory / correction log
**Date:** 2026-04-21

The user sometimes types n8n terms (`typeVersion`, `2.10.2`, `$json`) when asking about Make.com flows. Do **not** build n8n JSON when they mean Make.com. Clarify once, then build the correct platform. See `feedback_make_vs_n8n_terminology.md` in the auto-memory.

---

## Active Sub-Projects

### ApexRacquetClub — AI-Performance-Summaries
**Platform:** make.com
Polishes post-lesson coach feedback into parent-ready emails with AI. Scenario folder: `ApexRacquetClub-AI-Performance-Summaries/`.

### Current & Calm Battery — Slack Field Updates
**Platform:** make.com
Two flows: (1) Google Sheets field inspection → Slack alerts, (2) scheduled OpenWeatherMap safety advisory → Slack. Scenario folder: `Current_Calm_Battery_Slack_Field_Updates/`.

### Guest Roaster — Quality Waste Sync
**Platform:** make.com
Folder: `Guest_Roaster_Quality_Waste_Sync/` — inspect before modifying.

### Thorne Immigration — Urgent Case Intake
**Platform:** make.com
Folder: `Thorne-Immigration-Urgent-Case-Intake/` — inspect before modifying.

---

## n8n Facts I've Confirmed

### [workflow-shape] — HighNote Logistics Cargo Dispatch (2026-04-21)
**Platform:** n8n
**Scope:** project:HighNoteLogistics-CargoDispatch
**Confidence:** high
**Source:** explicit
**Date:** 2026-04-21

12-node workflow. Entry: Webhook (v2) → Set/normalize (v3.4) → Switch fragility router (v3.2) → IF env check (v2.2) → dual Set branches (warning/safe) → Slack Block Kit (v2.3) → Gmail HTML (v2.1) → Google Sheets append (v4.5). Error workflow: errorTrigger (v1) → Gmail fallback to ops@. White Glove branch fires Specialist Slack alert in parallel from Switch output 1 before rejoining the IF node. Credential placeholders: REPLACE_ME_SLACK, REPLACE_ME_GMAIL, REPLACE_ME_GSHEETS, REPLACE_ME_SPREADSHEET_ID.

### [node-config] — Switch v3.2 rules-mode shape confirmed
**Platform:** n8n
**Scope:** global
**Confidence:** high
**Source:** explicit
**Date:** 2026-04-21

Switch v3.2 with `mode: "rules"` uses `rules.rules[]` array. Each rule has a nested `conditions` object (same shape as IF v2.2: `options`, `conditions[]`, `combinator`) plus `renameOutput: true` and `outputKey`. Options `fallbackOutput: "none"` silently drops unmatched items.

### [node-config] — IF v2.2 OR combinator with four numeric conditions confirmed
**Platform:** n8n
**Scope:** global
**Confidence:** high
**Source:** explicit
**Date:** 2026-04-21

IF v2.2 `combinator: "or"` with four conditions (humidity < 40, humidity > 60, temperature < 60, temperature > 75) is the correct pattern for env threshold checking. Each condition uses `leftValue: "={{ $json.field }}"`, `rightValue: number`, `operator: { type: "number", operation: "lt|gt" }`.

### [node-config] — Set v3.4 manual mode structure confirmed
**Platform:** n8n
**Scope:** global
**Confidence:** high
**Source:** explicit
**Date:** 2026-04-21

Set v3.4 uses `mode: "manual"`, `assignments.assignments[]` array. Each assignment: `{ id, name, value, type }`. Inline ternary expressions in `value` field work for boolean flags and computed text. `type: "boolean"` with `value: "={{ true }}"` is valid.

### [node-config] — Gmail v2.1 HTML email send shape confirmed
**Platform:** n8n
**Scope:** global
**Confidence:** high
**Source:** explicit
**Date:** 2026-04-21

Gmail v2.1 send: `resource: "message"`, `operation: "send"`, `sendTo`, `subject`, `emailType: "html"`, `message`. Credential key: `gmailOAuth2`. Long inline HTML built via JS string concatenation inside `={{ }}` expression works.

### [node-config] — Google Sheets v4.5 appendOrUpdate shape confirmed
**Platform:** n8n
**Scope:** global
**Confidence:** high
**Source:** explicit
**Date:** 2026-04-21

Sheets v4.5: `resource: "sheet"`, `operation: "appendOrUpdate"`. `documentId` and `sheetName` both use `{ __rl: true, value, mode }` resource-locator format. `columns.mappingMode: "defineBelow"` with `columns.value` as a flat key-value object. `columns.schema[]` array defines column metadata. Credential key: `googleSheetsOAuth2Api`.

### [node-config] — Slack v2.3 Block Kit message shape confirmed
**Platform:** n8n
**Scope:** global
**Confidence:** high
**Source:** explicit
**Date:** 2026-04-21

Slack v2.3: `resource: "message"`, `operation: "post"`, `select: "channel"`, `channelId: { __rl: true, value: "#channel-name", mode: "name" }`. For blocks: `messageType: "block"`, `blocksUi: "={{ JSON.stringify([...]) }}"`. For plain text: `messageType: "text"`, `text`. Credential key: `slackApi`.

## Make.com Facts I've Confirmed

_None yet — populate as sessions happen._

---

## Skills I Use

- `n8n-workflow-patterns` — multi-node flow design
- `n8n-node-configuration` — exact node parameter specs
- `n8n-validation-expert` — pre-delivery JSON check
- `n8n-code-javascript` — Code node (JS)
- `n8n-code-python` — Code node (Py)
- `n8n-expression-syntax` — `$json`, `$node`, `$now`, etc.
- `n8n-mcp-tools-expert` — MCP-based node/credential lookup

Make.com has no equivalent skill packs yet. I lean on my own mastery surface (see agent definition) and the scenario blueprints already in this workspace for reference.

---

## Translation Notes

Quick n8n ↔ Make.com pointers I've used before:

| n8n | Make.com |
|---|---|
| Webhook trigger | Webhooks: Custom webhook |
| Schedule Trigger | Scenario-level scheduling |
| IF / Switch | Router + per-route filters |
| Loop Over Items | Iterator |
| Aggregate | Array / Text / Numeric Aggregator |
| Code (JS) node | ⚠ No direct equivalent — use Tools / structured modules |
| Set / Edit Fields | Tools → Set variable / Transformer |
| HTTP Request | HTTP module |
| Execute Workflow | Trigger another scenario via webhook |

When a mapping is lossy, flag it explicitly.

---

## Conflict Resolution Rule

When a new learning contradicts an existing entry: most recent + most explicit wins, and I note the resolution inline.

---

## Topic Files (spill)

Create and link from here when a section grows past ~30 lines:

- `nodes-learned.md` — n8n node-by-node confirmed configs
- `modules-learned.md` — Make.com module-by-module confirmed configs
- `translations.md` — extended n8n ↔ Make.com mapping log
- `anti-patterns.md` — full list of "don't do this" observations

_None yet._

---

*Last synthesized by Aria: never. Created 2026-04-21.*
