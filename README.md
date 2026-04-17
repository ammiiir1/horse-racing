# 🏁 Horse Race Simulation App

This project is a horse racing simulation system where users can generate race programs, simulate races, and view detailed results of each race and participant.

---

## 🚀 Features

### 🎯 Race Program Generation

Users can generate a new race program by clicking a button.

Each race program contains:
- 20 randomly generated horses
- Unique random names, colors, and IDs
- A base `condition` value (1–100)

---

### 🐎 Horse System

Each horse has:
- `id`
- `name`
- `color`
- `condition` (random 1–100)
- `todayCondition` (dynamic modifier affecting race performance)

👉 `todayCondition` is randomly generated per race and is added/subtracted from the base condition, making race outcomes less predictable.

This means even horses with similar base condition can perform very differently during the race.

---

### 🏁 Race Logic

Race outcome is calculated dynamically based on:
- Base `condition`
- `todayCondition` modifier

Small differences in condition can significantly affect race results.

The system is designed to simulate unpredictable and realistic racing behavior.

---

### 📊 Race Rounds Results

Each race program is divided into multiple **race rounds**.

For every round:
- Results are calculated independently
- Horses participate and compete again based on updated conditions

#### 📈 Sorted Round Results

The results of each race round are displayed in a dedicated table.

Inside each table:
- Horses are **sorted based on their performance in that specific round**
- Ranking is recalculated per round (not global ranking)

This ensures each round has its own independent leaderboard.

👉 This allows users to clearly see:
- Performance changes between rounds
- Fluctuations caused by `todayCondition`
- How consistency and randomness affect outcomes

---

### 📋 Race Program List

All race programs are displayed in a collapsible list (accordion UI).

Each race program includes:
- List of participating horses
- Winner(s)
- Full race history

If a race program is completed:
- Final results are displayed clearly
- Winner and ranking are stored and shown permanently

---

### 🧠 State Management & Data Safety

- Each race program has a unique random ID
- The race page always uses this ID as the source of truth
- Prevents data mismatch or crashes on refresh

---

### 🔒 Refresh Protection

If a user refreshes the race page:
- Middleware detects missing or invalid race ID
- User is redirected to the homepage

This prevents app crashes due to missing state.

---

### 🧪 Testing Strategy

The project includes full testing coverage:

#### Unit Tests
- Core race logic
- Horse generation system
- Condition & todayCondition calculations
- Winner selection logic

#### Component Tests
- RaceProgramList rendering
- Accordion behavior
- Horse list display
- Result visualization for completed races

#### E2E Tests (Playwright)
- Full user flow:
  - Creating race program
  - Generating horses
  - Starting race
  - Viewing results
- Multi-interaction scenarios (click flows, UI state changes)

---

### ⚙️ Tech Stack

- Vue 3 / Nuxt 3
- TypeScript
- Pinia (state management)
- Playwright (E2E testing)
- Vitest (unit & component testing)

---

### 💡 Key Design Decisions

- Randomized data generation for realism and replayability
- Separation of race programs via unique IDs
- Middleware-based safety layer for navigation stability
- Fully testable architecture (logic isolated from UI)

---

### 📌 Summary

This project simulates a complete horse racing system with:
- Dynamic data generation
- Realistic probability-based outcomes
- Fully tested architecture (unit + component + E2E)
- Safe navigation and state handling