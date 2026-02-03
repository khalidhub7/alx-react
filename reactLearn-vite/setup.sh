

npm create vite@latest . -- --template react-ts

# cleanup
rm public/* src/assets/*
for f in src/App.* src/index.css .gitignore README.md; do echo "" > "$f"; done