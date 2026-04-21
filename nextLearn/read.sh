# setup nextJs
npx create-next-app@latest app-basics

# formatter
prettier --write --print-width 80 file

# save project structure
tree ../app-basics/ -I 'node_modules/' > docs/structure.txt

# chadcn setup
npx shadcn@latest init
npx shadcn@latest add avatar

# run sigle ts file
npx ts-node test.ts

# setup redis
sudo apt install redis-server
npm install ioredis

redis-server # run redis server
redis-cli ping  # should return PONG