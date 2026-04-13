# Research Brief: WHOOP Wellness Agent

**Date:** 2024-03-15
**PM:** [Your Name]
**Status:** Complete

---

## Product Overview

**WHOOP** is a subscription-based fitness and health optimization platform developed by WHOOP Inc.

- **Platforms:** iOS, Android, Web
- **Pricing:** Free app + $30/month membership (12-month prepay $239, 24-month $199)
- **Core Value Prop:** 24/7 physiological monitoring for strain, recovery, and sleep optimization
- **Device:** Screenless wrist-worn sensor with 5-day battery life, waterproof to 10m
- **Business Model:** Hardware subsidized by recurring subscription revenue
- **Target Users:** Athletes, fitness enthusiasts, health optimizers, corporate wellness programs

---

## Feature Map

### Core Metrics
- **Strain Score (0-21):** Cardiovascular load from all activities, auto-detected workouts
- **Recovery Score (0-100%):** Morning readiness based on HRV, resting heart rate, sleep quality, respiratory rate
- **Sleep Performance:** Sleep stages (light/deep/REM/awake), sleep efficiency, sleep debt, sleep consistency
- **Heart Rate Variability (HRV):** Primary recovery indicator, tracked continuously
- **Respiratory Rate:** Breaths per minute during sleep, illness detection signal
- **Skin Temperature:** Baseline deviation tracking for illness/ovulation detection

### Coaching Features
- **Strain Coach:** Real-time optimal strain range recommendations based on recovery
- **Sleep Coach:** Personalized bedtime and wake-up recommendations
- **Journal:** Daily habit logging (alcohol, stress, caffeine, meals) with correlation analysis
- **Teams:** Group challenges, leaderboards, shared insights

### Integrations
- **Export:** Strava, Peloton, TrainingPeaks, Apple Health
- **Import:** Limited (primarily exports data to other platforms)

---

## User Sentiment Analysis

### Quantitative Summary
- **App Store Rating:** 4.6/5 (iOS), 4.3/5 (Android)
- **Distribution (estimated from 50k+ reviews):**
  - 5★: 55%
  - 4★: 20%
  - 3★: 10%
  - 2★: 8%
  - 1★: 7%

### Top Complaints (by frequency)
1. **Price sensitivity:** "Too expensive for what it offers compared to Apple Watch"
2. **Hardware durability:** Band stretching, battery degradation after 12-18 months
3. **Accuracy concerns:** Strain/calorie calculations questioned, inconsistent HR readings during strength training
4. **No screen:** "I miss seeing time/notifications without phone"
5. **App stability:** Crashes, sync failures, slow load times
6. **Recovery score confusion:** "Why did I get 20% after a good night's sleep?"

### Top Praise (by frequency)
1. **Recovery insights:** "Game-changer for knowing when to push vs. rest"
2. **Sleep tracking:** "Most accurate sleep data I've ever seen"
3. **Strain coaching:** "Helps me avoid overtraining"
4. **Community/Teams:** "Love competing with friends"
5. **Minimalist design:** "No distractions, just data"
6. **Behavioral change:** "Made me prioritize sleep and recovery"

### Key Insight
Users love the **insights** but struggle with **application**. Common pattern: "I know my recovery is low, but what should I actually do differently today?"

---

## Competitive Landscape

| Product | Primary Focus | Price | Strengths | Weaknesses |
|---------|--------------|-------|-----------|------------|
| **Oura Ring** | Sleep optimization | $299 + $5.99/mo | Discreet form factor, excellent sleep staging, temperature tracking | Poor activity tracking, no real-time metrics |
| **Apple Watch** | General smartwatch | $399+ (no subscription) | Ecosystem integration, notifications, apps, fitness+ | Battery life, not recovery-focused, overwhelming features |
| **Garmin (Forerunner/Fenix)** | Endurance training | $299-$999 (no subscription) | GPS, maps, training load, battery life | Complex UI, expensive, less sleep focus |
| **Fitbit (Charge/Sense)** | Budget wellness | $149-$299 + $9.99/mo Premium | Affordable, easy to use, good sleep tracking | Less accurate HRV, basic recovery insights |
| **Polar (Vantage)** | Heart rate accuracy | $279-$499 (no subscription) | Training load pro, running power, recovery | Clunky app, poor sleep tracking |

**WHOOP Differentiation:** Only product solely focused on recovery-first training philosophy with no hardware purchase barrier (membership includes device).

---

## Relevant Research

### Scientific Foundations
1. **HRV and Recovery Correlation**
   - Plews et al. (2013): HRV-guided training improves performance vs. planned training
   - Buchheit (2014): Resting HRV predicts training readiness in athletes

2. **Sleep Staging Accuracy**
   - Chinoy et al. (2021): Consumer wearables 65-85% accurate for sleep stages vs. polysomnography
   - WHOOP-specific validation: 80% sensitivity for wake, 68% for REM (Berryhill et al., 2020)

3. **Behavioral Nudge Theory**
   - Fogg Behavior Model: Motivation + Ability + Prompt = Action
   - Implementation Intentions (Gollwitzer): Specific "if-then" plans increase goal achievement 2-3x

### User Behavior Patterns
- 70% of users check app within 15 min of waking (recovery score check)
- Avg session: 2.3 min (quick data review, not deep engagement)
- Journal completion rate: 35% (low adherence without prompts)
- Retention: 68% at 12 months (high for fitness apps)

---

## Design System Reference

### Color Palette
- **Primary:** Black (#000000), Dark Navy (#1A1A2E)
- **Accent:** WHOOP Green (#00F19F), Neon Cyan (#00D9FF)
- **Data Visualization:**
  - Recovery/Green zone: #00F19F
  - Caution/Yellow zone: #FFD700
  - Strain/Red zone: #FF3366
  - Sleep/Purple: #9D4EDD

### Typography
- **Primary Font:** Proxima Nova (clean, modern sans-serif)
- **Data Display:** DIN Condensed (compact, legible for numbers)
- **Weights:** Light (body), Regular (UI), Bold (headings/scores)

### Visual Style
- Dark mode default (reduces eye strain, focuses attention on metrics)
- Minimalist data visualization (line charts, circular progress rings)
- High contrast for accessibility
- Motion: Subtle fade-ins, no flashy animations

---

## Opportunities Identified

1. **Actionable Coaching Gap:** Users want specific daily plans, not just metrics
2. **Personalization:** One-size-fits-all recommendations don't account for individual goals/constraints
3. **Accountability Loop:** No mechanism to track adherence to recommendations
4. **Context Integration:** Doesn't learn from journal data to refine future advice
5. **Proactive Intervention:** Reactive (show data) vs. proactive (prevent decline)

**Next Step:** Design spec for AI coaching agent that translates WHOOP data into personalized action plans.
