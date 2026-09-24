# Freight Country — issue tracker

Public page: https://httpmax.github.io/issues/

One list of every problem found in the Freight Country platform since the handover from the original agency (Deorwine Infotech), with fix status, whose code caused it, and which developer wrote that code.

- `issues.enc.json`: the data, encrypted. The page asks for a password and decrypts it in the browser.
- `issues.json`: the plain data. Kept only on the owner's machine (git-ignored), never pushed.
- `index.html`: the page that shows it. Needs no build step.

## Updating

Edit `issues.json`, then run `ISSUES_PASSWORD=... node encrypt.mjs` and push `issues.enc.json` to `main`. The page updates within a minute or two.

Each entry:

| Field | Values |
|---|---|
| `id` | `F…` security sweep, `M…` bug fix list, `B…` beta test, `S-…` scenario audit |
| `list` | `security`, `fixlist`, `beta`, `scenario` |
| `sev` | `critical`, `high`, `medium`, `low` |
| `status` | `fixed_live`, `fixed_staging`, `partly`, `open`, `waiting_owner`, `not_a_bug`, `wont_fix` |
| `fault` | `agency`, `ours`, `mixed`, `unclear` |
| `authors` | developer names, primary first; `Our team` for post-handover work |

When fixes go live, change `fixed_staging` to `fixed_live` and update `updated` at the top of the file.

Attribution method: each issue was checked against the last agency-delivered code (API `142add22`, web `cebc7fff`, 28 May 2026) using line-level git history.
