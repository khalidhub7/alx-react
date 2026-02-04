prettier --write --print-width 80 tailwind-card-challenge.html

npm create vite@latest . -- --template react-ts

# cleanup
rm public/* src/assets/*
for f in src/App.* src/index.css .gitignore README.md; do echo "" > "$f"; done

# tailwind
npm install tailwindcss @tailwindcss/vite


# chadcn
npx shadcn@latest init
npx shadcn@latest add button


tree -I "node_modules|package-lock.json" . > structure.txt