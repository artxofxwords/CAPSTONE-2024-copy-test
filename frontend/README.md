# Upright Capstone
***

## Purpose of Project
**Market, collect, and host sponsor proposals for Upright bootcamp capstone projects.**

## Technology and Software Used
- Node
- Express
- MongoDB
- React
- Tailwind Flowbite (React)
- JWT Decode
- Nodemailer
- GitPages
- Netlify
- Render

## Instructions for download and update
1. Clone repo [CAPSTONE](https://github.com/TyBeen/CAPSTONE-2024.git) into local folder
2. Create branch off develop01 `git checkout -b [newbranchname]`
3. Split terminal, use `npm run dev` for backend (mongo) and frontend (vite)
4. Push changes to capstone directory
5. Use: 
```
git add .
git commit -m "[message]"
git push --set-upstream origin [thisbranchname]
```

## Instructions for deployment
### FRONTEND
Uses gitpages (module) and netlify (host)
1. Push and merge all updates to _develop01_ branch in github
2. Open _develop01_ branch locally in vscode and `git pull`
3. Once local branch is up to date, test develop01 from `locahost:3000` for full functionality
4. If the update runs perfectly from develop01 localhost, push and merge _develop01_ to prod in github
5. Open _prod_ locally in vscode and `git pull`
6. Once local branch is up to date, `npm run deploy` from _prod_
>The live site is updated!

### BACKEND
Uses render (host)
