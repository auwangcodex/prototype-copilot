# Persona Design: Austin (The Optimizer)

**Coach Name:** Coach Aria
**Design Status:** High-Fidelity Mockups Complete
**Prototype Link:** [Figma - Austin Dashboard](https://figma.com/austin-dashboard)

---

## Persona Profile

### Demographics
- **Name:** Austin Chen
- **Age:** 32
- **Location:** San Francisco, CA
- **Occupation:** Senior Product Manager at Series B SaaS startup
- **Income:** $180k/year
- **Education:** BS Computer Science, Stanford
- **Living Situation:** 1BR apartment in SOMA, lives alone

### Psychographics
- **Tech Comfort:** Very high — early adopter, uses 10+ apps daily, debugs own tech issues
- **Fitness Level:** Intermediate — lifts 4x/week, occasional cycling, played college soccer
- **Quantified Self:** Tracks everything (sleep, food, workouts, productivity, screen time)
- **Personality Traits:** Analytical, competitive, efficiency-obsessed, impatient with mediocrity
- **Core Values:** Performance, optimization, continuous improvement, data-driven decisions

### Current WHOOP Usage
- **Subscription Length:** 18 months
- **Check Frequency:** 6-8 times daily (obsessive about strain/recovery)
- **Favorite Features:** Recovery score, HRV trends, strain coach
- **Pain Points:** "I know my numbers, but I waste time figuring out what to do about them"
- **Journal Adherence:** 60% (logs when numbers look weird, not consistently)

---

## Primary Goal

**"Optimize daily energy to sustain peak cognitive performance"**

### What Success Looks Like
- **Metric:** Maintain recovery score ≥65% for 80% of days over 8 weeks
- **Why It Matters:** "My job requires deep focus for 6+ hours daily. When my recovery dips, my decision-making suffers. I want to feel sharp every day, not just some days."
- **Current Baseline:** Recovery avg 58%, energy inconsistent (great Mon/Tue, crashes Wed/Thu)

### Key Sub-Goals
1. **HRV Consistency:** Reduce HRV variability (currently swings ±20ms day-to-day)
2. **Strain-to-Recovery Ratio:** Only push hard (strain 15+) when recovery is 70%+
3. **Sleep Quality:** Increase REM+Deep sleep from 45% to 55% of total sleep time
4. **Energy Stability:** Eliminate afternoon crashes (currently 3-4pm slump)

---

## Coach Aria: Personality Design

### Personality Traits
- **Archetype:** "The Analyst" — Think Sherlock Holmes meets elite athletic trainer
- **Tone:** Direct, confident, data-driven, slightly challenging
- **Emotional Range:** Supportive but not coddling, celebrates wins briefly, focuses on next optimization
- **Communication Style:**
  - Concise (no fluff)
  - Quantified impact ("This will improve recovery by ~8%")
  - Proactive suggestions, not reactive hand-holding
  - Uses sport/game metaphors ("green light," "bankable day," "strategic rest")

### Voice Examples

**Morning Briefing (High Recovery):**
> "Morning, Austin. 72% recovery — your HRV is 15ms above baseline and sleep efficiency hit 94%. This is a bankable day. I'm recommending an aggressive deep work block 9am-12pm, then a high-intensity lift session around 5pm. You've got the physiological green light to push. Let's capitalize."

**Morning Briefing (Low Recovery):**
> "58% recovery. Your HRV dropped overnight (likely that 10pm call — cortisol spike). Here's the play: active recovery day. Swap your deadlift session for a 30min walk + mobility. Your brain can still perform, but your body needs a break. Think of it as strategic undertraining for long-term gains."

**Mid-Day Check-In:**
> "Strain is at 9.2, right on track. Your afternoon block looks clear — perfect for that architecture doc you've been avoiding. Hydration reminder: you haven't logged water since 10am. Fill up."

**Evening Review (High Adherence):**
> "Solid execution today. 85% adherence, nailed your strain target, and that cold shower streak is now 5 days. Tomorrow's recovery is projecting 68% — another green day. Sleep by 10:30pm to lock it in."

**Evening Review (Low Adherence):**
> "Missed your wind-down protocol again. I see you were on Slack until 11:15pm. Result: sleep latency jumped to 22 minutes, REM sleep dropped 12%. I know the startup grind is real, but this pattern is costing you. Let's build a hard stop ritual — what would actually work for you?"

**Coach Chat (Question Response):**
> User: "Should I go to the gym now or skip it?"
>
> Aria: "What's your current strain?"
>
> User: "12.3"
>
> Aria: "And your planned workout?"
>
> User: "Heavy squats, 60min"
>
> Aria: "Here's what I see: Recovery is 61% (yellow), strain is already 12.3, and you have a 9am meeting tomorrow that needs peak cognition. Recommendation: Cut the workout to 30min, reduce weight by 20%, focus on form. You'll still get stimulus without digging a recovery hole. Save the heavy session for Thursday when you're projected at 75%. Work?"

### Visual Identity
- **Accent Color:** #00F19F (WHOOP signature green)
- **Avatar:** Minimalist geometric design — abstract "A" shape with data visualization motifs
- **Typography:** DIN Condensed Bold for coach name, Proxima Nova Regular for messages
- **Icons:** Sharp, angular (not rounded) — conveys precision

---

## Dashboard Design (Mobile-First)

### Layout Hierarchy
```
┌─────────────────────────────────────┐
│ GOAL BANNER                         │ ← Always visible, tracks progress
├─────────────────────────────────────┤
│ STATUS RINGS (3)                    │ ← Visual at-a-glance health check
├─────────────────────────────────────┤
│ COACH CARD                          │ ← Primary interaction point
├─────────────────────────────────────┤
│ TODAY'S GAME PLAN (collapsed)       │ ← Expandable full schedule
├─────────────────────────────────────┤
│ QUICK ACTIONS                       │ ← Log, Chat, Journal shortcuts
└─────────────────────────────────────┘
```

### 1. Goal Banner
**Purpose:** Constant reminder of "why" behind the plan

**Content:**
- Left: Goal icon (brain icon for cognitive performance)
- Center: "Optimize Energy → Peak Performance"
- Right: Progress indicator "Week 3 of 8"

**Interaction:**
- Tap → Goal details modal (current vs. target metrics, weekly trend chart)

**Visual:**
```
┌─────────────────────────────────────┐
│ 🧠  Optimize Energy → Peak Perf  3/8│
└─────────────────────────────────────┘
```

---

### 2. Status Rings
**Purpose:** Instant health snapshot, mimics Apple Watch design familiarity

**Ring 1: Recovery**
- **Metric:** Today's recovery score (0-100%)
- **Color Zones:** Red (<33%), Yellow (33-66%), Green (67-100%)
- **Display:** Large number in center, thin ring around it
- **Subtext:** "vs 7-day avg: +8%"

**Ring 2: Strain Budget**
- **Metric:** Recommended max strain for today based on recovery
- **Display:** "12.5" with current strain "6.2" as progress fill
- **Color:** Fills green until target, turns yellow if approaching, red if exceeded

**Ring 3: Sleep Debt**
- **Metric:** Cumulative sleep deficit vs. need
- **Display:** "-45 min" (negative = debt, positive = surplus)
- **Color:** Green when ±30min, yellow when ±60min, red beyond

**Visual:**
```
┌───────────────────────────────────────┐
│   ⭕         ⭕         ⭕            │
│   68%       12.5      -45min          │
│ Recovery   Strain    Sleep Debt       │
│  +8% ↑     6.2/12.5    🟡             │
└───────────────────────────────────────┘
```

**Interaction:**
- Tap any ring → Expanded view with historical trend, explanation

---

### 3. Coach Card
**Purpose:** Main communication interface, personality delivery

**Layout:**
```
┌─────────────────────────────────────┐
│ 👤 Coach Aria                       │
│                                     │
│ "Morning, Austin. 72% recovery —   │
│ your HRV is 15ms above baseline.   │
│ This is a bankable day. 🟢"        │
│                                     │
│ Today's Top 3:                      │
│ ✓ Cold shower (2min) - 7:30am      │
│ ✓ Deep work block - 9am-12pm       │
│ ✓ High-intensity lift - 5pm        │
│                                     │
│ [Why This Plan?] [See Full Day]    │
└─────────────────────────────────────┘
```

**Elements:**
- **Header:** Coach name + avatar (top-left)
- **Message:** 2-3 sentence briefing in Aria's voice
- **Top 3:** Most important actions for today (derived from full plan)
- **CTAs:** Expandable reasoning, link to full schedule

**Interaction:**
- Tap "Why This Plan?" → Modal explaining logic: "Your HRV suggests full recovery, strain budget is high (12.5), and your calendar shows a clear morning — ideal for deep work."
- Tap "See Full Day" → Expands to full game plan section

---

### 4. Daily Game Plan (Expanded)
**Purpose:** Hour-by-hour actionable schedule

**Format:** Timeline with time blocks

**Sample Plan:**
```
┌─────────────────────────────────────┐
│ 7:00  ✓ Morning Check-In            │
│       Voice: "How'd you sleep?"     │
│       [Completed: "8/10"]           │
├─────────────────────────────────────┤
│ 7:30  ⏺ Cold Shower (2min)          │
│       Why: Boosts HRV, mental       │
│       clarity                       │
│       [Mark Done] [Skip]            │
├─────────────────────────────────────┤
│ 8:00  ⏺ High-Protein Breakfast      │
│       Target: 30g protein within    │
│       1hr of waking                 │
│       [Log Meal 📷]                 │
├─────────────────────────────────────┤
│ 10:00 ⏺ Deep Work Block             │
│       Peak cognitive window         │
│       (recovery 68%)                │
│       Suggestion: Architecture doc  │
│       [Start Focus Timer]           │
├─────────────────────────────────────┤
│ 12:30 ⏺ Walking Meeting             │
│       Light strain, aids digestion  │
│       [Auto-tracked via strain]     │
├─────────────────────────────────────┤
│ ... (continues through day)         │
└─────────────────────────────────────┘
```

**Interaction:**
- **Mark Done:** Swipe right or tap ✓ → Logs completion time
- **Skip:** Tap → Prompt "Why?" (Too tired, No time, Changed mind) → Logs reason for ML learning
- **Add Note:** Long-press → Text input or photo attachment
- **Reschedule:** Drag and drop to new time slot

**Visual Design:**
- Completed items: Grayed out with checkmark, collapse to save space
- Current time: Highlighted with colored border (#00F19F)
- Upcoming: Normal contrast
- Past (incomplete): Faded with yellow warning icon

---

### 5. Interactive Elements

#### A. Meal Photo Logging
**Flow:**
1. User taps "Log Meal" from game plan or quick actions
2. Camera opens (or photo picker)
3. Snap photo → AI analyzes
4. Returns: "Looks like grilled chicken, sweet potato, asparagus"
5. Macro estimate: "~42g protein, 38g carbs, 12g fat"
6. User confirms or edits → Saved to journal

**AI Prompt (Backend):**
```
Analyze this meal photo. Identify foods visible and estimate:
- Protein (g)
- Carbs (g)
- Fat (g)
- Calories (total)

Return JSON: {"foods": [...], "macros": {...}, "confidence": 0-1}
```

**UI:**
```
┌─────────────────────────────────────┐
│ 📷 Meal Photo                       │
│ [Image preview]                     │
│                                     │
│ I see:                              │
│ • Grilled chicken breast            │
│ • Sweet potato (medium)             │
│ • Asparagus (~6 spears)             │
│                                     │
│ Estimated macros:                   │
│ Protein: 42g | Carbs: 38g | Fat: 12g│
│ Total: ~410 cal                     │
│                                     │
│ [Looks Good ✓] [Edit] [Retake]     │
└─────────────────────────────────────┘
```

#### B. Voice Check-Ins
**Trigger:** Time-based or context-based (e.g., post-workout)

**Sample Prompts:**
- 7:00am: "Good morning! On a scale of 1-10, how did you sleep?"
- 12:00pm: "Energy check: How are you feeling right now?"
- 6:30pm: "How hard was that workout? 1-10 intensity?"

**Input Methods:**
- Voice response (transcribed + sentiment analysis)
- Numeric slider (1-10)
- Emoji tap (😫 😐 😊 😄 🔥)

**Data Use:**
- Logs to journal with timestamp
- Correlates with biometric data (e.g., low energy report + low HRV = stress pattern)
- Informs next day's plan (e.g., user consistently reports low energy at 3pm → schedule recovery activity)

#### C. Coach Chat
**Access:** Floating action button (bottom-right) or "Ask Aria" from coach card

**Interface:**
- Chat bubbles (user = right/blue, Aria = left/green)
- Voice input option (microphone icon)
- Suggested questions (e.g., "Should I work out?", "Why is my recovery low?")

**Context Awareness:**
- Knows current recovery, strain, sleep from WHOOP API
- Knows today's game plan and adherence so far
- Knows user's goal and progress

**Sample Conversation:**
```
User: "I'm craving pizza. Bad idea?"

Aria: "Context: You're at 68% recovery, strain is 8.2, and you've nailed your nutrition all week. Here's my take:

If it's quality pizza (real ingredients, not Domino's) and you account for it (~800-1000 cal, moderate carbs/fat), it won't derail you. Just don't make it a nightly thing.

Want me to adjust tomorrow's plan to compensate, or are you good to stay the course?"

[Adjust Plan] [I'm Good] [Tell Me More]
```

---

### 6. Evening Review

**Trigger:** Auto-appears at 8pm (user can dismiss/delay)

**Purpose:** Reflection + preview tomorrow

**Layout:**
```
┌─────────────────────────────────────┐
│ Today's Scorecard                   │
│                                     │
│ Adherence: 78% ████████░░          │
│ 7 of 9 activities completed         │
│                                     │
│ 🏆 Wins                             │
│ • Cold shower streak: 3 days        │
│ • Strain target met (12.8/12.5)    │
│ • Deep work block: 2.5hrs           │
│                                     │
│ 📝 Observations                     │
│ • Skipped wind-down protocol        │
│   Impact: +15min sleep latency      │
│ • Late caffeine (4pm coffee)        │
│   Impact: -8% REM sleep             │
│                                     │
│ Tomorrow's Preview                  │
│ Recovery: ~62% (Yellow)             │
│ Plan: Active recovery day           │
│ Top Priority: Sleep 8hrs tonight    │
│                                     │
│ Quick Reflection:                   │
│ "What would you change tomorrow?"   │
│ [Voice Note] [Text] [Skip]          │
│                                     │
│ [Done for Today]                    │
└─────────────────────────────────────┘
```

**Data Collection:**
- Adherence score auto-calculated from game plan completion
- Wins/Observations generated by AI (correlates behaviors with biometrics)
- User reflection is optional but encouraged (stored for ML learning)

---

## Verification & Testing Plan

### Success Criteria for Austin Persona
1. **Engagement:** Austin checks dashboard ≥5 times daily (currently 6-8, should maintain)
2. **Adherence:** Completes ≥70% of game plan activities daily
3. **Goal Progress:** Recovery avg increases from 58% to 65%+ within 8 weeks
4. **Satisfaction:** NPS ≥8 (would recommend to other optimizers)
5. **Retention:** Still actively using after 8-week pilot

### User Testing Protocol
**Participants:** 5 users matching Austin profile (age 28-35, tech workers, high WHOOP engagement)

**Session Structure (60min):**
1. Onboarding flow (goal setup): Observe clarity, time to completion
2. Morning briefing: Read-aloud Aria's message, assess tone fit
3. Game plan interaction: Complete 3 activities, test logging flows
4. Coach chat: Ask 3 questions, evaluate response quality
5. Evening review: Reflect on day, assess usefulness
6. Debrief: "Would you use this daily? What would you change?"

**Key Questions:**
- Does Aria's personality resonate or annoy?
- Is the game plan too rigid or appropriately flexible?
- Are recommendations actionable or vague?
- Does the dashboard feel overwhelming or streamlined?

---

## Open Questions for Iteration

1. **Notification Strategy:** Austin is phone-savvy but hates spam. Test: 3 daily notifications (morning brief, mid-day check, evening review) vs. 5 (add pre-workout, pre-sleep). Measure completion rate and annoyance feedback.

2. **Game Plan Flexibility:** Should users be able to edit the plan (e.g., swap workout time), or is that undermining the coach? Test both modes.

3. **Data Transparency:** Austin wants to see "why" behind every rec. How much detail is too much? A/B test: Concise reasoning vs. expandable deep-dive with citations.

4. **Gamification:** Austin is competitive. Should we add badges, streaks, leaderboards? Risk: Distracts from intrinsic motivation. Test with/without.

5. **Coach Personality Lock-In:** Can users switch coaches mid-journey if Aria doesn't click? Or is consistency more valuable?

---

## Next Steps

1. **High-Fidelity Mockups:** Complete Figma designs for all screens (Dashboard, Game Plan, Chat, Review)
2. **Interactive Prototype:** Clickable Figma prototype for user testing
3. **AI Prompt Engineering:** Refine Aria's voice with GPT-4 fine-tuning on sample conversations
4. **Technical Spec:** Define API integrations (WHOOP data sync, meal vision API, voice transcription)
5. **Pilot Recruitment:** Identify 50 beta users matching Austin persona for 8-week test

**Target Pilot Launch:** June 1, 2024
**Full Austin Persona Release:** August 1, 2024
