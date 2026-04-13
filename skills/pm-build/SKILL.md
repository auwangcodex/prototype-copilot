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
- **RECOMMENDED SUB-SKILL:** `superpowers:executing-plans` — The prototype build has natural independent components (Goal Banner, Status Rings, Coach Section, Meal Logging, Voice Input, Coach Chat, Journal Tracker) that map well to bite-sized tasks with quality checkpoints between each.
- **RECOMMENDED SUB-SKILL:** `superpowers:subagent-driven-development` — Each component (A through G) can be treated as an independent task suitable for subagent-driven development, enabling parallel execution and focused review per component.

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

### 4. Propose Layout Variants
Based on the persona's goal and coach personality, propose 2-3 layout variants:

**Present to user:**
```
Based on [persona name]'s goal ([their primary goal]), I propose these layout options:

1. **Goal-Centric Dashboard**
   - Large progress rings dominate the view (goal visibility)
   - Coach appears as floating assistant (bottom-right)
   - Quick action buttons for logging (speed of input)
   - Best for: Highly motivated, data-driven personas

2. **Coach-First Interface**
   - Coach message prominently at top (guidance/support)
   - Game plan timeline below (structure)
   - Compact progress indicators (less overwhelming)
   - Best for: Personas needing more hand-holding and encouragement

3. **Activity Stream Layout**
   - Chronological feed of coach messages + user logs (narrative)
   - Inline progress updates (contextual feedback)
   - Bottom nav for modes (journal, goals, coach chat)
   - Best for: Personas who think in stories/timelines

Which layout best fits [persona name]'s needs? (Enter 1, 2, or 3)
```

> **Superpowers tip:** If `superpowers:brainstorming` is available and hasn't been run for this project, consider using it here to explore the design approach more thoroughly before committing to a layout.

**Wait for user selection**.

### 5. Build Full JSX Prototype
Using the scaffold and selected layout, build a complete prototype with these components.

> **Superpowers tip:** Each component (A through G) below is an independent task suitable for `superpowers:executing-plans` or `superpowers:subagent-driven-development` if the platform supports it.

#### A. Goal Banner (Top Section)
- Gradient overlay background (primary → secondary color from design tokens)
- Display primary goal from persona spec (e.g., "Get to 12% body fat")
- Optional: Target date or milestone
- Motivational tagline from coach personality

#### B. Status Rings/Gauges
- 2-4 circular progress indicators (depending on layout variant)
- Each labeled with goal-relevance (e.g., "Recovery: 85% → 12% BF goal")
- Use design token colors for rings (primary for on-track, accent for needs attention)
- Percentage values + trend indicators (↑↓)
- Make responsive to container width

#### C. Coach Section
**Coach Card/Panel:**
- Persona photo placeholder (gray circle or silhouette icon)
- Coach name from persona spec
- Current coach message (conversational, matches coach personality)
- "View Game Plan" button/link

**Game Plan Timeline:**
- 3-5 timeline items (today's recommendations)
- Each with icon, description, status (pending/done)
- Matches behavioral framework (e.g., habit triggers, progress milestones)

#### D. Interactive Meal/Photo Logging
**3-stage flow (use React state):**

**Stage 1: Input Trigger**
- "Log Meal" or "Add Photo" button (prominent in layout)
- Plus icon or camera icon

**Stage 2: Capture Interface**
- Camera placeholder (dashed border, "Take Photo" text)
- OR text input for meal description
- Quick tags/categories (Breakfast, Lunch, Snack, etc.)
- "Submit" and "Cancel" buttons

**Stage 3: Confirmation Feedback**
- Success message from coach (personality-appropriate)
- Updated goal progress (e.g., "3/5 meals logged today")
- Option to add notes or continue logging
- Auto-return to main view after 2s (simulated with setTimeout or animation)

Implement with `useState` hooks for flow stage management.

#### E. Voice Input Component
**4 states (managed with useState):**

**State 1: Idle**
- Microphone icon button
- Label: "Tell me about your day" or similar (coach personality)

**State 2: Listening**
- Pulsing/animated microphone icon
- Waveform animation (CSS keyframes)
- Label: "Listening..."

**State 3: Processing**
- Spinner or processing animation
- Label: "Understanding..."

**State 4: Response**
- Coach reply message appears
- Transition to conversation or return to idle

Use button click to cycle through states (demo purposes).

#### F. Coach Chat (Full-Screen Overlay)
**Trigger:**
- "Chat with Coach" button or coach avatar click

**Overlay Interface:**
- Full-screen modal (z-index overlay, backdrop blur)
- Chat header with coach name + close button (×)
- Message list (scrollable):
  - Coach messages (left-aligned, coach avatar)
  - User messages (right-aligned, user avatar/initial)
  - Timestamp labels
- Input bar at bottom:
  - Text input field
  - Microphone button (links to voice input component)
  - Send button

**Demo messages:**
- Prepopulate 3-5 example messages showing coach personality
- Make input functional (add message to list on send)

#### G. My Log Journal Tracker
**Journal View:**
- Date selector (today, past days)
- List of logged items (meals, photos, notes) for selected day
- Each entry shows:
  - Timestamp
  - Type icon (meal, photo, note)
  - Content preview
  - Coach feedback (if any)
- "Add Entry" button (links to logging flow)

**Entry Detail:**
- Click entry to expand
- Full content + coach analysis
- Goal impact indicator (how this affected progress)

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
- Open/close coach chat overlay
- Navigate through logging flow stages
- Toggle voice input states
- Add messages to chat
- Add entries to journal log
- Click timeline items to mark complete

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
- All 7 core components (A-G) fully implemented
- Smooth state transitions (no console errors)
- Mobile-responsive layout (fits iPhone frame)
- Coach personality evident in messages/copy
- Design system properly applied (colors, fonts, spacing)
- Interactive demo feels polished (not wireframe-quality)

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
