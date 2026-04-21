# Agent Serenis

A production-grade multi-agent engineering team powered by Claude Code. 20 specialized AI agents that collaborate to build, ship, and scale software — from database schemas to pixel-perfect UIs to SEO-optimized marketing pages, plus no-code automation on n8n and Make.com.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Agent Roster](#agent-roster)
  - [Engineering Agents](#engineering-agents)
  - [Quality & Review Agents](#quality--review-agents)
  - [Specialist Agents](#specialist-agents)
  - [Growth Agents](#growth-agents)
  - [Coordination](#coordination)
- [How to Use Agents](#how-to-use-agents)
  - [Launching a Single Agent](#launching-a-single-agent)
  - [Launching Multiple Agents in Parallel](#launching-multiple-agents-in-parallel)
  - [Using the Orchestrator](#using-the-orchestrator)
  - [Team Mode](#team-mode)
- [Agent Architecture](#agent-architecture)
  - [File Structure](#file-structure)
  - [Agent Memory System](#agent-memory-system)
  - [Prompt Engineering Techniques](#prompt-engineering-techniques)
- [Agent Details](#agent-details)
- [Collaboration Map](#collaboration-map)
- [Best Practices](#best-practices)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)

---

## Overview

Agent Serenis is a multi-agent system built for [Claude Code](https://docs.anthropic.com/en/docs/claude-code). Each agent is a specialized `.md` file that defines an agent's identity, expertise, reasoning protocols, code standards, and persistent memory — turning Claude into a domain expert for specific engineering tasks.

**What makes this different:**
- **20 specialized agents** covering the full software development lifecycle
- **Advanced prompt engineering** — Chain-of-Thought, Tree-of-Thought, ReAct, adversarial self-checks, confidence calibration
- **Persistent memory** — agents learn and remember across conversations
- **Collaboration protocols** — agents know how to hand off work and coordinate with each other
- **Production-grade standards** — every agent enforces quality checklists, security practices, and performance targets

**Total system size:** 6,240+ lines of specialized agent prompts across 20 agents.

---

## Quick Start

### Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed and configured
- A project where you want to use the agents

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shuakipie87/agentserenis.git
   cd agentserenis
   ```

2. **Copy agents into your project:**
   ```bash
   # Copy all agents to your project's .claude/agents directory
   cp -r .claude/agents/ /path/to/your/project/.claude/agents/
   ```

   Or symlink if you want to keep them updated:
   ```bash
   ln -s /path/to/agentserenis/.claude/agents/ /path/to/your/project/.claude/agents
   ```

3. **Set up agent memory directories:**
   ```bash
   # Create memory directories for all agents
   for agent in coach-frontend-engineer cypress-qa-engineer dan-backend-engineer \
     data-engineer dendi-orchestrator hyacinth-marketing-strategist \
     ian-perf-security-reviewer jah-performance-animations joey-backend-architect \
     joey-fullstack-backend realtime-systems-architect refactor-code-reviewer \
     rhemson-qa-automation ryzen-seo-engineer sage-technical-writer \
     shield-security-analyst shuakipie-microservices vincent-design-systems \
     yam-fullstack-frontend; do
     mkdir -p ~/.claude/.claude/agent-memory/$agent
     # Create MEMORY.md if it doesn't exist
     if [ ! -f ~/.claude/.claude/agent-memory/$agent/MEMORY.md ]; then
       echo "# $agent Memory" > ~/.claude/.claude/agent-memory/$agent/MEMORY.md
     fi
   done
   ```

4. **Verify installation:**
   ```bash
   ls .claude/agents/*.md | wc -l
   # Should output: 19
   ```

5. **Start using agents** in Claude Code by referencing them in Task tool calls or letting the orchestrator (Dendi) coordinate them.

---

## Agent Roster

### Engineering Agents

| Agent | Role | Color | Expertise |
|-------|------|-------|-----------|
| **Joey Fullstack Backend** | Backend-focused fullstack engineer | `green` | APIs, auth, DB, webhooks, queues, DDD, CQRS, caching |
| **Joey Backend Architect** | Principal systems architect | `cyan` | Distributed systems, event sourcing, schema design, scalability |
| **Yam Fullstack Frontend** | Frontend-focused fullstack engineer | `yellow` | React 18+, Next.js, TypeScript, a11y, animations, CWV |
| **Coach (Frontend)** | Frontend engineer | `orange` | React, Next.js, Tailwind, Zustand, Framer Motion |
| **Dan (Backend)** | Backend engineer | `purple` | Node.js, REST APIs, SQL, WebSocket, authentication |
| **ShuakiPie (Microservices)** | Microservices architect | `pink` | Service decomposition, message queues, sagas, DDD |
| **Data (Database)** | Database engineer | `blue` | Schema design, migrations, query optimization, indexing |
| **Realtime Systems** | Real-time architect | `yellow` | WebSocket, SSE, job queues, event buses, streaming |

### Quality & Review Agents

| Agent | Role | Color | Expertise |
|-------|------|-------|-----------|
| **Cypress (QA)** | QA engineer | `yellow` | Unit tests, integration tests, E2E tests, edge cases |
| **Rhemson (QA Automation)** | QA automation | `cyan` | E2E automation, cross-browser, visual regression, CI |
| **Refactor (Code Reviewer)** | Code reviewer | `cyan` | Code quality, correctness, maintainability, best practices |
| **Ian (Perf & Security)** | Performance & security reviewer | `green` | Performance analysis, security auditing, memory leaks |
| **Shield (Security)** | Security analyst | `yellow` | OWASP Top 10, auth audit, CVE scanning, threat modeling |

### Specialist Agents

| Agent | Role | Color | Expertise |
|-------|------|-------|-----------|
| **Vincent (Design Systems)** | Design systems engineer | `blue` | Design tokens, component libraries, theming, WCAG |
| **Jah (Performance)** | Performance & animations | `red` | Bundle size, CWV, lazy loading, GPU animations |
| **Sage (Technical Writer)** | Technical writer | `green` | API docs, README, changelogs, runbooks, guides |
| **ShuakiPie (n8n Master)** | n8n & Make.com automation master | `orange` | n8n workflow JSON, Make.com scenarios, expressions, Code nodes, cross-platform translation |

### Growth Agents

| Agent | Role | Color | Expertise |
|-------|------|-------|-----------|
| **Ryzen (SEO)** | SEO engineer | `red` | Technical SEO, structured data, sitemaps, crawlability |
| **Hyacinth (Marketing)** | Marketing strategist | `magenta` | CRO, A/B testing, copywriting, email automation, analytics |

### Coordination

| Agent | Role | Color | Expertise |
|-------|------|-------|-----------|
| **Dendi (Orchestrator)** | Team orchestrator | `blue` | Task decomposition, sprint planning, cross-agent coordination |

---

## How to Use Agents

### Launching a Single Agent

Use the **Task tool** in Claude Code to launch any agent by its `subagent_type` name:

```
User: "Create a REST API for user management with CRUD operations"

Claude Code uses Task tool:
  subagent_type: "dan-backend-engineer"
  prompt: "Create a REST API for user management with CRUD operations including
           validation, proper status codes, and error handling"
```

You can also just describe what you need, and Claude Code will automatically select the right agent based on the task description.

### Common Agent Use Cases

#### Frontend Work
```
# Build a new UI component
Task → coach-frontend-engineer or yam-fullstack-frontend
"Build a dashboard page with sidebar navigation and real-time metrics"

# Fix responsive design issues
Task → yam-fullstack-frontend
"The pricing page breaks on mobile at 320px width. Fix responsive layout."

# Add animations
Task → jah-performance-animations
"Add smooth page transition animations between dashboard views"
```

#### Backend Work
```
# Build an API endpoint
Task → dan-backend-engineer or joey-fullstack-backend
"Create a POST /api/orders endpoint with validation and idempotency"

# Design system architecture
Task → joey-backend-architect
"Design the architecture for a real-time notification system"

# Implement microservices
Task → shuakipie-microservices
"Split the order processing monolith into separate services"
```

#### Database Work
```
# Design a schema
Task → data-engineer
"Design the database schema for a multi-tenant SaaS with subscriptions"

# Optimize queries
Task → data-engineer
"The analytics dashboard queries are slow. Optimize with proper indexing."
```

#### Quality & Security
```
# Code review
Task → refactor-code-reviewer
"Review the authentication module for correctness and best practices"

# Security audit
Task → shield-security-analyst
"Audit the new payment endpoint for security vulnerabilities"

# Performance review
Task → ian-perf-security-reviewer
"Check the search endpoint for N+1 queries and memory leaks"

# Write tests
Task → cypress-qa-engineer
"Write E2E tests for the complete checkout flow"

# Test automation
Task → rhemson-qa-automation
"Set up CI test pipelines with parallel Playwright execution"
```

#### SEO & Marketing
```
# SEO optimization
Task → ryzen-seo-engineer
"Implement JSON-LD structured data across all product pages"

# Landing page optimization
Task → hyacinth-marketing-strategist
"Our landing page converts at 1.2%. Audit and create optimized variants."

# Content strategy
Task → ryzen-seo-engineer
"Build an SEO-optimized blog with topic clusters and internal linking"
```

#### Documentation
```
# API documentation
Task → sage-technical-writer
"Document the new /api/v2/users endpoint with request/response examples"

# Design system docs
Task → vincent-design-systems
"Create Storybook documentation for the Button component variants"
```

#### Automation (n8n / Make.com)
```
# Build an n8n workflow
Task → shuakipie-n8n-master
"Build an n8n workflow that watches a Google Sheet and posts new rows to Slack"

# Debug a Make.com scenario
Task → shuakipie-n8n-master
"My Make.com Iterator is dropping bundles — trace the flow and fix the mapping"

# Translate between platforms
Task → shuakipie-n8n-master
"Translate this n8n workflow to an equivalent Make.com scenario"
```

### Launching Multiple Agents in Parallel

For complex features, launch multiple agents simultaneously:

```
# Build a full feature: backend + frontend + tests
Task 1 → joey-fullstack-backend: "Build the /api/orders endpoint"
Task 2 → yam-fullstack-frontend: "Build the order form UI with validation"
Task 3 → ryzen-seo-engineer: "Add structured data for the orders page"
# All three run in parallel
```

### Using the Orchestrator

For large, multi-step projects, let **Dendi** coordinate everything:

```
User: "Build a complete SaaS application with auth, dashboard, billing, and admin panel"

Task → dendi-orchestrator:
  "Decompose this SaaS build into workstreams, assign tasks to the right agents,
   manage dependencies, and ensure everything ships in the right order."

# Dendi will:
# 1. Break down the project into tasks
# 2. Identify dependencies (auth must come before dashboard)
# 3. Assign each task to the best agent
# 4. Sequence work for maximum parallelism
# 5. Track progress and unblock stuck tasks
```

#### Dendi is ideal for:
- Multi-feature projects spanning frontend + backend
- Sprint planning and backlog prioritization
- Bug triage across multiple systems
- Coordinating migrations and refactors
- Status reporting across workstreams

### Team Mode

For the most powerful collaboration, create a team where agents work together:

```
# Create a team
TeamCreate: team_name="feature-checkout"

# Create tasks
TaskCreate: "Build checkout API with Stripe integration"
TaskCreate: "Build checkout UI with form validation"
TaskCreate: "Write E2E tests for checkout flow"
TaskCreate: "Security audit of payment handling"

# Spawn agents as teammates
Task: subagent_type="joey-fullstack-backend", team_name="feature-checkout"
Task: subagent_type="yam-fullstack-frontend", team_name="feature-checkout"
Task: subagent_type="cypress-qa-engineer", team_name="feature-checkout"
Task: subagent_type="shield-security-analyst", team_name="feature-checkout"

# Agents pick up tasks, coordinate via messages, and ship the feature
```

---

## Agent Architecture

### File Structure

```
.claude/
├── agents/                          # Agent definition files
│   ├── coach-frontend-engineer.md   # Frontend engineer
│   ├── cypress-qa-engineer.md       # QA engineer
│   ├── dan-backend-engineer.md      # Backend engineer
│   ├── data-engineer.md             # Database engineer
│   ├── dendi-orchestrator.md        # Team orchestrator
│   ├── hyacinth-marketing-strategist.md  # Marketing strategist
│   ├── ian-perf-security-reviewer.md     # Perf & security reviewer
│   ├── jah-performance-animations.md     # Performance & animations
│   ├── joey-backend-architect.md    # Backend systems architect
│   ├── joey-fullstack-backend.md    # Fullstack backend engineer
│   ├── realtime-systems-architect.md     # Real-time systems
│   ├── refactor-code-reviewer.md    # Code reviewer
│   ├── rhemson-qa-automation.md     # QA automation
│   ├── ryzen-seo-engineer.md        # SEO engineer
│   ├── sage-technical-writer.md     # Technical writer
│   ├── shield-security-analyst.md   # Security analyst
│   ├── shuakipie-microservices.md   # Microservices architect
│   ├── shuakipie-n8n-master.md      # n8n & Make.com automation master
│   ├── vincent-design-systems.md    # Design systems engineer
│   └── yam-fullstack-frontend.md    # Fullstack frontend engineer
└── agent-memory/                    # Persistent memory (per-agent)
    └── */MEMORY.md                  # Agent-specific knowledge base
```

### Agent File Anatomy

Each agent `.md` file contains:

```markdown
---
name: agent-name              # Unique identifier
description: "..."            # When to use this agent (shown in Task tool)
model: opus                   # AI model (opus for complex, sonnet for fast)
color: green                  # UI color in Claude Code
memory: project               # Memory scope
---

# Agent identity and personality
# Collaboration network (who they work with)
# Tech stack expertise (mastery levels)
# Code standards (non-negotiable rules)
# Implementation methodology (step-by-step process)
# Quality checklists (verify before completing)
# Memory instructions (what to record for future sessions)
```

### Agent Memory System

Every agent has persistent memory at `~/.claude/.claude/agent-memory/{agent-name}/`:

```
~/.claude/.claude/agent-memory/
├── joey-fullstack-backend/
│   ├── MEMORY.md          # Core knowledge (loaded into system prompt)
│   ├── patterns.md        # Codebase patterns discovered
│   ├── debugging.md       # Solutions to recurring issues
│   └── api-contracts.md   # API specifications tracked
├── yam-fullstack-frontend/
│   ├── MEMORY.md
│   ├── components.md      # Component patterns found
│   └── performance.md     # Performance baselines
└── ... (one folder per agent)
```

**How memory works:**
- `MEMORY.md` is automatically loaded into the agent's system prompt each session
- Agents create additional topic files for detailed notes
- Memory persists across conversations — agents learn from experience
- Keep `MEMORY.md` under 200 lines (it's loaded every time)

**What agents remember:**
- Codebase patterns, conventions, and file organization
- Architectural decisions and their rationale
- Database schemas, API contracts, and data flows
- Performance baselines and optimization results
- Bug fixes and debugging solutions
- User preferences and workflow conventions

### Prompt Engineering Techniques

The enhanced agents (Joey, Yam, Ryzen, Hyacinth, Dendi) use advanced prompt engineering:

#### Chain-of-Thought (CoT)
Structured reasoning chains force the agent to think step-by-step before acting:
```
STEP 1 — OBSERVE: What does the data show?
STEP 2 — HYPOTHESIZE: What are the possible causes?
STEP 3 — VALIDATE: What evidence supports each hypothesis?
STEP 4 — DIAGNOSE: What is the root cause?
STEP 5 — PRESCRIBE: What is the specific fix?
STEP 6 — VERIFY: How do we confirm it worked?
STEP 7 — SELF-CHECK: What could go wrong?
```
*Used by: Ryzen (SEO analysis), Dendi (task decomposition)*

#### Tree-of-Thought (ToT)
Explore multiple solution branches before committing:
```
PROBLEM → BRANCH A (Strategy 1) → Evidence, Effort, Impact, Risk
        → BRANCH B (Strategy 2) → Evidence, Effort, Impact, Risk
        → BRANCH C (Strategy 3) → Evidence, Effort, Impact, Risk
        → DECISION: Selected branch with justification
```
*Used by: Hyacinth (marketing strategy)*

#### ReAct Pattern (Reason + Act)
Alternating reasoning and action steps:
```
REASON: What is the challenge? What data do I need?
ACT:    Gather data from analytics, competitors, users
REASON: What patterns do I see? What hypotheses emerge?
ACT:    Design the experiment with success metrics
REASON: Do results align with goals?
ACT:    Iterate — double down on winners, kill losers
```
*Used by: Hyacinth (marketing execution)*

#### Adversarial Self-Check
Agents challenge their own recommendations:
```
1. THE CYNIC: "What is the weakest assumption?"
2. THE PESSIMIST: "Where will this fail first?"
3. THE LAZY ENGINEER: "What's the simplest 80% solution?"
4. THE USER: "Does the user actually care about this?"
5. THE FUTURE ME: "Will this be clear in 2 weeks?"
```
*Used by: Dendi (planning), Hyacinth (copy review)*

#### Confidence Calibration
Every recommendation is rated:
```
HIGH (90%+)   — Documented, empirically validated, industry consensus
MEDIUM (60-89%) — Strong correlation, widely adopted
LOW (30-59%)  — Anecdotal evidence, not officially confirmed
EXPERIMENTAL  — Testing hypothesis, low risk to try
```
*Used by: Ryzen (SEO recommendations), Dendi (estimation)*

#### Step-Back Abstraction
Think at the right altitude before diving into details:
```
ALTITUDE 1 — STRATEGIC: Why are we doing this?
ALTITUDE 2 — TACTICAL: What needs to happen?
ALTITUDE 3 — OPERATIONAL: How does each task get done?
```
*Used by: Dendi (project planning)*

---

## Agent Details

### Joey Fullstack Backend (`joey-fullstack-backend`)
**Lines:** 556 | **Size:** 28KB | **Model:** Opus

The powerhouse backend engineer. Handles everything from database schemas to API layers with production-grade quality.

**Key capabilities:**
- Domain-Driven Design (DDD) with aggregate roots and domain events
- CQRS and Event Sourcing patterns
- Saga pattern for distributed transactions
- Circuit breaker with bulkhead isolation
- Multi-layer caching (In-memory → Redis → CDN)
- Defense-in-depth authentication (JWT rotation, CSRF, MFA)
- Structured logging with correlation IDs and request tracing
- Rate limiting strategies (token bucket, sliding window, fixed window)

**Production readiness checklist:** 30+ items covering data layer, API layer, security, reliability, performance, and observability.

---

### Joey Backend Architect (`joey-backend-architect`)
**Lines:** 448 | **Size:** 24KB | **Model:** Opus

The systems thinker. Designs architectures that scale to millions of users and withstand chaos.

**Key capabilities:**
- Distributed systems fundamentals (CAP theorem, consensus, consistency models)
- Event-driven architecture with outbox pattern and projections
- Advanced PostgreSQL (RLS, partitioning, advisory locks, BRIN/GIN indexes)
- Horizontal scaling architecture with connection pooling
- Resilience patterns (circuit breaker, bulkhead, graceful degradation)
- Zero Trust security architecture with STRIDE threat modeling
- Architecture Decision Records (ADR) templates

**Architecture review checklist:** Covers system design, data architecture, security, observability, and operational readiness.

---

### Yam Fullstack Frontend (`yam-fullstack-frontend`)
**Lines:** 649 | **Size:** 32KB | **Model:** Opus

The experience crafter. Makes users say "this app feels amazing" and designers say "it's better than the mockup."

**Key capabilities:**
- React 18+ concurrent features (startTransition, useDeferredValue, Suspense)
- Next.js App Router deep expertise (parallel routes, intercepting routes, streaming SSR)
- Advanced TypeScript (polymorphic components, branded types, discriminated unions)
- State management architecture (server state, client state, URL state, form state, XState)
- WCAG 2.2 AA+ accessibility (focus management, roving tabindex, live regions)
- Core Web Vitals engineering (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Animation architecture (spring physics, GPU-accelerated, scroll-triggered)
- Virtualization for large lists, optimistic updates, bundle optimization

**Quality checklist:** 40+ items covering functionality, TypeScript, accessibility, responsive design, performance, dark mode, and testing.

---

### Ryzen SEO Engineer (`ryzen-seo-engineer`)
**Lines:** 761 | **Size:** 36KB | **Model:** Opus

The search engine whisperer. Architects websites that search engines love and users find effortlessly.

**Key capabilities:**
- Crawlability architecture (robots.txt, XML sitemaps, crawl budget optimization)
- Canonical URL strategy with multi-language hreflang
- Structured data library (Product, Article, FAQ, Breadcrumb, Organization JSON-LD)
- Semantic HTML templates optimized for search
- Internal linking architecture with topic cluster systems
- Rendering strategy decision trees (SSG vs ISR vs SSR for SEO)
- Core Web Vitals optimization as ranking signals
- Keyword research and search intent classification
- URL architecture and migration planning

**SEO audit framework:** 4-level audit (Crawlability → On-Page → Technical → Content) with 30+ checkpoints.

---

### Hyacinth Marketing Strategist (`hyacinth-marketing-strategist`)
**Lines:** 690 | **Size:** 36KB | **Model:** Opus

The growth engineer. Bridges the gap between marketing strategy and technical implementation.

**Key capabilities:**
- Landing page optimization framework with conversion psychology
- Headline formula library (6 proven patterns with examples)
- CTA psychology and placement rules
- Social proof hierarchy (ranked by effectiveness)
- Full-funnel analytics with type-safe event taxonomy
- A/B testing infrastructure with statistical rigor (MDE, SRM detection)
- Copywriting system (6-step IABPOR framework)
- Pricing page psychology (7-section structure with behavioral economics)
- Email automation with behavioral trigger sequences
- Growth loop architecture (content, referral, paid, product loops)
- Referral program design with anti-fraud measures
- Complete marketing metrics dashboard (AARRR framework)

---

### Dendi Orchestrator (`dendi-orchestrator`)
**Lines:** 447 | **Size:** 24KB | **Model:** Opus

The team brain. Turns chaos into shipping velocity. Coordinates all agents for maximum output.

**Key capabilities:**
- Chain-of-thought task decomposition (7-step reasoning chain)
- Complete agent roster with expertise mapping (19 agents)
- Task creation standard with acceptance criteria templates
- Priority matrix (impact vs effort quadrant analysis)
- Sprint planning protocol (5-phase process)
- Cross-agent coordination protocol (5-step feature delivery)
- Blocker resolution protocol (identify → classify → resolve → prevent)
- Status reporting formats (quick and deep templates)
- Step-back abstraction (strategic → tactical → operational)
- Adversarial planning checks
- Confidence-calibrated estimation

---

### Coach Frontend Engineer (`coach-frontend-engineer`)
**Lines:** 197 | **Size:** 16KB | **Model:** Opus

Specializes in React, Next.js, Tailwind CSS, and building accessible, responsive UIs.

---

### Dan Backend Engineer (`dan-backend-engineer`)
**Lines:** 182 | **Size:** 16KB | **Model:** Opus

Methodical backend engineer handling APIs, database queries, authentication, and webhooks.

---

### Data Engineer (`data-engineer`)
**Lines:** 184 | **Size:** 12KB | **Model:** Opus

Database specialist for schema design, migrations, query optimization, and data pipelines.

---

### ShuakiPie Microservices (`shuakipie-microservices`)
**Lines:** 202 | **Size:** 16KB | **Model:** Opus

Microservices architect designing service boundaries, message queues, and distributed transactions.

---

### Realtime Systems Architect (`realtime-systems-architect`)
**Lines:** 164 | **Size:** 16KB | **Model:** Opus

Real-time systems expert for WebSockets, SSE, job queues, and streaming pipelines.

---

### Cypress QA Engineer (`cypress-qa-engineer`)
**Lines:** 186 | **Size:** 16KB | **Model:** Sonnet

QA engineer writing unit tests, integration tests, and E2E tests with edge case identification.

---

### Rhemson QA Automation (`rhemson-qa-automation`)
**Lines:** 177 | **Size:** 16KB | **Model:** Opus

E2E test automation, cross-browser testing, visual regression, and CI pipeline setup.

---

### Refactor Code Reviewer (`refactor-code-reviewer`)
**Lines:** 199 | **Size:** 16KB | **Model:** Opus

Code reviewer focused on quality, correctness, maintainability, and best practices.

---

### Ian Perf & Security Reviewer (`ian-perf-security-reviewer`)
**Lines:** 264 | **Size:** 20KB | **Model:** Opus

Performance analysis and security auditing for memory leaks, algorithmic complexity, and vulnerabilities.

---

### Shield Security Analyst (`shield-security-analyst`)
**Lines:** 230 | **Size:** 16KB | **Model:** Opus

Elite security analyst for OWASP Top 10, auth auditing, CVE scanning, and compliance checking.

---

### Vincent Design Systems (`vincent-design-systems`)
**Lines:** 194 | **Size:** 16KB | **Model:** Opus

Design systems engineer for tokens, component libraries, theming, and WCAG compliance.

---

### Jah Performance & Animations (`jah-performance-animations`)
**Lines:** 159 | **Size:** 16KB | **Model:** Opus

Frontend performance optimization, animation implementation, bundle size reduction, and Core Web Vitals.

---

### Sage Technical Writer (`sage-technical-writer`)
**Lines:** 179 | **Size:** 16KB | **Model:** Opus

Technical writer for API docs, READMEs, changelogs, runbooks, and developer guides.

---

### ShuakiPie n8n Master (`shuakipie-n8n-master`)
**Lines:** 142 | **Size:** 12KB | **Model:** Sonnet

The automation-platform master. World-class expert on **n8n** (every node, every expression, every quirk) and **Make.com** (every module, router, aggregator, data-store pattern). Speaks both dialects fluently and translates between them without losing fidelity.

**Key capabilities:**
- Full n8n mastery — stock nodes, LangChain/AI nodes, integrations, expressions (`$json`, `$node`, `$now`), sub-workflows, error workflows, queue mode
- Full Make.com mastery — bundles vs operations, routers, iterators, aggregators, data stores, error routes (Break/Resume/Commit/Rollback), scheduling
- Cross-platform translation with honest flagging of lossy conversions (e.g., n8n Code node → Make.com)
- Produces importable n8n workflow JSON and Make.com scenario blueprints that validate on first try
- Proactive skill loading — uses `n8n-workflow-patterns`, `n8n-node-configuration`, `n8n-validation-expert`, `n8n-code-javascript`, `n8n-code-python`, `n8n-expression-syntax`, `n8n-mcp-tools-expert`

**Operating protocol:** Infers platform from the user's vocabulary (module/scenario/bundle → Make.com; node/workflow/`$json` → n8n), asks once if ambiguous, never hands n8n syntax for a Make.com task or vice versa.

---

## Collaboration Map

Agents are designed to work together. Here's how they connect:

```
                         ┌─────────────────┐
                         │     DENDI        │
                         │  (Orchestrator)  │
                         └──┬──┬──┬──┬──┬──┘
                            │  │  │  │  │
           ┌────────────────┘  │  │  │  └────────────────┐
           │                   │  │  │                   │
    ┌──────▼──────┐    ┌───────▼──▼──▼───────┐    ┌──────▼──────┐
    │  FRONTEND   │    │      BACKEND        │    │   GROWTH    │
    │             │    │                     │    │             │
    │ Yam         │◄──►│ Joey Backend        │    │ Ryzen (SEO) │
    │ Coach       │    │ Joey Architect      │    │ Hyacinth    │
    │ Vincent     │    │ Dan                 │    │ (Marketing) │
    │ Jah         │    │ ShuakiPie           │    │             │
    │             │    │ Data                │    │             │
    │             │    │ Realtime            │    │             │
    └──────┬──────┘    └────────┬────────────┘    └──────┬──────┘
           │                    │                         │
           └────────┬───────────┘                         │
                    │                                     │
           ┌────────▼────────────────────────────────────▼─┐
           │              QUALITY GATE                      │
           │                                                │
           │  Cypress (QA)  ·  Rhemson (Automation)        │
           │  Refactor (Review)  ·  Ian (Perf/Security)    │
           │  Shield (Security)  ·  Sage (Docs)            │
           │                                                │
           └────────────────────────────────────────────────┘
```

### Key Collaboration Flows

| Flow | Agents Involved | Description |
|------|----------------|-------------|
| **Full-stack feature** | Dendi → Joey + Yam → Cypress → Shield | Orchestrate, build backend + frontend, test, security review |
| **API development** | Joey → Dan → Data → Refactor | Design API, implement, optimize queries, review code |
| **SEO launch** | Ryzen → Yam → Joey → Sage | SEO strategy, implement frontend, build sitemap API, document |
| **Landing page** | Hyacinth → Yam → Ryzen → Ian | Copy strategy, build page, SEO optimize, performance review |
| **Security hardening** | Shield → Joey → Dan → Ian | Audit, fix backend, fix APIs, verify fixes |
| **Performance sprint** | Ian → Jah → Yam → Data | Profile, optimize animations/bundle, fix renders, optimize queries |

---

## Best Practices

### 1. Use the right agent for the job
Don't use a backend agent for frontend work or vice versa. Each agent has deep expertise in their domain.

### 2. Let Dendi orchestrate complex projects
For multi-step projects touching multiple domains, start with Dendi to create a task plan before launching individual agents.

### 3. Always run quality gates
After any significant code change, proactively launch:
- `refactor-code-reviewer` for code quality
- `shield-security-analyst` for security
- `cypress-qa-engineer` for tests
- `ian-perf-security-reviewer` for performance

### 4. Use parallel agents when possible
Independent tasks (e.g., backend API + frontend UI) can run in parallel. This dramatically speeds up development.

### 5. Let agents build memory
Agents learn from your codebase over time. The more you use them, the more they understand your patterns, conventions, and preferences.

### 6. Be specific in task prompts
Instead of "add auth," say "Implement JWT authentication with refresh token rotation, argon2 password hashing, and rate-limited login endpoint."

### 7. Review agent recommendations
Agents are powerful but not infallible. Review their output, especially for:
- Security-sensitive code (auth, payments, PII handling)
- Architectural decisions that are hard to reverse
- Database migrations on production data

---

## Customization

### Modifying an Agent

Edit the `.md` file in `.claude/agents/` to customize any agent:

```bash
# Example: Add a new tech stack to Joey
vim .claude/agents/joey-fullstack-backend.md
```

Key sections you might customize:
- **Tech Stack**: Add/remove frameworks your project uses
- **Code Standards**: Adjust to match your team's conventions
- **Quality Checklist**: Add project-specific quality gates
- **Collaboration**: Update which agents work together

### Creating a New Agent

1. Create a new `.md` file in `.claude/agents/`:
   ```bash
   touch .claude/agents/your-agent-name.md
   ```

2. Add the frontmatter header:
   ```yaml
   ---
   name: your-agent-name
   description: "When to use this agent..."
   model: opus
   color: green
   memory: project
   ---
   ```

3. Define the agent's identity, expertise, standards, and memory instructions.

4. Create its memory directory:
   ```bash
   mkdir -p ~/.claude/.claude/agent-memory/your-agent-name
   echo "# Your Agent Memory" > ~/.claude/.claude/agent-memory/your-agent-name/MEMORY.md
   ```

### Adjusting Models

Change the `model` field in the frontmatter:
- `opus` — Most capable, best for complex tasks (default for most agents)
- `sonnet` — Faster, good for straightforward tasks (used by Cypress QA)

---

## Troubleshooting

### Agent not found
Ensure the agent file is in `.claude/agents/` within your project root and has the correct frontmatter.

### Agent memory not persisting
Check that the memory directory exists:
```bash
ls ~/.claude/.claude/agent-memory/{agent-name}/MEMORY.md
```

### Agent not using project context
Ensure `memory: project` is set in the agent's frontmatter.

### Agent giving generic responses
The agent may not have built up memory yet. Use it more on your project, and it will learn your patterns and conventions over time.

### Too many agents running
Claude Code has concurrency limits. Use Dendi to sequence tasks and manage parallelism.

---

## Stats

| Metric | Value |
|--------|-------|
| Total agents | 20 |
| Total lines of prompts | 6,240+ |
| Agents using Opus | 18 |
| Agents using Sonnet | 2 |
| Agents with persistent memory | 20/20 |
| Prompt engineering techniques | 6 (CoT, ToT, ReAct, Adversarial, Confidence, Step-Back) |

---

## License

MIT

---

Built with [Claude Code](https://claude.com/claude-code) by [@shuakipie87](https://github.com/shuakipie87)
