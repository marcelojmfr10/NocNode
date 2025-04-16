import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "../../data/mongo";
import { MongoLogDataSource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


describe('Pruebas en MongoLogDataSource', () => {

    const logDataSource = new MongoLogDataSource();

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test message',
        origin: 'mongo-log.datasoure.test.ts'
    })

    beforeAll(async () => {
        await MongoDataBase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });
    });

    afterEach(async() => {
        await LogModel.deleteMany();
    });

    afterAll(async() => {
        mongoose.connection.close();
    });

    test('should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(log);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('mongo log created:', expect.any(String));
    });

    test('should get logs', async() => {
        await logDataSource.saveLog(log);
        await logDataSource.saveLog(log);
        await logDataSource.saveLog(log);

        const logs = await logDataSource.getLogs(LogSeverityLevel.medium);
        expect(logs.length).toBe(3);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);

    });

});
