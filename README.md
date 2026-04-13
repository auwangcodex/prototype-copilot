# Prototype Co-Pilot

**Turn a product idea into an interactive prototype with stakeholder deliverables — in a single Claude Code session.**

Prototype Co-Pilot is a set of 4 Claude Code skills that automate the full PM workflow: deep product research, design architecture, interactive prototyping, and stakeholder packaging. Each skill chains into the next, building on the outputs of the previous phase.

```
/pm-research  →  /pm-design  →  /pm-build  →  /pm-package
```

## Why This Exists

Most "vibe coding" workflows start with a vague idea and jump straight to code. The result is a prototype that looks functional but lacks product depth — no user research, no behavioral framework, no design system, no stakeholder-ready narrative.

Prototype Co-Pilot adds the product thinking layer. It forces the rigor of real PM work (competitive analysis, root cause analysis, behavioral design) while automating the tedious parts (review scraping, design token extraction, deliverable formatting).

## Key Differentiators

### 1. Deep Research Integration, Not Just "Build Me an App"

The research phase doesn't just Google the product. It:

- **Scrapes 50+ App Store reviews** using a Python script, clustering them by theme (UI/UX, performance, features, privacy, etc.) with sentiment analysis
- **Analyzes 3-5 competitors** with positioning maps and feature gap analysis
- **Applies the Branching 5 Whys** — not a single linear "why" chain, but a tree of 2-3 competing hypotheses per pain point, preventing premature solution fixation
- **Runs a data utilization audit** — flags what user data the product already collects but underutilizes, surfacing opportunities invisible to surface-level analysis
- **Synthesizes cross-domain inspiration** — connects pain points from one domain to solution patterns from another (e.g., applying Duolingo's streak mechanics to a fitness app)

All powered by a tiered web scraping strategy: free tools first (WebSearch + WebFetch), falling back to Firecrawl only when JavaScript-rendered content requires it.

### 2. Human-in-the-Loop Checkpoints

The agent doesn't disappear for 30 minutes and come back with something you didn't ask for. It pauses at critical decision points:

- **Framework selection**: Presents 2-3 behavioral frameworks (Hook Model, Self-Determination Theory, Progress Mechanics) grounded in the research, and waits for your choice
- **Persona selection**: Proposes 3 distinct user personas with different goals and coach personalities, and lets you pick or refine
- **Layout variant**: Offers 2-3 prototype layout approaches (Goal-Centric, Coach-First, Activity Stream) with rationale for each

This "co-pilot" pattern — agent does the heavy lifting, human makes the strategic calls — produces better outcomes than full automation or full manual work.

### 3. Behavioral Design Built In

Every prototype is grounded in a behavioral framework, not just UI components. The design phase produces:

- **Pain points with problem → solution → assumption structure** — each assumption is testable
- **A 6-stage behavioral loop**: Trigger → Action → Variable Reward → Investment → Data Collection → Re-Trigger
- **Coach personalities** matched to user types — same platform, different delivery based on what motivates each persona
- **Measurable success criteria** at every stage (not "improve engagement" but "maintain recovery ≥65% for 80% of days")

### 4. Zero-Build-Step Prototypes

The build phase outputs a single HTML file that opens in any browser — no `npm install`, no build tooling, no servers. It includes:

- React 18 loaded from CDN with Babel for JSX
- iPhone device frame mockup (390×852px)
- 7 interactive components: goal banner, status rings, coach section, daily game plan, photo/meal logging, voice input, coach chat
- All state management with React hooks
- Design tokens applied from the research phase

Philosophy: *if you need to build before showing, you're too early.*

### 5. Stakeholder-Ready Deliverables

The package phase generates 3 formats at different levels of detail from the same source material:

| Format | Audience | Length | Purpose |
|--------|----------|--------|---------|
| **Email** | Stakeholders | 500-800 words | Problem → Insight → Solution hook |
| **Blog Post** | Public/portfolio | 1500-2500 words | Full case study with methodology |
| **Lovable Prompt** | AI app builder | Detailed spec | Design system + features + data model |

Each format tells a cohesive story grounded in the actual research, not generic marketing copy.

## Installation

```bash
git clone https://github.com/auwangcodex/prototype-copilot.git ~/prototype-copilot
cd ~/prototype-copilot
./install.sh
```

The installer will:
- Symlink skills into `~/.claude/skills/` so Claude Code picks them up
- Install Python dependencies (`app-store-web-scraper` for review scraping)
- Optionally configure Mobbin MCP for UI screenshot references

After installing, start a new Claude Code session (or `/clear`) for skills to load.

## Usage

### Full Pipeline

```bash
/pm-research Oura --idea "social sleep challenges"
/pm-design Oura
/pm-build sarah --project Oura
/pm-package --format all --project Oura
```

### Individual Skills

**Research a product:**
```
/pm-research Oura --idea "social sleep challenges"
```
→ `research-brief.md` + `design-tokens.md`

**Design from research:**
```
/pm-design Oura
```
→ `design-spec.md` + `persona-sarah.md`

**Build prototype:**
```
/pm-build sarah --project Oura
```
→ `prototype_sarah_v1.jsx` + `preview.html` (open in browser, zero build step)

**Package deliverables:**
```
/pm-package --format all --project Oura
```
→ `deliverables/` (stakeholder_email.md + blog_post.md + lovable_build_prompt.md)

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                        /pm-research                             │
│  Web scraping (tiered) → Review analysis (50+ reviews)          │
│  → Competitor mapping → Branching 5 Whys → Cross-domain ideas   │
│  → Design token extraction                                      │
│                          ↓                                      │
│  Output: research-brief.md, design-tokens.md                    │
├─────────────────────────────────────────────────────────────────┤
│                         /pm-design                              │
│  Load research → Auto-generate design system                    │
│  → [USER CHECKPOINT] Select behavioral framework                │
│  → [USER CHECKPOINT] Select persona                             │
│  → Generate coach personality + visual identity                 │
│                          ↓                                      │
│  Output: design-spec.md, persona-<name>.md                      │
├─────────────────────────────────────────────────────────────────┤
│                         /pm-build                               │
│  Load persona + design tokens                                   │
│  → [USER CHECKPOINT] Select layout variant                      │
│  → Build 7 interactive components                               │
│  → Generate zero-build-step HTML preview                        │
│                          ↓                                      │
│  Output: prototype_<name>_v1.jsx, preview.html                  │
├─────────────────────────────────────────────────────────────────┤
│                        /pm-package                              │
│  Load all artifacts → Extract key themes                        │
│  → Generate email (500-800w)                                    │
│  → Generate blog post (1500-2500w)                              │
│  → Generate Lovable.dev build spec                              │
│                          ↓                                      │
│  Output: deliverables/ (email + blog + lovable prompt)          │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
prototype-copilot/
├── skills/                 # Claude Code slash commands
│   ├── pm-research/        # Product intelligence gathering
│   ├── pm-design/          # Design architecture + personas
│   ├── pm-build/           # Interactive React/JSX prototyping
│   └── pm-package/         # Stakeholder deliverable generation
├── templates/              # Structured templates for each phase
│   ├── research-brief.md   # 200+ line research template
│   ├── design-spec.md      # Behavioral framework template
│   ├── persona-spec.md     # 50+ field persona template
│   └── prototype-scaffold.jsx  # 890-line React component scaffold
├── scripts/                # Python review scraper + theme analyzer
├── examples/               # Reference outputs (quality benchmark)
│   └── fitness-coach/      # Full pipeline example
└── projects/               # Generated output (gitignored)
```

## Optional: Mobbin MCP

For richer UI research, you can connect the Mobbin MCP server to pull real app screenshots:

1. Get a Mobbin Pro account at [mobbin.com](https://mobbin.com)
2. Run `install.sh` and follow the Mobbin setup prompt
3. `/pm-research` will automatically use Mobbin when available, falling back to web search otherwise

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI
- Python 3
- Node.js (for prototype preview)

## License

MIT
