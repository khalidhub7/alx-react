npx create-next-app@latest app-basics
prettier --write --print-width 80 file


tree ../app-basics/ -I 'node_modules/' > docs/structure.txt

npx shadcn@latest init
npx shadcn@latest add avatar

# dump app
for f in $(find app -type f ! -name "*.css"); do echo "=== $f ===" >> \
output.txt; cat "$f" >> output.txt; echo "" >> output.txt; done

npx ts-node test.ts
