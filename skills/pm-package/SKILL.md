---
name: pm-package
description: Package PM prototype into communication deliverables - email, blog post, build prompts.
argument-hint: [--format email|blog|lovable|all] [--project <project-name>]
allowed-tools: Read Write Edit Glob Grep
---

# PM Package Skill

This skill packages completed PM prototypes into stakeholder communication deliverables. It generates emails, blog posts, and build prompts from research and design artifacts.

## Superpowers Integration

When the [Superpowers plugin](https://github.com/obra/superpowers) is available, leverage its structured workflow disciplines at key points in the packaging process:

**Strategy Phase (Before Generating Deliverables):**
- **RECOMMENDED SUB-SKILL:** `superpowers:brainstorming` — Before generating deliverables, use the brainstorming discipline to validate the deliverable strategy: what themes to emphasize, what narrative angle to take, and how to position the prototype's value for each audience (stakeholder email vs. public blog vs. build prompt).

**Generation Phase (Step 4 - Generate Deliverables):**
- **RECOMMENDED SUB-SKILL:** `superpowers:executing-plans` — Each deliverable format (email, blog, Lovable prompt) is an independent task that benefits from Superpowers' disciplined execution with quality checkpoints between each.

> **Note:** These are recommendations, not requirements. The pm-package skill works fully without Superpowers installed.

## Execution Steps

### 1. Parse Arguments & Identify Project
**Parse `$ARGUMENTS`:**
- Extract `--format` flag (default: "all")
  - Valid values: email, blog, lovable, all
- Extract `--project <project-name>` flag (optional)

**If no --project specified:**
- Use Glob to find projects: `~/pm-skills/projects/*/`
- Check for projects with prototype files (prototype_*.jsx)
- Select most recent or present list to user
- Ask user to select project

**If --project specified:**
- Verify directory exists: `~/pm-skills/projects/<project-name>/`

### 2. Load All Project Artifacts
Read the following files from `~/pm-skills/projects/<project-name>/`:

**Core artifacts:**
- `research-brief.md` - Product research and insights
- `design-spec.md` - Pain points and behavioral framework
- All `persona-*.md` files - Persona specifications
- All `prototype_*.jsx` files - Built prototypes

**Optional artifacts:**
- `design-tokens.md` - Design system details
- Review JSON files - Raw user feedback data

**If any core artifacts missing:**
- Note which are missing
- Generate deliverables with available content
- Mark incomplete sections clearly

### 3. Analyze Artifacts for Key Themes
Extract the following from loaded artifacts:

**From research-brief.md:**
- Core problem space
- Key user pain points (top 3)
- Competitive gaps or opportunities
- Most requested features from reviews

**From design-spec.md:**
- Selected behavioral framework
- Pain point → solution mappings
- Strategic approach summary

**From persona specs:**
- Primary persona details (demographics, goal)
- Coach personality and approach
- Day-in-life scenario highlights

**From prototype JSX:**
- Key interactive features (scan for component names, state logic)
- User flows implemented (logging, chat, journal)
- Visual design approach (extract from styles)

### 4. Generate Deliverables Based on Format

> **Superpowers tip:** Each format below (email, blog, Lovable) is an independent task. If `superpowers:executing-plans` is available, use it to execute each deliverable as a discrete task with quality checkpoints.

---

## FORMAT: EMAIL

**Purpose:** Concise stakeholder communication for outreach, updates, or approvals.

**Structure (500-800 words):**

**Subject Line:**
- Compelling hook: "[Product Name] Prototype: [Key Insight]"
- Example: "[Product] Prototype: Making Every Meal Matter for Body Composition"

**Opening (50-75 words):**
- Start with the problem (specific, relatable)
- Hook with surprising insight from research
- Preview what you built

**The Research (100-150 words):**
- Key findings from user reviews (quantify: "78% of users said...")
- Competitive gap identified
- Behavioral insight that shaped the approach

**The Insight (75-100 words):**
- The "aha moment" that led to the design
- Connect research to behavioral framework
- Explain why existing solutions fall short

**What We Built (200-300 words):**
- Describe the prototype experience (user perspective)
- Walk through 1-2 key interactions (meal logging, coach feedback)
- Highlight how it applies the behavioral framework
- Mention persona (who it's designed for)

**Why It Works (75-100 words):**
- Connect features to behavioral principles
- Explain expected user impact
- Note design system choices (if relevant)

**Next Steps (50-75 words):**
- What feedback you're seeking
- How to view the prototype (link or attachment note)
- Timeline for next phase

**Tone:**
- Conversational but professional
- Blog-style (not formal memo)
- Enthusiastic without hype
- Data-informed but not academic

**Save as:** `~/pm-skills/projects/<project-name>/deliverables/stakeholder_email.md`

---

## FORMAT: BLOG

**Purpose:** Comprehensive public or internal case study of the design process.

**Structure (1500-2500 words):**

**Title:**
- Clear value proposition: "Designing [Product Feature]: How [Behavioral Principle] Drives [Outcome]"
- Example: "Designing [Product]'s Meal Impact Coach: How Real-Time Feedback Drives Body Composition Goals"

**Introduction (150-200 words):**
- Set the scene with a user story or problem scenario
- State the design challenge
- Preview the solution and key learnings

**Section 1: The Problem (300-400 words):**
- Deep dive into user pain points
- Support with research data (review quotes, competitive analysis)
- Explain why this problem matters (market size, user impact, strategic value)
- Include a "Current State" description (what users do now)

**Section 2: The Research (400-500 words):**
- Methodology: What you studied (App Store reviews, competitive teardowns, UI analysis)
- Key findings (3-5 major insights):
  - User feedback themes
  - Competitive gaps
  - Behavioral research discoveries
- Include data visualizations placeholder: `[Chart: User Pain Point Frequency]`
- Explain how research informed design direction

**Section 3: The Solution (500-700 words):**
- Introduce the behavioral framework chosen
- Explain framework principles and why it fits
- Walk through the persona (mini profile):
  - Who they are
  - Their goal
  - How the coach supports them
- Describe the prototype experience:
  - Goal-setting and progress visualization
  - Interaction flows (logging, feedback, journaling)
  - Coach personality and messaging approach
- Include screenshot placeholders: `[Screenshot: Main Dashboard]`, `[Screenshot: Meal Logging Flow]`

**Section 4: Design Deep Dive (300-400 words):**
- Explain key design decisions:
  - Layout rationale (why goal-centric vs coach-first)
  - Visual hierarchy (what gets attention, why)
  - Interaction patterns (how users move through flows)
- If design tokens extracted, discuss design system choices:
  - Color psychology (why these colors)
  - Typography choices (readability, personality)
  - Component patterns (consistency with existing product)
- Accessibility and mobile considerations

**Section 5: Strategy & Impact (200-300 words):**
- How this fits into broader product strategy
- Expected user behavior changes (based on framework)
- Metrics to track success:
  - Engagement (DAU, session length)
  - Behavior change (logging frequency, goal achievement)
  - Satisfaction (NPS, review sentiment)
- Potential future enhancements

**Conclusion (100-150 words):**
- Summarize key learnings
- Restate the value proposition
- Call to action (feedback, collaboration, try prototype)

**Tone:**
- Professional thought leadership
- Educational and insightful
- Story-driven (use narrative structure)
- Balanced data and human examples

**Save as:** `~/pm-skills/projects/<project-name>/deliverables/blog_post.md`

---

## FORMAT: LOVABLE

**Purpose:** Research-grounded build specification for Lovable.dev (AI-powered app builder). Unlike a generic prompt, this spec feeds verified product data, real user scenarios, and tested design decisions into Lovable — producing output that's accurate and product-aware, not just plausible-looking.

**Key Principle:** The Lovable prompt must include **verified data from the research phase** (real user data, actual product structure, confirmed pain points) so that Lovable builds with facts rather than hallucinating plausible content. This is our pipeline's core advantage.

**Structure (Specification Document):**

**Header:**
```
# [Product Name] - Build Specification for Lovable.dev

Project: [Project Name]
Generated: [Current Date]
Based on: Research Brief, PM Synthesis, Design Spec, Persona Spec, Design Tokens
```

**Section 1: Product Overview & Research Context (200-300 words)**

Provide the WHY, not just the WHAT. Lovable builds better when it understands the problem:

- What this app does (user perspective, one sentence)
- The core problem it solves (from research brief — specific, evidence-backed)
- Key research findings that shaped the design (2-3 bullet points from PM synthesis)
- Behavioral framework applied and why (from design spec)
- Target user (from persona — demographics, context, primary goal)
- Competitive context (what exists today, why it's insufficient — from competitive analysis)

**Section 2: Design System (STRICT REQUIREMENTS)**

**If design-tokens.md exists, transcribe exact values:**
```
## Design System — EXACT SPECIFICATIONS
These values MUST be used exactly as specified. Do not deviate.

### Colors
[Transcribe full color palette from design-tokens.md with hex values, CSS variable names, and usage notes]

### Typography
[Transcribe font families, size scale, weights, and usage from design-tokens.md]

### Spacing Scale
[Transcribe spacing system from design-tokens.md]

### Component Patterns
[Transcribe component-specific styles: border radius, shadows, button styles, card styles, input styles from design-tokens.md]

### Animation Guidelines
[Transcribe motion/animation rules from design-tokens.md]

### Anti-Patterns
[Transcribe "avoid" list from design-tokens.md]
```

**If no design tokens:**
```
## Design System — FLEXIBLE GUIDELINES
Use modern, clean design with accessible color contrast (WCAG AA minimum).
```

**Section 3: Layout & Information Architecture**

Specify the layout from the design spec, adapted for the product type:

```
## Layout Structure

### Screen Hierarchy
[Describe zones from top to bottom / left to right, with sizing]
[Reference the persona's dashboard layout section if it exists]

### Navigation Pattern
[Describe primary navigation: sidebar, tabs, bottom bar, etc.]
[Specify which nav items are functional vs placeholder for prototype]

### Content Priority
[What the user sees FIRST — this comes from the behavioral framework]
[What requires interaction to access]
[What is available but secondary]
```

**Section 4: Features & Interactions (DETAILED)**

**For each feature from the design spec's "Must Have" and "Should Have" lists:**

```
### Feature: [Feature Name]

**User Story:** As [persona name], I want to [action] so that [benefit].
(Ground this in the persona spec's scenarios)

**Trigger:** [How user initiates — button click, page load, typed query, etc.]

**Flow:**
1. [Step with UI state description]
2. [Step with UI state description]
3. [Completion state]

**UI Requirements:**
- [Specific components, layout constraints, interactive elements]

**Copy/Content (EXACT — from persona spec or research):**
- [Button labels, placeholder text, headings — use verified copy, not generic]
- [AI/assistant responses — use exact sample dialogue from persona spec]

**Edge Cases:**
- [What happens on empty state, error, unexpected input]
```

**Section 5: AI/Assistant Personality & System Prompt**

**This section is critical — it prevents Lovable from generating a generic chatbot.**

```
## AI Assistant Configuration

### Personality
[Transcribe from persona spec: archetype, tone, communication style]

### System Prompt (EXACT — paste this into the AI configuration)
[Write a complete system prompt that includes:]

1. Role and personality definition
2. VERIFIED DATA from research:
   - Real user/course/product data discovered during walkthrough
   - Actual structure, names, dates, and relationships observed
   - Specific details that were confirmed (not assumed)
3. Response format instructions
4. Example Q&A pairs from persona spec's sample dialogue
5. Boundaries (what the AI should NOT do)

### Pre-Built Responses (for demo reliability)
[For prototype/demo purposes, include 3-5 pre-scripted Q&A pairs that use verified data. These ensure the demo always works even if the AI model hallucinates.]

Pair 1:
- User: "[exact query from persona scenario]"
- AI: "[exact response from persona spec — with verified data]"

Pair 2: ...
```

**Section 6: Data Model & Demo Data**

```
## Data Structure

### Core Entities
[Define data model based on the product — NOT a generic template]
[Pull entity names and relationships from research brief's "Data Model" section]

### Demo Data (VERIFIED — from research walkthrough)
[Populate with REAL data observed during the product walkthrough]
[This is what makes the demo credible vs generic]

Example entries:
[Provide 5-10 realistic data entries with real names, dates, content from research]
```

**Section 7: Responsive Design**

```
## Device Targets
- Primary: [Desktop / Mobile / Tablet — based on product context]
- Breakpoints: [specific px values if defined in design tokens]
- Touch targets: Minimum 44px
- Font minimum: 16px body text on mobile
```

**Section 8: Out of Scope (v1)**

```
## Not Required for Prototype
[List features from the design spec's "Won't Have" section]
[List any research-identified features that are future enhancements]
- [Feature]: [Why it's deferred — reference research or design rationale]
```

**Section 9: Success Criteria**

```
## Prototype is Complete When:
[Pull from design spec's success criteria]
[Add product-specific quality checks]
- Demo data makes the experience feel real (not lorem ipsum)
- AI responses use verified data (not hallucinated content)
- Design system is consistently applied
- All "Must Have" features are interactive
- [Product-specific criteria from persona success section]
```

**Quality Rules for Lovable Prompt Generation:**
- Every piece of content (course names, deadlines, file names, user data) must come from verified research artifacts — NEVER invent plausible-sounding data
- The system prompt section must include real product data discovered during the walkthrough — this is the single biggest quality differentiator vs. a generic Lovable prompt
- Pre-built demo responses must match the persona's sample dialogue exactly
- Design tokens must be transcribed precisely from design-tokens.md
- Feature specs must reference the behavioral framework to explain WHY each feature exists

**Save as:** `~/pm-skills/projects/<project-name>/deliverables/lovable_build_prompt.md`

---

### 5. Reference Quality Example
Before generating any deliverable, read:
- `${CLAUDE_SKILL_DIR}/../../examples/fitness-coach/email_blog.md`

Use this as a quality benchmark for:
- Tone and narrative flow
- Level of detail and specificity
- Balance of data and storytelling
- Structure and formatting

Match or exceed the quality of this reference example.

### 6. Create Deliverables Directory
If it doesn't exist:
- `mkdir -p ~/pm-skills/projects/<project-name>/deliverables/`

### 7. Save Generated Deliverables
Based on `--format` flag:

**If "email":**
- Save only `stakeholder_email.md`

**If "blog":**
- Save only `blog_post.md`

**If "lovable":**
- Save only `lovable_build_prompt.md`

**If "all" (default):**
- Save all three files

### 8. Present Summary
Provide user with:
- Absolute paths to all generated files
- Word counts for each deliverable
- Brief description of what each is for:
  - Email: "Send to stakeholders for feedback"
  - Blog: "Publish as case study or internal documentation"
  - Lovable: "Paste into Lovable.dev to build a working app"

**Final message:**
```
Deliverables complete. Files generated:
- [absolute path to stakeholder_email.md] (XXX words)
- [absolute path to blog_post.md] (XXXX words)
- [absolute path to lovable_build_prompt.md] (XXXX words)

Next steps:
- Review and edit deliverables as needed
- Share prototype preview.html with stakeholders
- Use Lovable prompt to build a production-ready version
```

## Quality Standards
- Email is concise, compelling, and actionable (500-800 words)
- Blog post is comprehensive and insightful (1500-2500 words)
- Lovable prompt is specific about design system, flexible about implementation
- All deliverables tell a cohesive story (consistent themes across formats)
- Copy reflects coach personality and behavioral framework
- Data from research is cited and used effectively
- No Lorem Ipsum or placeholder content (all sections complete)

## Content Quality Checklist
Before saving each deliverable, verify:
- Persona details are accurate and specific
- Behavioral framework is explained clearly
- Research insights are integrated (not just listed)
- Design decisions have rationale
- Tone matches format (casual for email, professional for blog, prescriptive for Lovable)
- All template sections are filled with substantive content
- No contradictions across deliverables

## Error Handling
- If research brief missing, generate based on design spec and persona alone (note limitation)
- If persona spec incomplete, use reasonable defaults for missing details
- If no prototype built yet, focus deliverables on design vision (note that demo is pending)
- If design tokens missing, note in Lovable prompt that system is flexible
- Always generate complete deliverables even with partial inputs (mark gaps clearly)
