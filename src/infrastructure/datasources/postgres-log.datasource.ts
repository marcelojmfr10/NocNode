import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../generated/prisma";

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM,
}

export class PostgresLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];

        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level
            }
        });
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];

        const logs = await prismaClient.logModel.findMany({
            where: {
                level
            }
        });

        return logs.map(log => LogEntity.fromObject(log));
    }

}