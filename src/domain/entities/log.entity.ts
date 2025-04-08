
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {
    public level: LogSeverityLevel; // enum
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    // factory method to create a LogEntity from a JSON string
    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);
        // if (!message) throw new Error('Message is required');

        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);

        return log;

    }
}