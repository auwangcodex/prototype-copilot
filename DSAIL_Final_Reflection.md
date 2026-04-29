# DSAIL Final Project — Reflection Report

**Student:** Austin Wang
**Section:** I
**Date:** April 29, 2026

**Project:** Prototype Co-Pilot
**Live Website:** https://auwangcodex.github.io/prototype-copilot/
**GitHub:** https://github.com/auwangcodex/prototype-copilot

**AI Disclosure:** Claude Code (Anthropic) was used throughout this project as the primary development environment. Claude Code executed the pipeline skills, generated prototype code, and assisted with the reflection writing. The core product decisions — framework selection, persona design, pipeline architecture, and scaling strategy — were made by me with Claude as a co-pilot.

**Word Counts:** Q1: 803 words | Q2: 692 words | Q3: 395 words

---

## Question 1: What did you build? Describe the pain point, the building process, and any design decisions you made along the way. (~800 words)

### The Pain Point

I'm pivoting from growth marketing into product management at AI startups. Nearly every PM interview includes a product exercise — design a feature, present a prototype, walk through a case study. Building a credible one takes days: research, competitor analysis, behavioral design, interactive code, stakeholder narrative. Most candidates skip the research and vibe-code something that looks functional but lacks depth. I wanted to automate the rigorous parts without sacrificing the thinking.

### The Building Process

The project started with a real Whoop PM interview. I needed to design an AI fitness coaching feature and decided to build the workflow itself as a reusable system: four Claude Code skills that chain together — `/pm-research`, `/pm-design`, `/pm-build`, `/pm-package` — taking a product from raw research to interactive prototype to stakeholder deliverables.

A key part of the building process was integrating third-party tools to extend the pipeline's capabilities beyond what a single AI session can do. I integrated a Python review scraping library for automated App Store analysis, Claude in Chrome MCP for live product walkthroughs, Firecrawl for JavaScript-rendered pages that standard web fetching can't handle, Mobbin for UI screenshot references, and a front-end design intelligence database for design tokens and style guidelines. I also built a pressure escalation skill (PUE) that automatically activates after three failed debugging attempts — a meta-tool that makes the pipeline more resilient when the build phase hits edge cases. Each integration addressed a specific capability gap: the review scraper handles structured data extraction, Claude in Chrome handles real-time product navigation, and the design database handles visual fidelity.

After Whoop, I generalized the workflow and tested it on BoldVoice (a pronunciation coaching app) and Canvas LMS (our HBS learning management system). The BoldVoice test revealed the critical difference between AI-layer analysis and human thinking. The pipeline's first research pass flagged a common user complaint: "the voice recognition model doesn't recognize my correct pronunciation." The AI's surface-level diagnosis was that the model's capability was insufficient. When I actually used the product myself, I discovered two competing hypotheses: (1) users pronounce correctly but the model fails to recognize it, or (2) users are still making mistakes but don't know it. After walking through the product, I realized the real issue was the latter — users who made repeated mistakes received the same generic hint each time, leaving them unable to tell whether they had improved or were still wrong. The fix wasn't a better model; it was staged, progressive feedback that addresses different error patterns. This is exactly the kind of insight that a purely automated pipeline misses — it requires a human who can experience the product's confusion firsthand and generate alternative hypotheses.

I also compared my pipeline against Lovable by giving it the same Canvas AI chatbot prompt. The comparison crystallized a complementary relationship: my pipeline excels at research and design thinking, while Lovable excels at production engineering. This led me to add a Lovable export format to `/pm-package` that bridges both systems.

### Design Decisions and Trade-Offs

**Fidelity vs. speed and cost.** I chose to integrate Claude in Chrome for live product walkthroughs, which means the AI navigates the actual product in a real browser, extracting verbatim UI copy and documenting exact navigation patterns. The trade-off is real: more screenshots and deeper walkthroughs mean longer research cycles and higher API credits. But the fidelity payoff is worth it — when I researched Canvas, the walkthrough revealed that its core problem is information architecture fragmentation (8 courses, each organized differently), which shifted the design from "better search" to a conversational abstraction layer. That insight was invisible from static screenshots.

**Zero-build-step prototypes vs. production architecture.** I deliberately chose single-file HTML prototypes (React 18 from CDN, no build tools) over the full-stack approach that Lovable generates (TypeScript, Supabase, edge functions). The trade-off is that my prototypes can't handle real authentication or databases, but they open in any browser instantly with zero setup — exactly what you need for an interview demo. For production, the Lovable export bridges the gap.

**Co-pilot vs. turnkey automation.** The pipeline pauses at three human checkpoints: framework selection, persona choice, and layout variant. I could have made it fully automated, but the co-pilot pattern produces better outcomes for two reasons. First, the human develops genuine understanding of the product decisions, which is essential for defending them in an interview. Second, the system learns the user's preferences over time — each checkpoint teaches the pipeline what kind of output the user actually wants, reducing the need to rerun entire phases. A turnkey solution that produces something wrong forces a full restart; a co-pilot that checks in early catches misalignment before it compounds.

---

## Question 2: If you were to scale this, what would you do? (~800 words)

### Scaling Prototype Co-Pilot

Prototype Co-Pilot is currently four Claude Code skills installed locally. Scaling it means getting it into the hands of MBA students, career switchers, and aspiring PMs who need research-backed prototypes for interviews, portfolio pieces, or internal pitches. The strategy operates across three channels, informed by several DSAIL frameworks.

### Channel 1: LinkedIn and Content-Driven Distribution

The most immediate channel is LinkedIn. From my growth marketing background, I know the best distribution for developer tools is showing the output, not describing the input. A 30-second screen recording of the Canvas Copilot prototype — with real HBS course data and AI chat responses — is more compelling than any feature list. This strategy targets the PM recruiting cycle: interview prep peaks in September-October (internships) and January-February (full-time). Timing content around these windows maximizes relevance.

This approach mirrors the **democratization** pattern we studied in DSAIL — how AI tools expand access to capabilities previously reserved for specialists. Just as Cosecha Fresca's citizen data scientist initiative enabled non-technical employees to perform analytics, Prototype Co-Pilot enables non-technical PM candidates to produce research-backed prototypes. The democratization insight is that the tool's value isn't just speed; it's giving people access to a workflow they couldn't execute alone.

### Channel 2: HBS Community and MBA Networks

HBS has 930 students per class, nearly all recruiting for roles where prototype demonstrations matter. The activation strategy is a 20-minute workshop: run the pipeline live on a product someone suggests, show the research brief being generated, and let them see the human-in-the-loop checkpoints. This live demo converts at a much higher rate than documentation.

The workshop format also demonstrates what DSAIL calls **task selection and mobilization** — the Pernod Ricard framework for identifying which tasks to automate and how to mobilize adoption across an organization. In the workshop, attendees see the pipeline decompose a complex PM workflow into discrete automated tasks (review scraping, competitor mapping, design token extraction) while preserving the high-judgment tasks (framework selection, persona design) for human decision-making. This decomposition is the core of effective AI deployment: automate the right tasks, not all tasks.

Beyond HBS, the same format scales to Stanford GSB, Wharton, Kellogg, and Booth through PM-focused student organizations.

### Channel 3: The Claude Code Skills Platform

The most scalable channel is the Claude Code skills ecosystem itself. Prototype Co-Pilot is positioned as a reference implementation of what DSAIL calls **agentic construction** — building multi-agent systems where specialized components chain together. The Whoz case studied how enterprises construct agentic workflows by composing specialized AI capabilities; Prototype Co-Pilot applies the same principle at the individual tool level, with four specialized skills that each handle a distinct phase.

The scaling motion is contributing to Anthropic's skills registry and positioning the pipeline architecture as a generalizable template. The pattern — research feeds design, design feeds build, build feeds package — extends beyond PM work. A sales team could build `/research-prospect` → `/design-pitch` → `/build-demo` → `/package-proposal`.

### Platform Strategy and the Lovable Integration

The long-term play connects to the **platforms for building** theme from the Lovable case. Lovable demonstrated that AI-native platforms create value by reducing the gap between idea and working product. Prototype Co-Pilot occupies a complementary position in that ecosystem: it handles the research and design thinking that Lovable's prompt-to-code model skips. The `/pm-package` skill already generates a Lovable-compatible build specification. If Lovable recognized these research briefs as a structured input format, users could go from idea to production app in a single workflow — a **multi-agent orchestration** pattern (the Manus framework) where specialized AI systems coordinate to produce an output that neither could achieve alone.

### Growth Flywheel

The growth flywheel mirrors the content-driven adoption we saw with Gamma in DSAIL: I publish a case study → readers install the tool → some run the pipeline → a subset share their results → their posts drive new installs. Each user-generated prototype becomes marketing material for the next user. The key metric is GitHub stars and forks — both a credibility signal and a genuine measure of adoption that compounds over time.

---

## Question 3: What are 1-2 earned insights? What did you learn that you couldn't have known without doing this project? (~400 words)

### Insight 1: Research Changes What You Build, Not Just How Well You Build It

I assumed AI-powered prototyping was primarily about speed — the same prototype, faster. What I discovered is that deep research fundamentally changes the product direction.

The BoldVoice test made this concrete. The pipeline's automated analysis of user reviews surfaced a complaint about voice recognition accuracy and diagnosed it as a model capability issue. But when I used the product myself, I discovered the real problem was feedback design: users who made repeated mistakes received the same generic hint, leaving them unable to tell whether they had improved. The fix wasn't better recognition — it was staged, progressive feedback. Without the human-in-the-loop research step, the pipeline would have built the wrong solution.

The same pattern appeared with Canvas. The live walkthrough revealed information architecture fragmentation — 8 courses, each organized differently — which shifted the design from "better search" to a conversational abstraction layer. In every DSAIL case we studied, from Microsoft Copilot to Manus, the companies that deployed AI most effectively deeply understood existing workflows before automating them. Research changes what you build.

### Insight 2: Orchestrate Tools, Don't Reinvent Them — But Your Thinking Is the Hard Part to Encode

The open-source AI ecosystem is exploding with specialized tools: review scrapers, browser automation, design databases, code generation platforms. Building any one from scratch would take months. Integrating them into a coherent workflow took days. Don't recreate the wheel — learning to coordinate best-in-class tools is more valuable than building inferior versions yourself.

But integrating packaged tools was the easy part. The hard part was encoding my own thinking into the workflow. When the pipeline runs the Branching 5 Whys, it generates plausible hypotheses — but it took me intervening with the BoldVoice example to catch that the AI's surface-level diagnosis was wrong. The real differentiation in AI-powered workflows isn't which tools you connect; it's how deeply the system captures your unique angle of analysis — your ability to question the AI's first answer, generate competing hypotheses, and know when something feels off. This is where agent products will diverge: not in capability (tools are converging), but in which system understands its user well enough to think like them.
