# Git — one project folder

Use **only** this folder for all work and pushes:

```
/Users/nandagiriaditya/Documents/lachava
```

Do **not** edit `Downloads/alientrade-main` for deploys (old duplicate copy).

## Push to GitHub

```bash
cd /Users/nandagiriaditya/Documents/lachava
git status
git add -A
git commit -m "Your message"
git push origin main
```

If SSH fails, use HTTPS:

```bash
git remote set-url origin https://github.com/rishiteerdamsolutions-cyber/lachavapickles.git
git push origin main
```

(Password = GitHub Personal Access Token with `repo` scope.)

## Open in Cursor

**File → Open Folder →** `Documents/lachava`
