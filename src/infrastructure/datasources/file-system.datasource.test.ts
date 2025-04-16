import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('Pruebas en FileSystemDataSource', () => {

    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync(logPath, {recursive: true, force: true});
    });

    test('should create log files if they do no exists', () => {
        new FileSystemDataSource();

        const files = fs.readdirSync(logPath);
        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
    });

    test('should save a log in all logs-all.log', () => {
        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in all logs-all.log and logs-medium.log', () => {
        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in all logs-all.log and logs-high.log', () => {
        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    });

    test('should return all logs', async() => {
        const logDatasoure = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test-low',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        const logMedium = new LogEntity({
            message: 'test-medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        const logHigh = new LogEntity({
            message: 'test-high',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        await logDatasoure.saveLog(log);
        await logDatasoure.saveLog(logMedium);
        await logDatasoure.saveLog(logHigh);

        const logsLow = await logDatasoure.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasoure.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasoure.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([log, logMedium, logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
    });

    test('should not throw an error if path exists', () => {
      new FileSystemDataSource();
      new FileSystemDataSource();

      expect(true).toBeTruthy();
    });
    
    test('should throw an error if severity level is not defined', async() => {
      const logDatasource = new FileSystemDataSource();
      const customSeveritylevel = 'HIGH-2' as LogSeverityLevel;

      try {
        await logDatasource.getLogs(customSeveritylevel);
        expect(true).toBeFalsy();
      } catch (error) {
        const errorString = `${error}`;
        expect(errorString).toContain(`${customSeveritylevel} not implemented`);
      }

    });
    

});
