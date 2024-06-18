### Nestjs bull

[x] delay the job
[x] base env set the job namespace

# steps
1. Install
```sh
npm i @nestjs/bull
npm i @types/bull
```

2. Copy constant
3. Copy queue-tasks-processor
```
cp ../nest-experamental/nest-bull-queue-init-template/src/modules/queue-tasks-processor src/modules/
```
5. Copy queue-job-creator
   ```
   cp ../nest-experimental/nest-bull-queue-init-template/src/modules/queue-job-creator src/modules/
   ```
6. Use queue-job-creator service's addToQueue func
7. Register Bull on app.module