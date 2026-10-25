# Sillonner

The Sillonner waitlist website.

## Run it on your laptop

1. Open this folder in VS Code (File, Open Folder, pick the folder that contains package.json).
2. Open a terminal inside it (Terminal, New Terminal). The line should end with sillonner.
3. Run: npm install
4. Run: npm run dev
5. Open http://localhost:3000 in your browser.

## How signups work

The form posts to /api/waitlist. That server route sends the signup to Formspree using the FORMSPREE_WAITLIST_ID value from .env.local. The ID never appears in the page code that visitors download.

Never commit .env.local. It is already listed in .gitignore.

## Put it online

Add FORMSPREE_WAITLIST_ID as an environment variable in your Vercel project settings before deploying.
