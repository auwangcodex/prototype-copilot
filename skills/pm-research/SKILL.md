---
name: pm-research
description: Research a product for PM prototype design. Gathers features, user reviews, competitors, UI references, and design system.
argument-hint: <product-name> [--idea "your feature idea"]
allowed-tools: Read Write Edit Glob Grep Bash(python3:*) WebSearch WebFetch mcp__firecrawl__firecrawl_scrape mcp__firecrawl__firecrawl_search mcp__firecrawl__firecrawl_map mcp__firecrawl__firecrawl_extract
---

# PM Research Skill

This skill conducts comprehensive product research to inform prototype design. It gathers competitive intelligence, user feedback, UI patterns, and design systems.

## Execution Steps

### 1. Parse Arguments
- Extract product name from `$ARGUMENTS` (first argument, required)
- Check for optional `--idea` flag and capture the quoted feature idea
- Store both for use throughout the workflow

### 2. Gather Preliminary Inputs
Before starting research, ask the user:

```
Before I dive into research on [product-name], do you have any of the following?

1. **Preliminary research or thinking** — notes, hypotheses, or early analysis you've already done
2. **User interview notes or feedback** — conversations with real users, survey results, or qualitative insights
3. **Specific focus area** — a particular flow, feature, or problem you want to redesign (e.g., "the onboarding flow", "the checkout experience", "the content creation tool")
4. **None — start fresh**

(Enter 1-4, or paste/describe what you have)
```

**Wait for user response.** If user provides:
- **Preliminary research:** Read and incorporate as a starting hypothesis. Cross-reference and validate (or challenge) during research.
- **User interview notes:** Extract key themes (jobs-to-be-done, emotional pain points, workarounds, unmet needs). Incorporate into PM synthesis.
- **Specific focus area:** Use this to scope the competitive comparison (Step 6) and product walkthrough (Step 4) around this particular flow/feature.
- **None:** Proceed with broad research.

Store the focus area (if provided) — it will drive targeted competitive analysis later.

### 3. Create Project Directory
- Create directory: `~/pm-skills/projects/<product-name>/`
- Create subdirectory: `~/pm-skills/projects/<product-name>/ui-screenshots/`
- Use `mkdir -p` to ensure parent directories exist

### 3. Research Product Features & Capabilities

**Web Scraping Policy: Try default tools first, use Firecrawl as fallback (to conserve Firecrawl credits).**
- **First attempt**: Use `WebSearch` for discovery and `WebFetch` to scrape content from URLs.
- **If WebFetch fails** (empty/incomplete content, JS-rendered pages, cookie walls, anti-bot blocks), **retry the same URL with Firecrawl**:
  - `firecrawl_scrape` for single-page content extraction (handles JS, cookie walls, app stores)
  - `firecrawl_search` for web search when WebSearch returns poor results
  - `firecrawl_map` to discover pages on a site before scraping
  - `firecrawl_extract` for structured data extraction (e.g., pricing tables, feature lists)
- Keep a mental tally of which URLs needed Firecrawl so you can note it in the research brief.

Conduct web searches to gather:
- Core features and functionality
- Pricing tiers and business model
- Technical specifications (platforms, integrations, APIs)
- Data model and key entities (what objects/concepts the product tracks)

Search queries to use:
- "<product-name> features"
- "<product-name> pricing plans"
- "<product-name> technical specifications"
- "<product-name> data model"

### 4a. Product Walkthrough Audit (Real Screenshots)

Capture and analyze the actual product experience — not just what's described on their website, but what users actually encounter.

**Step 1: Capture Current Product Screens**
- Use `firecrawl_scrape` with `formats: ["screenshot"]` on the product's key pages (homepage, signup, main dashboard, the specific flow being studied)
- OR ask the user to provide screenshots: "Can you capture 10-15 screenshots walking through [the focus area / the core product flow]? Save them to `~/pm-skills/projects/<product-name>/ui-screenshots/` numbered sequentially (e.g., `01-landing.png`, `02-signup.png`, etc.)"
- If the product is a mobile app, ask the user to screen-record or screenshot the key flow

**Step 2: Sequential Journey Analysis**
For each screenshot (in order), document:
- **What screen is this?** (name and purpose)
- **What works well?** (clear UI, good copy, smart defaults)
- **What's confusing or broken?** (unclear CTAs, empty states, errors, missing guidance)
- **What's the user's emotional state here?** (confident, lost, frustrated, delighted)

**Step 3: Journey Map Output**
Create a journey map table:

| Step | Screen | What Happens | Works Well | Friction / Issues | User Emotion |
|------|--------|--------------|------------|-------------------|--------------|
| 1 | Landing page | User arrives | ... | ... | Curious |
| 2 | Sign up | ... | ... | ... | ... |
| ... | ... | ... | ... | ... | ... |

Save as part of the research brief (Section: "Current Product Walkthrough").

**Key insight:** This step often reveals broken features, misleading UI, and real friction that no amount of web research or review reading can surface. In the Creatify project, this step revealed that the URL import feature was completely broken — a critical finding that shaped the entire redesign.

### 4b. Fetch User Reviews
Run the review scraper script:
```bash
python3 ${CLAUDE_SKILL_DIR}/../../scripts/fetch_reviews.py --app-name "<product-name>"
```

The script will save reviews to a JSON file. Note the output location and read the reviews to extract:
- Common praise points
- Frequent complaints
- Feature requests
- User sentiment patterns

**Supplement with additional review sources** the script may miss:
- Try `WebFetch` first on App Store, Trustpilot, G2, Capterra, and third-party review blog URLs
- If WebFetch returns empty or incomplete content, retry with `firecrawl_scrape` (these sites often have JS-rendered content that Firecrawl handles well)

### 5a. Research Competitive Landscape
Web search for 3-5 direct competitors:
- "<product-name> competitors"
- "<product-name> alternatives"

For each competitor, gather:
- Company name and positioning
- Key differentiating features
- Pricing comparison
- Market segment focus

### 5b. Competitive Flow/Feature Teardown

**This step compares how competitors solve the same specific problem you're designing for.** The comparison target should match the project's focus area (from Step 2):

- If redesigning **onboarding**, compare onboarding flows across competitors
- If redesigning a **content creation tool**, compare the creation experience
- If redesigning **checkout/payment**, compare purchase flows
- If adding a **new feature** (e.g., AI assistant, collaboration), compare how competitors (or adjacent products) implement that same capability

**For 3-5 competitors, document the same flow:**

| Competitor | Steps to Complete | Time to Value | Clever Solutions | Friction Points |
|------------|-------------------|---------------|------------------|-----------------|
| Competitor A | ... | ... | ... | ... |
| Competitor B | ... | ... | ... | ... |
| ... | ... | ... | ... | ... |

**Identify patterns:**
- What do the best products all do? (table stakes)
- What does only 1 product do well? (differentiators to learn from)
- What does nobody do well? (opportunity gaps)

Use screenshots where possible — `firecrawl_scrape` with `formats: ["screenshot"]` on competitor pages, or web search for "<competitor> <feature> screenshots".

### 6. Behavioral & Domain Research
Search for relevant research based on the product domain:
- If health/fitness: search for behavior change frameworks, habit formation research
- If productivity: search for time management research, focus/attention studies
- If social: search for community building, engagement patterns
- If e-commerce: search for purchase behavior, decision-making research

Adapt to the specific product category.

### 7. UI Screenshots & Visual Research
**Option A (Preferred): Try Mobbin MCP Tools**
- Use ToolSearch to find Mobbin-related tools: `ToolSearch(query: "mobbin")`
- If available, search for the app: `mobbin_search` or similar
- Download 8-12 key screenshots to `~/pm-skills/projects/<product-name>/ui-screenshots/`
- Focus on: onboarding, main dashboard, key interaction flows, settings

**Option B (Fallback): Web Search + WebFetch (then Firecrawl if needed)**
- If Mobbin tools unavailable, search: "<product-name> app screenshots", "<product-name> UI design"
- Try `WebFetch` first to gather screenshot URLs from design galleries (Dribbble, Behance, official site)
- If WebFetch fails, use `firecrawl_scrape` to fetch the same URLs, or use `firecrawl_scrape` with `formats: ["screenshot"]` to capture visual snapshots of the product's website
- Document screenshot sources in research brief

**Record which method was used** for the research brief.

### 8. Extract Design System (if screenshots obtained)
If you successfully obtained UI screenshots:
- Use Read tool with image paths to analyze screenshots with vision
- Extract design tokens:
  - **Colors**: Primary, secondary, accent, background, text colors (hex codes)
  - **Typography**: Font families, sizes, weights for headings/body/labels
  - **Spacing**: Common margins, padding patterns (4px, 8px, 16px grid, etc.)
  - **Components**: Button styles, card patterns, navigation patterns, input fields
  - **Iconography**: Icon style (outline, filled, rounded, sharp)
- Save as `~/pm-skills/projects/<product-name>/design-tokens.md`

If no screenshots obtained:
- Skip this step and note in research brief that design tokens are not available

### 9. PM Synthesis — Root Cause Analysis & Feature Proposals

This phase transforms raw research findings into PM-grade product thinking. Do NOT skip this — it is what separates a data dump from actionable product insight.

#### Step A: Reconstruct the User Journey

Map findings to specific stages of the user lifecycle. For each stage, note what works, what's missing, and which user complaints map here:

| Stage | Timeframe | Key Questions |
|---|---|---|
| **Onboarding** | Day 0 | What happens? What data is collected? What's the first impression? |
| **First session** | Day 1 | Where is the first "aha moment"? Where does friction hit first? |
| **First week** | Days 2-7 | What makes users come back or not? Where do they get stuck? |
| **First month** | Days 8-30 | What causes the plateau? What triggers cancellation consideration? |
| **Long-term** | Month 2+ | Content repetition? Value justification at renewal? |

#### Step B: Branching "5 Whys" on Top 3 Complaints

For the top 3 user complaints, run a root cause analysis. **Critically, branch into multiple competing hypotheses at each level** — do not assume a single cause. Explore at least 2-3 plausible reasons at each branching point, then follow each branch to its own conclusion.

**Example structure:**

```
Complaint: "AI keeps flagging the same error after I correct it"
├── Hypothesis A: The AI evaluation is inaccurate
│   └── Why? Model not trained on enough L1-accented speech data
│       └── Solution: Improve model training; add confidence thresholds
├── Hypothesis B: The AI is accurate, but the user can't fix the error
│   └── Why? User doesn't understand what they're doing wrong
│       ├── B1: The explanation given is wrong or misleading
│       │   └── Solution: Audit coaching content for accuracy
│       ├── B2: The explanation is correct but too generic / not enough
│       │   └── Why? Feedback doesn't account for L1 interference
│       │       └── Solution: L1-specific coaching escalation
│       └── B3: The explanation is only given once and then just repeats
│           └── Why? No progressive hint system exists
│               └── Solution: Escalating feedback (hint → technique → full L1 explanation)
└── Hypothesis C: The AI is accurate AND the user did correct it, but the app doesn't register improvement
    └── Why? Threshold for "correct" is too strict
        └── Solution: Accept 80%+ as passing; show partial progress
```

For each complaint, produce a branching analysis like above with:
- At least 2-3 competing hypotheses at the first level
- Follow each branch to a specific, implementable solution
- Note which branches are most likely given the available evidence (reviews, competitor patterns, domain research)

#### Step C: Data Utilization Audit

List every piece of user data the product likely collects (from onboarding, assessments, usage patterns, account setup):
- Native language / L1
- Proficiency assessment scores
- Practice frequency and session length
- Error patterns by sound/skill
- Content completion history
- Subscription status and trial stage

For each, ask: **"Is this data being fully utilized in the product experience? What could it power that it currently doesn't?"** Flag underutilized data as potential feature opportunities.

#### Step D: Cross-Domain Solution Synthesis

Using the cross-domain inspiration research (Step 6) and the root cause analysis (Step B), explicitly connect:

> **Pain point** (from user reviews) + **Mechanism** (from cross-domain app) + **Existing data/capability** (from the product) = **Specific feature proposal**

Produce 5-7 concrete feature proposals, each structured as:
- **Problem:** What user pain point does this address? (with review evidence)
- **Inspiration:** Which cross-domain app demonstrates this mechanism working?
- **Solution:** What specifically should the product build? (be concrete — not "improve retention" but "add weekly streak with 5-of-7-day threshold")
- **Why it works:** What behavioral principle or evidence supports this?
- **Data required:** What data does the product already have (or need) to power this?

#### Step E: Quality Stress Test

Before finalizing, apply this check: "If someone used this research to write 3 product improvement suggestions for a PM job application at this company, would the research give them enough depth — including root causes, specific mechanisms, and evidence — to write something compelling?" If not, the synthesis is not done.

### 10. Generate Research Brief & PM Synthesis
- Read template: `${CLAUDE_SKILL_DIR}/../../templates/research-brief.md`
- Read example for quality reference: `${CLAUDE_SKILL_DIR}/../../examples/fitness-coach/research-brief.md`
- Fill in all template sections with gathered data:
  - Product Overview (features, pricing, platforms)
  - User Feedback (synthesized review themes)
  - Competitive Analysis (comparison table)
  - Behavioral Research (relevant frameworks)
  - UI/UX Patterns (screenshot insights or design tokens summary)
  - Data Model (key entities and relationships)
  - Opportunity Areas (gaps, pain points, feature ideas)
- If user provided `--idea` flag, include it prominently in Opportunity Areas section
- **Generate a separate `pm-synthesis.md`** containing:
  - User journey map with complaints mapped to stages
  - Branching 5 Whys analysis for top 3 complaints
  - Data utilization audit with underutilized data flagged
  - 5-7 concrete feature proposals (problem → inspiration → solution → evidence → data needed)

### 11. Save Research Brief
- Save completed brief to: `~/pm-skills/projects/<product-name>/research-brief.md`
- Save PM synthesis to: `~/pm-skills/projects/<product-name>/pm-synthesis.md`
- Ensure all sections are complete and well-formatted
- Include source citations where applicable

### 12. Present Summary & Next Steps
Present to user:
- Project directory location
- Number of reviews analyzed
- Number of competitors researched
- Whether design tokens were extracted (and method used)
- Key opportunity areas identified

Suggest next step:
```
Research complete. Run `/pm-design <product-name>` to start the design phase.
```

## Quality Standards
- Minimum 50 user reviews analyzed (if available)
- At least 3 competitors researched
- All template sections filled with substantive content
- Design tokens extracted if screenshots available
- Clear, actionable opportunity areas identified
- **Product Walkthrough Audit must include:**
  - Sequential journey map of actual product screens
  - Specific friction points and broken features identified
  - User emotional state mapped across the journey
- **Competitive Flow Teardown must include:**
  - Same flow/feature compared across 3+ competitors
  - Patterns identified (table stakes, differentiators, opportunity gaps)
- **PM Synthesis must include:**
  - User journey reconstruction with complaints mapped to specific stages
  - Branching 5 Whys for top 3 complaints (minimum 2-3 hypotheses per branch, not single-path)
  - Data utilization audit identifying at least 2 underutilized data opportunities
  - 5-7 concrete feature proposals with problem → solution → evidence structure
  - Stress test passed: research is deep enough to support a compelling PM job application

## Error Handling
- If product not found in App Store, note in brief and use web reviews instead
- If Mobbin unavailable and web screenshots scarce, proceed with text-only research
- If competitor data limited, focus on product differentiation opportunities
- Always complete the research brief even with partial data
