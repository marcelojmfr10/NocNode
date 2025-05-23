import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";


describe('Pruebas en LogRepositoryImpl', () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const logRepository = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should saveLog call the datasource with arguments', async() => {
        const log = { level: LogSeverityLevel.high, message: 'hola', } as LogEntity;

        await logRepository.saveLog(log);
        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
    });

    test('should getLogs call the datasource with arguments', async() => {
        const lowSeverity = LogSeverityLevel.low;
        await logRepository.getLogs(lowSeverity);
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity);
    });

});
