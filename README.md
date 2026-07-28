# Stakeholder Colors — DISC Personality Recommender

A personal, local-only web app to assess your work relationships through the DISC personality model from *Surrounded by Idiots* by Thomas Erikson. Understand your colleagues' communication styles, get actionable advice on how to work with each of them, and visualize your entire stakeholder landscape.

> ⚠️ **Experimental personal project, provided as-is.** This is a self-reflection tool built on a behavioral model that is popular but **not scientifically validated**. It is not a psychological assessment and must not be used for hiring, promotion, performance, or any other employment decision. See [Disclaimers](#disclaimers) before using it.

## Features

- **Self-Assessment** — Take a 24-question assessment to discover your own DISC color (Red, Yellow, Green, or Blue) and unlock personalized pairing advice for every contact
- **Contact Assessments** — Assess each colleague with observer-based questions; automatically detect primary and secondary colors with confidence scores
- **Book-Grounded Advice** — Eight comprehensive sections per person (all authored from the original book):
  - How they see themselves vs. how others perceive them
  - Dos and don'ts when working with them
  - Communication & email style guidance
  - How to give them feedback effectively
  - What stresses them and how to help
  - Their conflict and decision-making patterns
  - Body language tells
  - Your-color-to-their-color pairing advice
  - Corporate-level specific guidance (IC through C-Level)
- **Smart Versioning** — Re-assess contacts yearly; all versions are kept with score deltas, and you'll see a "Refresh due" badge after 12 months
- **Dashboard** — See your whole stakeholder landscape:
  - Quadrant map showing task-oriented vs. people-focused and active vs. reserved
  - Distribution of colors across your contacts
  - Color mix breakdown by corporate level
  - AI-generated pattern insights
- **PDF Export** — Export any assessment as a polished PDF report via your browser's print-to-PDF feature
- **Backup & Restore** — Export/import JSON backups to keep your data safe
- **100% Local** — All data stored in your browser's localStorage; no server, no accounts, no cloud sync

## What is DISC?

DISC is a behavioral assessment model based on William Moulton Marston's work. It categorizes people into four primary types:

- **Red (Dominance)** — Direct, results-driven, impatient, competitive
- **Yellow (Influence)** — Optimistic, persuasive, people-focused, spontaneous
- **Green (Stability)** — Steady, team-first, conflict-averse, reliable
- **Blue (Compliance/Analytic)** — Detail-oriented, methodical, skeptical, quality-focused

Most people are a blend of two colors. This app helps you understand that blend and adapt your communication accordingly.

## Quick Start

### Prerequisites

- **Node.js** 18+ ([download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Safari, Firefox, Edge)

### Installation

Copy and paste this whole block into your terminal:

```bash
git clone https://github.com/dnd1097/the-disc-recommender.git && cd the-disc-recommender && npm install && npm run dev
```

Then open **http://localhost:5199** in your browser. That's it.

<details>
<summary>Prefer to run it step by step?</summary>

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dnd1097/the-disc-recommender.git
   ```

2. **Move into the project folder** — this step matters; `npm install` fails if you skip it:
   ```bash
   cd the-disc-recommender
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the app:**
   ```bash
   npm run dev
   ```

5. **Open in your browser:** the terminal prints the URL, normally `http://localhost:5199`.

</details>

**No git?** Download the ZIP from the [repository page](https://github.com/dnd1097/the-disc-recommender) (green **Code** button → **Download ZIP**), unzip it, then `cd` into the unzipped folder and run `npm install && npm run dev`.

To stop the app, press `Ctrl+C` in the terminal. To start it again later, `cd` back into the folder and run `npm run dev`.

## How to Use

### 1. Start with Yourself
- Navigate to **My Profile**
- Click **Assess yourself**
- Answer 24 quick questions about your own behavior
- Your color will unlock the "you × them" pairing advice for all your contacts

### 2. Add Colleagues
- Go to **Contacts** → **Add contact**
- Enter their name, job title, and corporate level
- Answer 24 observer-based questions about their behavior
- Get their DISC profile with actionable advice

### 3. Explore the Dashboard
- See where you and your contacts plot on the task/relationship and active/reserved axes
- Understand patterns in your stakeholder distribution
- Identify which colors you interact with most

### 4. Manage Assessments
- **Version control** — Click "New 2026 assessment" to re-assess someone and compare scores over time
- **Export PDF** — Print any report to PDF for sharing or archiving
- **Refresh tracking** — Assessments older than 12 months get a "Refresh due" badge

### 5. Backup Your Data
- Click **Export backup** to download a JSON file with all your data
- Click **Import** to restore from a backup

## Understanding Your Results

### Primary vs. Secondary Colors
- Your **primary color** is your dominant style
- Your **secondary color** (if present) is your secondary tendency
- Most people operate as a two-color blend (e.g., Red/Blue)

### Confidence Scores
- **Clear** — Large gap between your top two colors; strong profile
- **Moderate** — Medium spread; some blend between colors
- **Mixed** — Close scores; flexible across all four colors

### The Advice Sections

Each contact report includes:

1. **Snapshot** — How they see themselves vs. how others experience them
2. **Adapting to Them** — Dos and don'ts to work effectively with this person
3. **Communication & Email** — How they prefer to communicate; email style tells
4. **Feedback** — The right way to give them positive and negative feedback
5. **Stress** — What triggers stress for this person and how to help them recover
6. **Conflict & Decisions** — How they fight, how they decide, what persuades them
7. **Body Language** — Observable tells that reveal their color
8. **Pairing Advice** — Specific tips for YOU working with THEM (only visible after you complete your own profile)
9. **Corporate Level Lens** — Adjusted guidance based on their role (IC through C-Level)

## Data Privacy

✅ **All data is local to your computer.** No servers, no cloud sync, no data collection. Your assessments are stored only in your browser's localStorage. You control everything:

- Export your data anytime as JSON
- Delete anything you want
- Share only what you choose to share

## Your Data Survives App Updates

Assessments take real effort, so the app is built never to throw them away when the code changes.

**What happens when you update the app.** Saved data carries a schema version. On startup the app compares it with the version the current build expects:

| Situation | What the app does |
|---|---|
| Same version | Loads normally |
| Older version | Snapshots your data, runs the migration chain, loads it upgraded, and tells you what changed |
| Newer version (e.g. an old cached build) | Loads **read-only** and refuses to write, so an older build cannot clobber newer data |
| Unreadable or corrupt | Copies the raw data aside under its own key and starts empty — nothing is deleted |

**Guarantees:**

- Data is never silently discarded. Anything the app cannot read is preserved under a timestamped key (`disc-recommender-v1-corrupt-…`) and reported on screen.
- A pre-upgrade snapshot is kept before every migration (last 3 retained).
- Scores are frozen at capture time and never recomputed, so editing the questions later cannot rewrite your history.
- Each assessment records the question-set version that produced it. If you compare two assessments made under different question sets, the app flags that the comparison is not like-for-like.
- Backup files migrate on import, so a backup exported today will still import into a much later version of the app.
- If a save fails (storage full, private browsing), you get an explicit warning instead of silent data loss.

**⚠️ The one risk the app cannot protect you from: the browser deleting its own storage.** This happens if you clear site data, use private browsing, or — notably on **iOS Safari** — leave a site unused for about 7 days without adding it to your Home Screen. Nothing local can defend against that.

> **Export a backup periodically.** It is one click, and it is the only copy that outlives the browser. Keep it somewhere you actually back up.

### Adding a migration (for developers)

When you change the persisted shape:

1. Add a step to `MIGRATIONS` in [`src/lib/migrations.ts`](src/lib/migrations.ts) with `from`, `to`, a plain-English `description`, and a pure `migrate` function.
2. Bump `CURRENT_SCHEMA` to the new number.
3. Update the types in [`src/types.ts`](src/types.ts).

Migrations run in sequence, so data from any older version upgrades cleanly in one pass. Never delete an old migration — it is the path a years-old backup still depends on.

If you change the questions in a way that affects scoring (adding, removing, or re-pointing a question to a different color), bump `QUESTION_SET_VERSION` in [`src/data/questions.ts`](src/data/questions.ts). Never reuse an existing question id for a different question: stored answers are keyed by id, and reuse would silently misattribute them.

## Building for Production

To create a production-optimized build:

```bash
npm run build
```

This generates an optimized `dist/` folder that you can:
- Host on any static hosting (Vercel, Netlify, GitHub Pages, etc.)
- Run locally with `npx serve dist`
- Share on an internal company server

## Troubleshooting

### "Could not read package.json" / `ENOENT` when running `npm install`
→ You are running the command from the wrong folder. `npm install` must run **inside** the project folder. Fix it with:

```bash
cd the-disc-recommender && npm install
```

If that says "no such file or directory", the clone never completed — re-run the one-line command in [Quick Start](#installation). Run `pwd` to see where you currently are and `ls` to confirm you can see `package.json`.

### "Repository not found" when cloning
→ Check the URL is exactly `https://github.com/dnd1097/the-disc-recommender.git`. If the repository is private, sign in to GitHub first or download the ZIP instead.

### "npm command not found"
→ Node.js is not installed. [Download it here](https://nodejs.org/) and restart your terminal.

### "Unsupported engine" or syntax errors during install
→ Your Node.js is too old. This project needs **Node 18 or newer**. Check with `node -v` and upgrade from [nodejs.org](https://nodejs.org/) if needed.

### "Port 5199 is already in use"
→ Another app is using that port. Either close it or Vite will use the next available port. Check the terminal output for the actual URL.

### "My data disappeared"
→ If you cleared browser cache/cookies, localStorage was wiped. You can restore from a backup JSON file using the **Import** button.

### "The app is slow"
→ If you have 50+ contacts with multiple versions each, your browser's localStorage is working hard. Try exporting a JSON backup and starting fresh in an incognito window to test.

## Development

### Project Structure
```
src/
  pages/              # Full-page components (Dashboard, ContactList, etc.)
  components/         # Reusable components (ColorChip, ScoreBars, etc.)
  data/              # Static data (questions, advice content, colors)
  lib/               # Business logic (scoring, advice composition)
  store.tsx          # React context + localStorage persistence
  types.ts           # TypeScript types
  styles.css         # Main styles (DISC color palette)
  print.css          # Print-to-PDF stylesheet
  main.tsx           # Entry point
  App.tsx            # Router and layout
```

### Key Technologies
- **React 18** — UI framework
- **React Router** — Client-side routing
- **TypeScript** — Type safety
- **Vite** — Build tool (fast, modern)
- **SVG** — Charts (no external charting library)

### Tech Decisions
- **No backend** — Keep it simple, fast, and free to host
- **Rule-based advice** — Crafted from the book, not AI-generated
- **localStorage** — Good enough for personal use; works offline

## Attribution

This app applies the DISC behavioral model as popularized in Thomas Erikson's *Surrounded by Idiots*. The book informed:
- The four-color framing (Red, Yellow, Green, Blue) and the two underlying axes
- The topics each report covers — adaptation, feedback, communication, stress, conflict, body language
- The idea that most people are a two-color blend

All text in this app is original writing. No passages, examples, questions, or illustrations from the book are reproduced here. DISC itself originates with William Moulton Marston's 1928 work and is not proprietary to any one author.

This project is **independent and unaffiliated**. It is not endorsed by, sponsored by, or connected with Thomas Erikson, his publishers, John Wiley & Sons (owner of the *Everything DiSC*® trademark), TTI Success Insights, or any other DISC assessment vendor. "DiSC" is a registered trademark of its respective owner and is used here only descriptively.

## Disclaimers

**No warranty.** This software is provided "as is", without warranty of any kind. The author accepts no liability for any claim, damages, or other liability arising from its use. See the [LICENSE](LICENSE) for the full terms. Use it at your own risk.

**Not a scientific or psychological instrument.** DISC is widely used in business but lacks robust peer-reviewed validation, and its four-color popularization has been criticized by psychologists. The results this app produces are structured guesses derived from your own subjective answers — not measurements, diagnoses, or facts about anyone. Treat every report as a prompt for reflection, nothing more.

**Not for employment decisions.** Do not use this app — or anything it outputs — to inform hiring, firing, promotion, compensation, team assignment, performance review, or any other employment decision. Using unvalidated personality assessments this way is professionally inappropriate and may carry legal exposure under employment and anti-discrimination law in many jurisdictions.

**You are responsible for how you use it.** The assessments describe real people who have not consented to being assessed and cannot see or correct what you record. Keep your data private, avoid sharing reports about someone without their knowledge, and be aware that notes about identifiable individuals may fall under data protection laws such as GDPR depending on your jurisdiction and how you use them.

**Not professional advice.** Nothing here constitutes psychological, medical, HR, or legal advice.

## Contributing

Found a bug? Want to suggest a feature? Feel free to:
- Open an issue on GitHub
- Fork and submit a pull request
- Reach out directly

## License

Released under the [MIT License](LICENSE) — free to use, copy, modify, and distribute for personal or commercial purposes, provided the copyright notice and license text are retained.

The MIT License includes an explicit disclaimer of warranty and limitation of liability: the software is provided "AS IS", and the author is not liable for any claim or damages arising from its use.

## Support

Have questions? Check the [GitHub Issues](https://github.com/dnd1097/the-disc-recommender/issues) or create a new one.

---

**Ready to understand your stakeholders better?** Run `npm run dev` and start assessing today.
