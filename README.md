---

# CLEAN DEPLOY INSTRUCTIONS — RUN BEFORE EVERY PRODUCTION DEPLOY

Every deploy to production must follow these steps in order.
Do not deploy from a dirty working tree. A stale cache or
TypeScript error will produce a broken deploy.

## STEP 1 — Confirm clean working tree
git status
Expected: nothing to commit, working tree clean

## STEP 2 — Pull latest from main
git pull origin main

## STEP 3 — Clear cache and reinstall
rm -rf node_modules .next
npm install
Expected: no errors, no peer dependency conflicts

## STEP 4 — TypeScript check
npm run typecheck (or npx tsc --noEmit)
Expected: 0 errors. Fix all errors before deploying.

## STEP 5 — Production build check
npm run build
Expected: build completes with 0 errors.
If the build fails locally it will fail in production.
Fix it before pushing.

## STEP 6 — Deploy
git push origin main
Railway (or Vercel) will auto-deploy on push to main.
Watch the deployment logs — confirm deploy succeeds before
announcing the update is live.

## STEP 7 — Verify in production
After deploy completes:
- Open the live quiz URL
- Complete the full quiz flow end to end
- Confirm Q1 shows the feeling-first two-card layout
- Confirm the result page shows the archetype correctly
- Confirm the blurred fit reveal is visible on the result page
- Confirm the App Store CTA link works
- Confirm the next.js security vulnerability fix is in package.json
  (next version must be 14.2.35 or higher)

## DEPLOY CHECKLIST
[ ] git status — clean working tree
[ ] git pull origin main — local is up to date
[ ] node_modules and .next deleted and reinstalled
[ ] npm run typecheck — 0 errors
[ ] npm run build — completes with 0 errors
[ ] next version is 14.2.35 or higher (check package.json)
[ ] git push — deploy triggered
[ ] Deployment logs show success (no security vulnerability block)
[ ] Quiz flow verified end to end in production
[ ] Q1 shows feeling-first two-card layout
[ ] Blurred fit reveal visible on result page
[ ] App Store CTA link working

## IF THE DEPLOY FAILS
1. Read the full error in the deployment logs — do not guess
2. If security vulnerability blocked: check next version in package.json
   and run: npm install next@^14.2.35 then push again
3. Run npm run build locally and fix the error there first
4. Check the last 3 commits — what changed recently?
5. Never push a broken build to main — fix it on a branch first
