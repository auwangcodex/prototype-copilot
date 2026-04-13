---
name: pm-design
description: Design product architecture from research brief. Creates pain points, behavioral framework, and persona specs.
argument-hint: [project-name]
allowed-tools: Read Write Edit Glob Grep WebSearch Bash(python3:*) Skill(ui-ux-pro-max) mcp__magicuidesign-mcp__*
---

# PM Design Skill

This skill transforms research insights into product design architecture. It identifies pain points, selects behavioral frameworks, and creates detailed persona specifications.

## Design Enhancement Skills (Auto-Activated)

This skill leverages three specialized design tools to produce high-quality, professional UI/UX output. These are automatically referenced during design system and prototype planning steps:

### 1. Frontend Design (Anthropic Official Plugin)
- **Purpose**: Provides bold aesthetic direction — distinctive typography, color palettes, spatial composition, and motion design
- **When used**: During design token generation (Step 2b) and persona visual identity (Step 7)
- **Key principle**: Avoid generic "AI slop" aesthetics. Every design choice must be intentional and context-appropriate
- **Guidelines to follow**:
  - Choose distinctive, characterful fonts (NEVER default to Inter, Roboto, Arial, or system fonts)
  - Commit to a cohesive aesthetic tone (e.g., brutalist, luxury, editorial, organic, retro-futuristic)
  - Use dominant colors with sharp accents — avoid timid, evenly-distributed palettes
  - Add atmosphere through gradient meshes, noise textures, geometric patterns, layered transparencies
  - Focus motion on high-impact moments: orchestrated page loads with staggered reveals

### 2. UI/UX Pro Max (Design Intelligence Database)
- **Purpose**: Searchable database of 50+ styles, 161 color palettes, 57 font pairings, 99 UX guidelines, 25 chart types
- **When used**: During design system generation (Step 2b) — run the CLI tool to get data-driven recommendations
- **How to invoke**:
  ```bash
  # Generate full design system (REQUIRED for every new project)
  python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<product-keywords>" --design-system -p "<project-name>"

  # Supplement with domain-specific searches
  python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<keywords>" --domain <domain>
  # Domains: product, style, color, typography, landing, chart, ux, google-fonts, react, web, prompt
  ```
- **Priority rules to always check**: Accessibility (4.5:1 contrast), Touch targets (44×44px min), Performance (lazy load, CLS < 0.1)

### 3. Magic UI MCP (Component Library)
- **Purpose**: Access to Magic UI React + Tailwind animated component library
- **When used**: During layout proposal (Step 6 of pm-build) — suggest specific Magic UI components for polished UI elements
- **Available MCP tools**: `listRegistryItems`, `searchRegistryItems`, `getRegistryItem`
- **Example components**: Marquees, blur-fade text, grid backgrounds, animated cards, device mockups

## Execution Steps

### 1. Identify or Select Project
**If project-name provided in `$ARGUMENTS`:**
- Use that project name directly
- Verify directory exists: `~/pm-skills/projects/<project-name>/`

**If no project-name provided:**
- Use Glob to list all projects: `~/pm-skills/projects/*/`
- Present numbered list to user
- Ask user to select a project or provide the name

### 2. Load Research Artifacts
Read the following files from `~/pm-skills/projects/<project-name>/`:

**Required:**
- `research-brief.md` - If missing, stop and instruct user: "Research brief not found. Run `/pm-research <project-name>` first."

**Optional:**
- `design-tokens.md` - If exists, load for design system reference
- Any review JSON files from research phase

### 2b. Generate Design System (NEW — Auto-Activated)
After loading research artifacts, automatically generate a professional design system using UI/UX Pro Max:

**Step 1: Run design system generator**
```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<product-type> <style-keywords>" --design-system -p "<project-name>"
```
Extract product type and style keywords from the research brief (e.g., "fitness coaching wellness motivational", "fintech dashboard professional").

**Step 2: Apply Frontend Design philosophy**
Review the generated design system and enhance it with Frontend Design principles:
- Replace any generic font choices with distinctive, characterful alternatives
- Ensure the color palette has a dominant color with sharp accents (not evenly distributed)
- Define a clear aesthetic tone (e.g., "warm organic minimalism" or "bold editorial maximalism")
- Specify motion/animation approach (what deserves animation vs. what should be static)

**Step 3: Check Magic UI components**
Search the Magic UI registry for relevant animated components that could enhance the prototype:
- Use the `searchRegistryItems` MCP tool with keywords relevant to the product
- Note 3-5 Magic UI components that could be used in the prototype build phase

**Step 4: Save enhanced design system**
Save to `~/pm-skills/projects/<project-name>/design-tokens.md` with:
- Style name and aesthetic tone
- Color palette (with CSS variable names)
- Typography system (heading + body font pairing, scale)
- Spacing scale and layout approach
- Animation/motion guidelines
- Recommended Magic UI components for prototype
- Anti-patterns to avoid

### 3. Identify Pain Points
Analyze the research brief and extract 3-5 core pain points using this structure:

**For each pain point:**
- **Problem**: What specific user problem or friction exists?
- **Solution**: How could this be solved? (high-level approach)
- **Assumption**: What do we assume must be true for this solution to work?

Format as a structured section in the design spec.

Example:
```
### Pain Point 1: Progress Tracking Overwhelm
- **Problem**: Users struggle to connect daily actions to long-term goals
- **Solution**: Visual progress rings that show real-time goal contribution
- **Assumption**: Users are motivated by seeing immediate impact of their actions
```

### 4. Propose Behavioral Frameworks
Based on the product domain and pain points, propose 2-3 behavioral design frameworks:

**Framework categories to consider:**
- Habit formation: Hook Model (Trigger-Action-Reward-Investment), Tiny Habits (BJ Fogg)
- Motivation: Self-Determination Theory (Autonomy, Competence, Relatedness), Progress mechanics
- Behavior change: Transtheoretical Model (Stages of Change), Implementation Intentions
- Engagement: Game mechanics (progression, mastery), Social proof, Commitment devices
- Learning: Deliberate practice, Feedback loops, Spaced repetition

**Present to user as numbered options:**
```
Based on the research, I recommend one of these behavioral frameworks:

1. **Hook Model** - Build habit loops with triggers and variable rewards
   - Best for: Increasing daily engagement and retention
   - Applies to: [specific pain points]

2. **Self-Determination Theory** - Foster intrinsic motivation through autonomy, competence, relatedness
   - Best for: Long-term sustained behavior change
   - Applies to: [specific pain points]

3. **Progress Mechanics + Social Proof** - Visible progress + community validation
   - Best for: Goal achievement and community building
   - Applies to: [specific pain points]

Which framework resonates most with your vision? (Enter 1, 2, or 3)
```

**Wait for user selection** before proceeding.

### 5. Generate Selected Framework Details
Once user selects a framework, elaborate with:
- **Core Principles**: 3-4 key principles of the framework
- **Application to Product**: How each principle maps to specific features
- **User Journey Mapping**: How the framework shapes the user's interaction pattern
- **Success Metrics**: How to measure if the framework is working

Include web search for authoritative framework details if needed.

### 6. Propose Persona Concepts
Create 3 distinct persona concepts based on research insights. Each concept should include:
- **Name & Demographics**: Age, occupation, lifestyle
- **Primary Goal**: What they want to achieve with the product
- **Coach Personality**: The type of coaching voice/personality that would resonate (e.g., "Supportive mentor", "Data-driven analyst", "Energetic cheerleader")
- **Key Pain Point**: Which pain point is most relevant to this persona

**Present to user:**
```
I've created 3 persona concepts:

1. **[Name]** - [One-line description]
   - Goal: [Primary goal]
   - Coach Style: [Personality type]

2. **[Name]** - [One-line description]
   - Goal: [Primary goal]
   - Coach Style: [Personality type]

3. **[Name]** - [One-line description]
   - Goal: [Primary goal]
   - Coach Style: [Personality type]

Which persona should we develop first? (Enter 1, 2, or 3, or describe changes)
```

**Wait for user selection/refinement**.

### 7. Generate Full Persona Specification
For the selected persona:

**Read templates:**
- `${CLAUDE_SKILL_DIR}/../../templates/persona-spec.md`
- `${CLAUDE_SKILL_DIR}/../../examples/fitness-coach/design-spec.md` (for quality reference)

**Generate detailed persona spec including:**
- Demographics & Background (age, occupation, family, lifestyle)
- Goals & Motivations (what they want, why they want it)
- Pain Points & Frustrations (specific to this persona)
- Current Solutions & Workarounds (what they do now)
- Technology Comfort Level (devices, apps they use)
- Coach Persona Details:
  - Personality traits (warm, analytical, motivating, etc.)
  - Communication style (tone, language, emoji use)
  - Coaching approach (how they guide the user)
  - Example messages (3-5 sample coach messages)
- Day-in-the-Life Scenario (narrative walkthrough of product use)
- Success Criteria (what good looks like for this persona)

**If design-tokens.md exists**, reference preferred UI style in persona spec.

### 8. Save Design Artifacts
Save the following files to `~/pm-skills/projects/<project-name>/`:

**design-spec.md** - Overall design specification including:
- Pain points analysis (from step 3)
- Selected behavioral framework (from step 5)
- Framework application details
- Overview of all persona concepts

**persona-[name].md** - Detailed specification for the selected persona
- Use lowercase, hyphenated filename (e.g., `persona-sarah-athlete.md`)
- Include all sections from step 7

### 9. Present Summary & Next Steps
Provide user with:
- File paths for created artifacts (absolute paths)
- Summary of design decisions:
  - Number of pain points identified
  - Selected behavioral framework
  - Persona name and primary goal
- Key insights from the design process

**Suggest next step:**
```
Design complete. Run `/pm-build <persona-name> --project <project-name>` to build the interactive prototype.
```

## Quality Standards
- Pain points are specific, actionable, and grounded in research
- Behavioral framework is clearly explained with concrete application
- Persona feels realistic with specific details (not generic)
- Coach personality is distinctive and appropriate for the goal
- All template sections are thoroughly completed

## User Interaction Points
This skill requires user input at two decision points:
1. Framework selection (step 4)
2. Persona selection/refinement (step 6)

Be patient and wait for user responses. Offer to explain frameworks or adjust personas based on feedback.

## Error Handling
- If research brief missing, guide user to run /pm-research first
- If user requests custom framework, integrate their ideas into framework section
- If user wants to combine personas, create a hybrid with clear rationale
- If design tokens missing, proceed without visual constraints
