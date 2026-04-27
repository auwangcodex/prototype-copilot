---
name: pm-build
description: Build interactive React/JSX prototype for a product persona. Generates iPhone-framed single-file prototype.
argument-hint: <persona-name> [--project <project-name>]
allowed-tools: Read Write Edit Glob Grep Bash(node:*) Bash(npx:*) Bash(python3:*) WebSearch Skill(ui-ux-pro-max) mcp__magicuidesign-mcp__*
---

# PM Build Skill

This skill builds an interactive React/JSX prototype based on persona specifications. It generates a single-file prototype with iPhone framing and zero-build-step preview.

## Design Enhancement Tools (Auto-Activated)

When building prototypes, this skill automatically leverages three design tools:

1. **Frontend Design** (Anthropic plugin) — Follow its aesthetic guidelines: distinctive typography, bold color choices, intentional motion, atmospheric details. NEVER use generic fonts (Inter, Roboto, Arial) or cliched purple-on-white schemes.

2. **UI/UX Pro Max** — If `design-tokens.md` exists in the project, it was generated using this tool's design system. Follow its style, color, typography, and anti-pattern guidance exactly. For additional queries:
   ```bash
   python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<keywords>" --domain <domain>
   ```

3. **Magic UI MCP** — Use `searchRegistryItems` and `getRegistryItem` to pull in polished animated components (marquees, animated cards, blur-fade text, grid backgrounds) when they fit the design. These elevate prototype quality significantly.

## Superpowers Integration

When the [Superpowers plugin](https://github.com/obra/superpowers) is available, leverage its structured workflow disciplines at key points in the build process:

**Design Phase (Step 4 - Layout Proposals):**
- **RECOMMENDED SUB-SKILL:** `superpowers:brainstorming` — Before committing to a layout variant, use the brainstorming discipline to explore the design approach more thoroughly. This helps validate assumptions about persona needs, surface alternative interaction patterns, and ensure the chosen layout truly serves the user's goal.

**Build Phase (Steps 5-9 - Prototype Construction):**
- **RECOMMENDED SUB-SKILL:** `superpowers:executing-plans` — The prototype build has natural independent components (derived from design spec) that map well to bite-sized tasks with quality checkpoints between each.
- **RECOMMENDED SUB-SKILL:** `superpowers:subagent-driven-development` — Each component can be treated as an independent task suitable for subagent-driven development, enabling parallel execution and focused review per component.

> **Note:** These are recommendations, not requirements. The pm-build skill works fully without Superpowers installed.

## Execution Steps

### 1. Parse Arguments & Identify Project
**Parse `$ARGUMENTS`:**
- Extract `<persona-name>` (first argument, required)
- Check for optional `--project <project-name>` flag

**If no --project specified:**
- Use Glob to find projects: `~/pm-skills/projects/*/persona-*.md`
- Match persona files to identify project (most recent or ask user)
- Verify the project contains the specified persona

**If --project specified:**
- Verify directory exists: `~/pm-skills/projects/<project-name>/`
- Verify persona file exists: `~/pm-skills/projects/<project-name>/persona-<persona-name>.md`

### 2. Load Design Artifacts
Read the following files from `~/pm-skills/projects/<project-name>/`:

**Required:**
- `design-spec.md` - Overall design architecture
- `persona-<persona-name>.md` - Detailed persona specification

**Optional:**
- `design-tokens.md` - Color, typography, spacing system
- `research-brief.md` - For additional context

**Error handling:**
- If design-spec.md missing, instruct: "Run `/pm-design <project-name>` first"
- If persona file missing, list available personas and ask user to select

### 3. Load Prototype Scaffold
Read the base template:
- `${CLAUDE_SKILL_DIR}/../../templates/prototype-scaffold.jsx`

This provides the React/hooks structure, state management patterns, and component architecture.

### 4. Propose Layout & Component Architecture
Based on the design spec, persona goals, and product type, propose 2-3 layout variants **tailored to the specific product**.

**Step 4a: Identify Product Archetype**
Read the design spec and classify the product:
- **SaaS / Creative Tool** (e.g., Creatify, Canva, Figma) → focus on workspace, creation flow, onboarding
- **Consumer Health / Fitness** (e.g., Whoop, Oura, Noom) → focus on tracking, progress, coaching
- **Marketplace / E-commerce** (e.g., Shopify, Etsy) → focus on browse, cart, checkout
- **Social / Community** (e.g., Discord, Strava) → focus on feed, profiles, interactions
- **Productivity / Workflow** (e.g., Notion, Linear) → focus on task management, views, collaboration
- **Other** → derive layout patterns from the design spec's pain points and solutions

**Step 4b: Propose Layout Variants**
Generate 2-3 layout options that are **specific to the product's design spec and persona**. Each variant should:
- Have a descriptive name reflecting the product context
- Describe the screen structure (what goes where)
- Explain the interaction philosophy (why this layout serves the persona)
- Note which pain points from the design spec it addresses

**Present to user:**
```
Based on [persona name]'s goal ([primary goal]) and the [product] design spec, I propose these layout options:

1. **[Layout Name A]**
   - [Screen structure description]
   - [Key interaction pattern]
   - Addresses: [which pain points from design spec]
   - Best for: [what type of user behavior]

2. **[Layout Name B]**
   - [Screen structure description]
   - [Key interaction pattern]
   - Addresses: [which pain points from design spec]
   - Best for: [what type of user behavior]

3. **[Layout Name C]**
   - [Screen structure description]
   - [Key interaction pattern]
   - Addresses: [which pain points from design spec]
   - Best for: [what type of user behavior]

Which layout best fits [persona name]'s needs? (Enter 1, 2, or 3)
```

> **Superpowers tip:** If `superpowers:brainstorming` is available and hasn't been run for this project, consider using it here to explore the design approach more thoroughly before committing to a layout.

**Wait for user selection.**

**Step 4c: Define Component Set**
Based on the selected layout and the design spec's solution proposals, define the **specific components** this prototype needs. Components should map directly to the features and flows described in the design spec — NOT a generic template.

Present to user:
```
For the [selected layout] layout, I'll build these components:

A. [Component Name] — [what it does, 1 line]
B. [Component Name] — [what it does, 1 line]
C. [Component Name] — [what it does, 1 line]
...

Does this cover the key interactions? Anything to add or remove?
```

**Wait for user confirmation** before proceeding to build.

### 5. Build Full JSX Prototype
Using the scaffold, selected layout, and the component set defined in Step 4c, build a complete prototype.

> **Superpowers tip:** Each component is an independent task suitable for `superpowers:executing-plans` or `superpowers:subagent-driven-development` if the platform supports it.

**For each component in the component set:**

1. **Read the design spec's solution** for this component — what problem does it solve? What's the interaction flow?
2. **Implement the full interaction** with React state management:
   - Multi-stage flows should use `useState` to track stages
   - Overlays/modals should have open/close state
   - Forms should capture and display input
   - Lists should be interactive (click to expand, mark complete, etc.)
3. **Apply the persona's voice** — all copy, labels, and messages should reflect the persona's personality and communication style
4. **Make it feel real** — use realistic demo data, not lorem ipsum. Pre-populate with content that matches the product domain.

**Common component patterns** (use as reference, adapt to the product):

- **Multi-step flows** (onboarding, creation, checkout): Stage-by-stage progression with `useState`, back/forward navigation, progress indicator
- **Dashboard/overview**: Status cards, progress indicators, quick-action buttons, summary metrics
- **Chat/conversational UI**: Message list (scrollable), input bar, pre-populated demo messages, send functionality
- **Content feed/stream**: Chronological items, type icons, timestamps, click-to-expand details
- **Forms with smart defaults**: Pre-filled values, quick-select options, inline validation feedback
- **Split-screen layouts**: Side-by-side panels (e.g., chat + canvas, list + detail)
- **Overlay/modal flows**: Full-screen modals with backdrop blur, header + close button, self-contained interaction
- **Voice/media input**: Multi-state buttons (idle → active → processing → result) with CSS animations

**Key principle:** The components should emerge from the design spec, not from a generic template. A SaaS onboarding prototype will have completely different components than a fitness tracker or a marketplace.

### 6. Apply Design System
**If design-tokens.md exists:**
- Use exact color hex codes (primary, secondary, accent, background, text)
- Apply specified font families, sizes, weights
- Use spacing scale (margin/padding values)
- Match component styles (button radius, borders, shadows)

**If no design tokens:**
- Use scaffold defaults (modern, clean iOS-style)
- Stick to safe web fonts (SF Pro, -apple-system, system-ui)
- Use subtle shadows and rounded corners (8px-12px radius)

**Ensure mobile-first responsive design:**
- Container max-width for iPhone dimensions (390px or 414px)
- Touch-friendly button sizes (44px min height)
- Readable font sizes (16px+ for body)

### 7. Implement Interactivity
Use React hooks for state management:
- `useState` for UI state (modals open/closed, input values, flow stages)
- `useEffect` for animations or auto-transitions (optional)
- Event handlers for all buttons and inputs

**Demo interactions to implement:**
- All components from Step 4c should be interactive
- Multi-step flows should progress through stages
- Overlays/modals should open and close
- Forms should accept and display input
- Lists should respond to clicks (expand, select, navigate)
- Buttons should have visible feedback (state changes, animations)

Make the prototype feel interactive even though it's a demo (not connected to backend).

### 8. Save Prototype File
Save as:
- `~/pm-skills/projects/<project-name>/prototype_<persona-name>_v1.jsx`

Include:
- Complete JSX component
- All styles (inline or `<style>` block)
- No external dependencies except React/ReactDOM

### 9. Generate Preview HTML
Create a standalone HTML file that:
- Loads React 18 and Babel standalone from CDN (unpkg or jsdelivr)
- Inlines the JSX prototype code
- Renders in an iPhone frame (CSS device mockup)
- Requires zero build step (just open in browser)

**HTML structure:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>[Persona Name] Prototype - [Project Name]</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    /* iPhone frame CSS */
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .device-frame {
      width: 390px;
      height: 844px;
      background: #000;
      border-radius: 40px;
      padding: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      position: relative;
    }
    .device-notch {
      width: 150px;
      height: 30px;
      background: #000;
      border-radius: 0 0 20px 20px;
      margin: 0 auto;
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
    }
    .device-screen {
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 30px;
      overflow: hidden;
      position: relative;
    }
    #root {
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
  </style>
</head>
<body>
  <div class="device-frame">
    <div class="device-notch"></div>
    <div class="device-screen">
      <div id="root"></div>
    </div>
  </div>

  <script type="text/babel">
    // [INLINE FULL JSX PROTOTYPE HERE]

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<PrototypeApp />);
  </script>
</body>
</html>
```

Save as:
- `~/pm-skills/projects/<project-name>/preview.html`

### 10. Present Summary & Next Steps
Tell user:
- Absolute paths to both files (JSX and HTML)
- Key features implemented
- Design system applied (if tokens used)
- How to preview: "Open `preview.html` in your browser"

**Suggest next step:**
```
Prototype complete. Open the preview.html file in your browser to interact with the prototype.

When ready, run `/pm-package --project <project-name>` to generate stakeholder deliverables (email, blog post, Lovable prompt).
```

## Quality Standards
- All components defined in Step 4c fully implemented
- Smooth state transitions (no console errors)
- Mobile-responsive layout (fits iPhone frame)
- Persona voice and personality evident in all copy/messages
- Design system properly applied (colors, fonts, spacing)
- Interactive demo feels polished (not wireframe-quality)
- Components are product-appropriate (not generic templates)

## Technical Requirements
- React 18 hooks-based component
- No external npm packages (except React/ReactDOM/Babel from CDN)
- Single-file JSX (all styles inline or in style block)
- Preview HTML works offline after initial load

## Error Handling
- If persona spec incomplete, use reasonable defaults for missing details
- If design tokens missing, use scaffold defaults
- If no behavioral framework clear, focus on core user goal
- Always generate a working prototype even with incomplete inputs
