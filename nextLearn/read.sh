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


# search files that used x func
rg "getCartItems" -g '!node_modules' -g '!.next'

# storage files
mkdir -p storage/auth storage/cart && \
touch storage/auth/sessions.json storage/auth/users.json && \
touch storage/cart/carts.json

# dump a dir

find features/auth -type f | while read file; do
  {
    echo "FILE: $file"
    echo "----------------------------------------"
    cat "$file"
    echo
    echo "========================================"
    echo
  } >> ../dump.txt
done

# reset storage
find storage -type f \
! -name "emailIndex.json" \
! -name "userCartIndex.json" \
-delete && \
echo "{}" > storage/auth/emailIndex.json && \
echo "{}" > storage/cart/userCartIndex.json