# Sports Quiz

A single-page sports quiz built with **plain HTML, CSS and JavaScript** — no backend,
no build step, no dependencies. Four sports, ten questions each, a 20-second timer,
a per-sport high score and a leaderboard, all saved in the browser with `localStorage`.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | All four screens (home, quiz, results, leaderboard), the note card, the confirmation popup and the watermark |
| `style.css` | All styling, including the four sport themes and the watermark section |
| `script.js` | The 40 questions, the game logic, the motivational notes and the leaderboard storage |

The three files must sit **in the same folder** — they reference each other by relative name.

## Publish it free on GitHub Pages

1. Sign in to GitHub and click **New repository**. Name it `sports-quiz`,
   set it to **Public** (Pages is free on public repositories), and create it.
2. Click **Add file → Upload files**, then drag in `index.html`, `style.css`
   and `script.js` together so they land in the repository root — not in a subfolder.
3. Click **Commit changes**.
4. Open the repository's **Settings → Pages**.
5. Under *Build and deployment*, set **Source** to `Deploy from a branch`,
   **Branch** to `main` and the folder to `/ (root)`, then click **Save**.
6. Wait about a minute and refresh that page. Your link appears at the top:

   ```
   https://YOUR-USERNAME.github.io/sports-quiz/
   ```

Every phone, tablet and desktop can open that link. Sharing the link shares the quiz.

## Updating it later

Edit any file directly on GitHub (pencil icon → commit) and Pages republishes the site
automatically within a minute. No terminal or Git installation is needed.

If you prefer Git on your computer instead:

```bash
git init
git add index.html style.css script.js README.md
git commit -m "Sports quiz"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/sports-quiz.git
git push -u origin main
```

## Editing the quiz

- **Questions** — `QUIZ_DATA` at the top of `script.js`: one object per sport, each
  question has `q`, four `options`, and `answer` (the index 0–3 of the correct option).
- **Motivational notes** — the `MOTIVATIONAL_NOTES` array in `script.js` (44 notes).
- **Watermark name** — the `<div id="watermark">` near the end of `index.html`.
- **Sport colours** — the `body[data-theme="..."]` rules near the top of `style.css`.
- **Timer length** — `TIME_PER_QUESTION` in `script.js`.

## Notes

- Scores and names are stored **per browser**, so everyone who opens the link gets
  their own leaderboard. Nothing is sent to a server, and there is no shared global
  ranking.
- Clearing the leaderboard only affects the browser doing the clearing.
