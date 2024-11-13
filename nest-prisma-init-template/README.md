# How to use

- init repo. `git clone xxxgithubxxx`
- start `nest new .` to generate
- Install packages

  ```sh
    npm install --save-dev @types/lodash cross-env lint-staged prisma husky
    npm install --save @prisma/client @nestjs/config class-transformer class-validator lodash moment qs
  ```

- cp those to package.json

  ```json
  "scripts": {
        "build": "nest build",
        "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
        "start": "nest start",
        "dev": "npm run start:dev",
        "start:dev": "cross-env LOG_LEVEL=verbose NODE_ENV=development nest start --debug --watch",
        "start:debug": "cross-env NODE_ENV=development nest start --debug --watch",
        "start:prod": "cross-env NODE_ENV=production node dist/main",
        "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
        "test": "jest",
        "test:watch": "jest --watch",
        "test:cov": "jest --coverage",
        "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
        "test:e2e": "jest --config ./test/jest-e2e.json",
        "prisma": "prisma format && prisma generate",
        "prisma:push": "prisma db push",
        "prisma:pull": "prisma db pull"
    },
  ```

- init the husky

  ```sh
  npx husky-init
  ```

- Add thosee lint stage to package json
  
  ```json
    "lint-staged": {
        "*.ts": [
          "eslint --fix",
          "prettier --write"
        ],
        "*.md": [
          "prettier --write"
        ]
      }
  ```

- cp those pre-commit and pre-push to .husky/
  
  ```sh
  cp -r ./.husky/pre-commit ../<your=project>/.husky
  cp -r ./.husky/pre-push ../<your=project>/.husky

  ```

- Run `npm install`
- Init prisma `npx prisma init`
- Add Prisma modules  `cp -r ./src  ../<your-project>`
- Cp those config to new project
- `cp -r ./tsconfig.json  ../<your-project>`
- `cp -r ./.eslintrc.js  ../<your-project>`
- `cp -r ./.nvmrc  ../<your-project>`
- `cp -r ./.prettierrc  ../<your-project>`
- Migrate eslint to flat file `npx @eslint/migrate-config .eslintrc.js` install pkgs `npm install globals @eslint/js @eslint/eslintrc -D`
- Delete the eslint file and run `npm run format`
