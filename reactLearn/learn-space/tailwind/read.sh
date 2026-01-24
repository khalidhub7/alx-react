
# use tailwind locally
# development: auto rebuild, no cleanup
npm exec @tailwindcss/cli -- -i input.css -o output.css --watch
# production: one build, clean + minified
NODE_ENV=production npx tailwindcss -i input.css -o output.css --minify


prettier --write --print-width 80 tailwind-card-challenge.html