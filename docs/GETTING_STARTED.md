**_Node version: 22.13.0_**

```sh
nvm use
```

**Development mode**

**_NPM_**

```sh
npm run dev
```

**_Docker_**

```sh
docker-compose -f docker-compose-dev.yml up -d --build
```

**Production mode**

**_NPM_**

```sh
npm run build
npm run start
```

**_Docker_**

```sh
docker-compose -f docker-compose-prod.yml up -d --build
```
