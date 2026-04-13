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

**Purpose:** Detailed build prompt for Lovable.dev (AI-powered app builder).

**Structure (Specification Document):**

**Header:**
```
# [Product Name] - [Persona Name] Prototype
Build Specification for Lovable.dev

Project: [Project Name]
Generated: [Current Date]
Based on: [List source artifacts]
```

**Section 1: Product Overview (100-150 words):**
- What this app does (user perspective)
- Core value proposition
- Primary user goal
- Key behavioral framework applied

**Section 2: Design System (STRICT REQUIREMENTS)**

**If design-tokens.md exists:**
```
## Design System - EXACT SPECIFICATIONS

These values MUST be used exactly as specified. Do not deviate.

### Colors
- Primary: #[hex] - [usage: buttons, active states]
- Secondary: #[hex] - [usage: backgrounds, secondary CTAs]
- Accent: #[hex] - [usage: alerts, highlights]
- Background: #[hex] - [usage: main background]
- Surface: #[hex] - [usage: cards, elevated components]
- Text Primary: #[hex]
- Text Secondary: #[hex]
- Success: #[hex]
- Warning: #[hex]
- Error: #[hex]

### Typography
- Font Family: [exact font name]
- Headings: [size/weight for h1, h2, h3]
- Body: [size/weight for normal text]
- Labels: [size/weight for UI labels]
- Captions: [size/weight for small text]

### Spacing Scale
- Base unit: [4px or 8px]
- Scale: [e.g., 4, 8, 12, 16, 24, 32, 48, 64]
- Component padding: [standard padding for cards, buttons]
- Section margins: [vertical spacing between sections]

### Components
- Border radius: [px value for buttons, cards, inputs]
- Button height: [min height]
- Input height: [standard height]
- Shadow: [box-shadow values for elevation levels]
- Icon size: [standard sizes: small, medium, large]
```

**If no design tokens:**
```
## Design System - FLEXIBLE GUIDELINES

Use your best judgment with modern iOS-style design:
- Clean, minimal aesthetic
- Ample whitespace
- Rounded corners (8-12px)
- Subtle shadows for depth
- Sans-serif system fonts
- Accessible color contrast (WCAG AA minimum)
```

**Section 3: Layout & Information Architecture**

**Specify the selected layout variant:**
```
## Layout: [Goal-Centric / Coach-First / Activity Stream]

### Screen Structure
[Describe the layout hierarchy from top to bottom]

Example:
1. Goal Banner (top 20% of screen)
   - Gradient background
   - Goal statement centered
   - Target date or milestone

2. Progress Rings (middle section)
   - 3 circular gauges in grid layout
   - Each labeled with metric name
   - Percentage and trend arrow

3. Coach Section
   - Coach card with avatar
   - Message text (2-3 lines)
   - "View Game Plan" button
   - Game plan timeline (collapsible)

4. Action Buttons (bottom area)
   - Primary: "Log Meal"
   - Secondary: "Add Photo"
   - Tertiary: "Voice Input"

5. Bottom Navigation
   - Home, Log, Coach, Profile icons
```

**Section 4: Features & Interactions (DETAILED REQUIREMENTS)**

**For each core feature, specify:**

**Format:**
```
### Feature: [Feature Name]

**User Goal:** [What user wants to accomplish]

**Trigger:** [How user initiates - button, gesture, auto]

**Flow:**
1. [Step 1 with UI state]
2. [Step 2 with UI state]
3. [Step 3 with UI state]
4. [Completion state]

**UI Requirements:**
- [Specific components needed]
- [Layout constraints]
- [Interactive elements]

**Copy/Content:**
- [Button labels]
- [Placeholder text]
- [Coach messages (use exact examples from persona spec)]

**Validation/Error Handling:**
- [What to validate]
- [Error messages]
- [Edge cases]
```

**Required Features to Specify:**

1. **Goal Setting & Progress Display**
2. **Meal Logging Flow** (3 stages)
3. **Photo Capture/Upload**
4. **Voice Input** (4 states)
5. **Coach Messages** (contextual feedback)
6. **Game Plan Timeline**
7. **Coach Chat Interface** (full-screen overlay)
8. **Journal/Log History**
9. **Profile/Settings** (basic)

**Section 5: Coach Personality & Messaging**

```
## Coach Persona: [Coach Name]

**Personality Traits:** [List 4-5 traits from persona spec]

**Communication Style:**
- Tone: [warm/analytical/energetic/etc.]
- Language: [casual/professional/technical/etc.]
- Emoji use: [frequent/occasional/none]
- Message length: [concise/detailed]

**Example Messages:**
[Include 8-10 specific example messages from persona spec]
- Onboarding: "[message]"
- After meal log: "[message]"
- Progress milestone: "[message]"
- Low engagement: "[message]"
- Goal achievement: "[message]"
- Setback/miss: "[message]"

**Messaging Rules:**
- Always [specific behavior]
- Never [specific behavior]
- When [condition], say [message type]
```

**Section 6: Data Model & State Management**

```
## Data Structure

### User Profile
- name: string
- goal: string
- targetDate: date
- preferences: object

### Daily Log Entry
- id: uuid
- timestamp: datetime
- type: 'meal' | 'photo' | 'note'
- content: string
- imageUrl?: string
- tags: string[]
- coachFeedback?: string

### Progress Metrics
- metricName: string
- currentValue: number
- targetValue: number
- unit: string
- trend: 'up' | 'down' | 'stable'
- goalRelevance: string

### Game Plan Item
- id: uuid
- title: string
- description: string
- dueTime: time
- status: 'pending' | 'complete' | 'skipped'
- icon: string
```

**Section 7: Mobile Responsiveness**

```
## Device Constraints
- Primary target: iPhone (390px - 414px width)
- Touch targets: Minimum 44px height/width
- Font sizes: Minimum 16px for body text
- Scrollable areas: Clearly indicated
- Bottom navigation: Fixed/sticky position
```

**Section 8: Demo Data & Initial State**

```
## Prepopulate for Demo

### User Profile
[Specify exact demo user details]

### Sample Log Entries
[Provide 5-7 realistic log entries with timestamps]

### Sample Coach Messages
[Provide 3-5 messages for demo chat]

### Initial Progress Values
[Provide starting metric values]
```

**Section 9: Out of Scope (for v1)**

```
## Not Required for Initial Build
- Backend/database integration (use local state)
- User authentication
- Push notifications
- Advanced analytics
- Social sharing
- Multi-user support
- [Any other features from research that aren't in MVP]
```

**Section 10: Success Criteria**

```
## Prototype is Complete When:
- All 7 core features are interactive
- Coach personality is evident in all messages
- Design system is consistently applied
- Layout matches specified variant
- Flows are smooth (no broken states)
- Mobile-optimized (looks good on iPhone)
- Demo data makes the experience feel real
```

**Tone for Lovable Prompt:**
- Extremely specific and prescriptive for design system
- Flexible and empowering for implementation details
- Clear about must-haves vs nice-to-haves
- Includes rationale for key decisions (helps AI understand intent)

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
