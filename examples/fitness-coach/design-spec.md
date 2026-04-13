# Design Specification: WHOOP AI Wellness Coach

**Date:** 2024-03-22
**PM:** [Your Name]
**Status:** Ready for Build
**Target Launch:** Q3 2024

---

## Problem Statement

WHOOP provides industry-leading biometric data (recovery, strain, sleep) but lacks **personalized, goal-oriented coaching** that translates metrics into specific daily action plans. Users understand their numbers but struggle to apply insights consistently.

**Evidence:**
- User interviews: 8/10 users said "I wish WHOOP told me what to do based on my data"
- Support tickets: 400+ monthly requests for "interpretation help"
- Feature request voting: "Personalized coaching" is #1 (1,200+ votes)

---

## Pain Points

### 1. Data Without Context
**User quote:** "My recovery is 45%. Is that bad? What caused it? What should I change?"

Users receive scores but lack understanding of:
- What specific behaviors drove the score
- What actions would improve it
- Whether their response is appropriate for their goals

### 2. Generic Recommendations
**User quote:** "Sleep Coach tells everyone to sleep 8 hours. That doesn't work with my schedule."

Current recommendations are:
- Population averages, not individualized
- Don't consider user goals (performance vs. longevity vs. weight loss)
- Ignore real-world constraints (kids, shift work, travel)

### 3. No Accountability Loop
**User quote:** "I see the advice but forget to follow it. Then I don't know if it worked."

Missing elements:
- No tracking of whether user acted on recommendations
- No feedback loop to confirm effectiveness
- No reinforcement for positive behaviors
- No adaptation when recommendations fail

### 4. Fragmented Experience
**User quote:** "I have to check five different screens to plan my day."

Current UX requires:
- Recovery screen → Strain screen → Sleep screen → Journal screen → separate decision-making
- Cognitive load of synthesizing disparate metrics
- No single "mission control" view

---

## Core Design Principle

**"Goals First"** — Every screen element, recommendation, and interaction should directly connect to the user's stated goal.

**Design Philosophy:**
- Start with outcome (user's goal), work backward to behaviors
- Measure success by goal progress, not engagement metrics
- Personalize by learning from user's unique response patterns
- Simplify by hiding complexity behind intelligent defaults

---

## Behavioral Framework

### 6-Stage Goal-Action Loop

```
┌─────────────┐
│  Set Goal   │ → Define measurable outcome + timeframe
└──────┬──────┘
       │
┌──────▼──────────┐
│ Morning Briefing │ → Recovery status + today's game plan
└──────┬───────────┘
       │
┌──────▼──────────┐
│ Active Coaching  │ → Real-time guidance during day
└──────┬───────────┘
       │
┌──────▼──────┐
│   Logging    │ → Capture adherence + context
└──────┬───────┘
       │
┌──────▼─────────┐
│ Evening Review  │ → Reflect on day, prep for sleep
└──────┬──────────┘
       │
┌──────▼──────┐
│ Adaptation   │ → Refine plan based on results
└──────────────┘
```

**Feedback Cycle:** Weekly goal check-ins measure progress → adjust strategy if needed

---

## Persona Summaries

### Persona 1: Austin (The Optimizer)
- **Age:** 32
- **Occupation:** Product Manager at tech startup
- **Primary Goal:** "Optimize daily energy to sustain peak cognitive performance"
- **Coach Personality:** "Coach Aria" — Direct, data-driven, slightly competitive
- **Accent Color:** #00F19F (WHOOP green)
- **Communication Style:** Concise insights, quantified impact, challenging but supportive
- **Sample Quote:** "Your HRV jumped 12ms overnight. Let's capitalize — today's a green light for that intense sprint planning session."

### Persona 2: Sarah (The Athlete)
- **Age:** 28
- **Occupation:** Marketing manager training for first marathon
- **Primary Goal:** "Complete marathon injury-free while improving my time"
- **Coach Personality:** "Coach Marcus" — Encouraging, patient, injury-prevention focused
- **Accent Color:** #00D9FF (cyan)
- **Communication Style:** Warm encouragement, form cues, celebrates small wins
- **Sample Quote:** "I know you're eager, but 52% recovery means easy miles today. Trust the process — this is how we stay healthy for race day."

### Persona 3: James (The Executive)
- **Age:** 45
- **Occupation:** VP of Sales, frequent traveler, high stress
- **Primary Goal:** "Reduce stress and improve sleep quality"
- **Coach Personality:** "Coach Zen" — Calm, mindful, empathetic
- **Accent Color:** #9D4EDD (purple)
- **Communication Style:** Soothing, focuses on recovery rituals, validates challenges
- **Sample Quote:** "Your body held tension all night (elevated HR). Before your first meeting, take 3 minutes for box breathing. Your future self will thank you."

---

## Feature Specifications

### 1. Goal Setup Flow

**User Story:**
> As a new user, I want to define my wellness goal so that my coach can personalize recommendations for me.

**Acceptance Criteria:**
- User selects primary goal from categories: Performance, Recovery, Sleep, Weight, Stress
- User defines success metric (e.g., "Increase average recovery from 60% to 75%")
- User sets timeframe (4 weeks, 8 weeks, 12 weeks)
- System matches user to appropriate coach personality
- Confirmation screen shows "Your Coach" with personality preview

**UI Flow:**
1. Welcome screen: "What do you want to achieve?"
2. Goal selection: Cards with icons + descriptions
3. Success metric: Slider or input for target
4. Timeframe: Quick select buttons
5. Coach intro: Avatar + sample message
6. Confirm: "Start My Journey" CTA

---

### 2. Morning Briefing Dashboard

**User Story:**
> As a user, I want to see my recovery status and today's action plan in one place so I can start my day with clarity.

**Acceptance Criteria:**
- Dashboard loads automatically on app open (7am-11am)
- Shows recovery score with plain-language interpretation
- Displays 3 status indicators: Recovery, Strain Budget, Sleep Debt
- Coach card contains today's top 3 action items
- Expandable "Why?" section explains reasoning
- One-tap access to full day game plan

**Layout (Mobile):**
```
┌─────────────────────────┐
│ Goal Banner             │ ← "Optimize Energy → Peak Performance"
├─────────────────────────┤
│  ⭕  ⭕  ⭕            │ ← Recovery (68%), Strain Budget (12.5), Sleep Debt (-45min)
├─────────────────────────┤
│ Coach Aria says:        │
│ "Green light day! 🟢"   │
│                         │
│ Today's Game Plan:      │
│ ✓ Cold shower (2min)    │
│ ✓ Schedule deep work AM │
│ ✓ Cap strain at 14      │
│                         │
│ [See Full Plan]         │
└─────────────────────────┘
```

---

### 3. Daily Game Plan (Interactive Schedule)

**User Story:**
> As a user, I want a time-blocked schedule of recommended activities so I know exactly what to do and when.

**Acceptance Criteria:**
- Hour-by-hour plan from wake to sleep
- Each block shows: time, activity, duration, rationale
- User can mark activities complete with one tap
- Optional: Add notes/photos for context
- Progress bar shows % adherence
- Coach provides mid-day adjustment if needed

**Sample Game Plan (Austin):**
```
7:00  Morning Check-In        "How'd you sleep?" voice prompt
7:30  Cold Shower (2min)      Boosts HRV, mental clarity
8:00  High-Protein Breakfast  30g protein within 1hr of waking
10:00 Deep Work Block         Peak cognitive hours (recovery 68%)
12:30 Walking Meeting         Light strain, digestion aid
15:00 Recovery Check          Hydration + posture reset
18:00 Workout                 Target strain 12-14 (currently 6.2)
20:00 Wind-Down Protocol      Dim lights, no screens
21:30 Sleep Prep              Journal + breathwork
22:00 Lights Out              8hr sleep window
```

**Interaction:**
- Tap activity → [✓ Done] [Skip] [Reschedule]
- Long-press → Add note/photo
- Swipe right → Mark complete
- Swipe left → Skip with reason

---

### 4. Interactive Logging

**User Story:**
> As a user, I want to log my behaviors effortlessly so my coach can learn what works for me.

**Acceptance Criteria:**
- Voice check-ins at key moments ("How's your energy? 1-10")
- Photo logging for meals (snap → AI estimates macros)
- One-tap mood/stress tracking (emoji scale)
- Auto-detect workout completion via strain spike
- Optional: Manual journal entry for detailed notes

**Logging Prompts:**
- 7:00am: "Rate your sleep quality 😴😐😊"
- 12:00pm: "Energy check-in: drag the slider"
- 6:00pm: "Log dinner? [Photo] [Skip]"
- 9:00pm: "How stressed are you today? ●●●○○"

**AI Meal Analysis:**
- User snaps photo → Vision API identifies foods
- Returns: "Looks like salmon, rice, broccoli. ~40g protein, 55g carbs, 18g fat. Sound right?"
- User confirms or edits → data saved to journal

---

### 5. Evening Review

**User Story:**
> As a user, I want to reflect on my day and see how my actions impacted my recovery so I can learn and improve.

**Acceptance Criteria:**
- Shows adherence score (% of game plan completed)
- Highlights wins ("You nailed your sleep window!")
- Identifies misses ("Missed afternoon recovery check — impact: +5% strain")
- Previews tomorrow's recovery prediction
- Guided reflection: "What would you change tomorrow?"

**Layout:**
```
┌─────────────────────────┐
│ Today's Score: 78%      │ ← Adherence to game plan
├─────────────────────────┤
│ 🏆 Wins                 │
│ • Cold shower streak: 3 │
│ • Strain target met     │
├─────────────────────────┤
│ 📝 Observations         │
│ • Skipped wind-down     │
│   → +15min sleep latency│
├─────────────────────────┤
│ Tomorrow's Preview      │
│ Recovery: ~62% (Yellow) │
│ Recommendation: Active  │
│ recovery day            │
└─────────────────────────┘
```

---

### 6. Coach Chat (AI Conversation)

**User Story:**
> As a user, I want to ask my coach questions throughout the day so I can get real-time guidance.

**Acceptance Criteria:**
- Natural language interface (text or voice)
- Context-aware: Knows current recovery, strain, schedule
- Answers questions like:
  - "Should I do my workout now or later?"
  - "Why is my recovery low today?"
  - "Can I have a glass of wine tonight?"
- Provides reasoning + data to support advice
- Escalates to human coach for complex issues

**Sample Interaction:**
```
User: "I'm exhausted but have a workout scheduled. What should I do?"

Coach Aria: "I hear you. Your recovery is 52%, which is in the yellow zone. Here's what I see:
• HRV is 15% below baseline (stress signal)
• You only got 6.5hrs sleep (90min debt)
• Current strain is already 8.2

My recommendation: Swap today's high-intensity session for a 30min walk or yoga. Your body needs recovery more than stimulus right now. We can reschedule the hard workout for Thursday when your recovery should be 70%+.

Sound like a plan?"

[Accept Plan] [Keep Original] [Tell Me More]
```

---

## Success Metrics

### Primary (Goal Achievement)
- **Goal Completion Rate:** % of users who hit their target metric within timeframe
- **Recovery Trend:** Average recovery score change over 8 weeks
- **Sleep Improvement:** Average sleep performance increase
- **Strain Optimization:** Ratio of high-strain days on high-recovery days

### Secondary (Engagement)
- **Morning Briefing Open Rate:** % of users who view dashboard daily
- **Game Plan Adherence:** Average % of daily activities completed
- **Logging Frequency:** Avg check-ins per day
- **Evening Review Completion:** % of days with reflection logged
- **Coach Chat Usage:** Avg messages per week

### Retention
- **4-Week Retention:** % still using coach after trial period
- **12-Month Retention:** Long-term subscription renewal rate

---

## Technical Requirements

### Data Sources (WHOOP API)
- Real-time: Heart rate, HRV, strain, respiratory rate
- Daily: Recovery score, sleep performance, sleep stages
- Historical: 90-day trends for pattern recognition
- Journal: User-logged habits (alcohol, stress, meals, etc.)

### AI/ML Components
- **LLM for Coaching:** GPT-4 or Claude for natural language generation
- **Personalization Engine:** Collaborative filtering for recommendation refinement
- **Computer Vision:** Food recognition for meal logging (Clarifai or Google Vision API)
- **Anomaly Detection:** Flag unusual biometric patterns for safety

### Integration Points
- WHOOP data sync (bidirectional via API)
- Calendar integration (optimize game plan around meetings)
- Notification system (gentle nudges, not spam)
- Export results to Apple Health, CSV

---

## Open Questions

1. **Coach Personality Selection:** Should users choose their coach, or should we auto-assign based on goal/quiz?
2. **Notification Frequency:** How many daily nudges before it becomes annoying? A/B test 3 vs. 5 vs. 7?
3. **Data Privacy:** How much user data do we store? Anonymize for ML training?
4. **Pricing Model:** Include in existing membership, or premium add-on ($5-10/mo)?
5. **Escalation Path:** When should AI defer to human coach? Define criteria.

---

## Next Steps

1. **Design Phase:** Create high-fidelity mockups for Austin persona (See: persona-austin.md)
2. **Prototype:** Build interactive Figma prototype for user testing
3. **Technical Spec:** Define API architecture, ML pipeline, data flows
4. **User Testing:** 5 moderated sessions with target users (Austin, Sarah, James personas)
5. **Build Phase:** Sprint planning, MVP scope definition

**Target MVP:** Austin persona only, goal = "Optimize Energy," 8-week pilot with 50 beta users.
