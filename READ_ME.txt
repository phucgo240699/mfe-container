==== Local run ====
Dev - 3030:
npm run start
Prod - 8080:
npm run build
npm run start:build

==== Docker run ====
Dev - 3030:
docker-compose -f docker-compose-dev.yml up -d --build
Prod - 8081:
docker-compose -f docker-compose-prod.yml up -d --build