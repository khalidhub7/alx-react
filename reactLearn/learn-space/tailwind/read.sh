
# use tailwind locally
# development: auto rebuild, no cleanup
npm exec @tailwindcss/cli -- \
-i input.css \
-o output.css \
--watch \
--config ../../tailwind.config.js
# production: one build, clean + minified
NODE_ENV=production npx tailwindcss -i input.css -o output.css --minify


prettier --write --print-width 80 tailwind-card-challenge.html

# hints:
# tailwind v4 prefer @theme instead of theme.extend.colors
# tailwind v4 no longer support darkMode: "class" prefer css way instead