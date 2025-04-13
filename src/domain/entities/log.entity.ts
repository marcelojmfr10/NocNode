
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel; // enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    // factory method to create a LogEntity from a JSON string
    static fromJson = (json: string): LogEntity => {
        json = (json === '') ? '{}' : json;
        const { message, level, createdAt, origin } = JSON.parse(json);
        // if (!message) throw new Error('Message is required');

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        });
        log.createdAt = new Date(createdAt);

        return log;
    }

    static fromObject = (object: {[key: string]: any}): LogEntity => {
        const {message, level, createdAt, origin} = object;
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });

        return log;
    }
}