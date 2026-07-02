# Mezza Scorecard Template

Reusable scorecard pipeline: Google Sheet -> Apps Script -> GitHub Pages -> Cloudflare Zero Trust.

## Use this template
Click Use this template -> Create a new repository above to make your own copy under your own GitHub account.

## Setup
Step 1: Build your Google Sheet. Row 1 is headers; tabs starting with an underscore are ignored.

Step 2: Extensions -> Apps Script, paste in Code_template.gs, deploy as a web app with Anyone access, copy the /exec URL.

Step 3: Edit index.html and paste your Apps Script URL into SCRIPT_URL near the top.

Step 4: Settings -> Pages -> Source: main branch, to publish.

Ask Claude for help with any step, it can read this repo and walk you through it.
