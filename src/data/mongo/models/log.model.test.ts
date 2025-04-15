import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDataBase } from "../init";
import { LogModel } from "./log.model";


describe('log.model.test.ts', () => {

    beforeAll(async () => {
        await MongoDataBase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME,
        })
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test('should return LogModel', async () => {
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low'
        }

        const log = await LogModel.create(logData);
        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String),
        }));

        await LogModel.findByIdAndDelete(log.id);
    });

    test('should return the schema object', () => {
        const schema = LogModel.schema.obj;

        console.log(schema);

        expect(schema).toEqual(expect.objectContaining(
            {
                message: { type: String, required: true },
                origin: { type: String, required: true },
                level: {
                    type: String,
                    enum: ['low', 'medium', 'high'],
                    default: 'low'
                },
                createdAt: expect.objectContaining({
                    type: Date,
                    default: expect.any(Date)
                })
            }
        ));
    });


});
