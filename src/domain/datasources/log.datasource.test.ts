import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";


describe('log.datasource.ts LogDataSource', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    });

    class MockLogDataSource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }

    test('should thest the abstract class', async() => {
        const mockLogDatasource = new MockLogDataSource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDataSource);
        expect(mockLogDatasource).toHaveProperty('saveLog');
        expect(mockLogDatasource).toHaveProperty('getLogs');
        expect(typeof mockLogDatasource.saveLog).toBe('function');
        expect(typeof mockLogDatasource.getLogs).toBe('function');

        await mockLogDatasource.saveLog(newLog);

        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });

});
