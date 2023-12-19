## New project and use prisma.
--- 

1. Create repo on github
2. Create DB on aws 
   1. Connect to aws postgres`PSQL -h <host> -U dbadmin -d postgres`
   2. Create new DB `CREATE DATABASE "2dm-bento-api-dev" WITH ENCODING 'UTF8';`
3. Generate project on local 
   1. `nest n <project-name>`
   2. `cd <project-name>`
4. Instaall the prisma
   1. `npm i prisma -D`
   2. init prisam `npx prisma init`
   3. set up the db url on `.env` 
   4. `DATABASE_URL=postgresql://{username}:{password}@{host}:{port}/{dbname}`
5. Change the `package.json`
   1. Add prisma cmd
   2. Generate the prisma client `"prisma": "prisma format && prisma generate"`
   3. Run prisma push `"prisma:push": "prisma db push"`
   4. Run prisma pull `"prisma:pull": "prisma db pull"`
6. Add the cross-env to set the start node_env
   1. Install it `npm i cross-env -D`
   2. Change the `package.json` cmd
   3. npm run dev `"dev": "npm run start:dev"`
   4. `"start:dev": "cross-env LOG_LEVEL=verbose NODE_ENV=development nest start --debug --watch"`
   5. `"start:debug": "cross-env NODE_ENV=development nest start --debug --watch"`
   6. `"start:prod": "cross-env NODE_ENV=production node dist/main"`
7. Debug toggle attch
   1. `--inspect`, Auto attach the debug. and go to watch mode.
8. Add the husky
   1. Add and install the husky `npx husky-init && npm install`
   2. Add a new cmd `npx husky add .husky/pre-push "echo 'hello pre-push'"` 
   3. Can write shell cmd on the `pre-push` cmd
9. Add the lint-stage and format the code before commit
   1. install it  `npm install --save-dev lint-staged`
   2. Add the lint stage on the pre-commit `npx lint-staged`
   3. Config the lint stage 
   4. ```json
        "lint-staged": {
          "*.ts": [
            "eslint --fix",
            "prettier --write",
            "git add"
          ],
          "*.md": [
            "prettier --write"
          ]
        }
      ```
10. Add the section on the `.gitignore`
    1. .env
    2. *.note*
    3. *.http*
11. Add the prettierrc and eslint.json
    1.  Add this  to prettierrc. `"printWidth": 150,"trailingComma": "all"`
    2.  Set eslint use prettierrc. 
    3.  ```
         'prettier/prettier': [
            'off',
            {},
            {
            usePrettierrc: true,
            },
         ],
         ```
12. Add the database module
    1. Create module `nest g mo modules/database`
    2. Create prismaService `nest g s modules/database/prisma` extends PrismaCLient and implement OnModuleInit. this.$connect when module init
    3. Set the logger for prisma service.
    4. If need redis can also connect on this module. 
    5.      
13. Add the customer logger module
14. Add the nvmrc to easy use the node version
15. Set the tsconfig `"esModuleInterop": true,` to let import _ from lodash working
16. Add the config module

