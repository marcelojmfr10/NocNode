import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from "./email.service";


describe('Pruebas en EmailService', () => {

    const mockSendEmail = jest.fn();

    // mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendEmail
    });

    const emailService = new EmailService();

    test('should send email', async () => {


        const options: SendMailOptions = {
            to: 'marcelo@google.com',
            subject: 'test',
            htmlBody: '<h1>test</h1>'
        };

        const emailSent = await emailService.sendEmail(options);
        // expect(emailSent).toBeTruthy();

        expect(mockSendEmail).toHaveBeenCalledWith(
            {
                attachments: expect.any(Array),
                html: "<h1>test</h1>",
                subject: "test",
                to: "marcelo@google.com",
            },
        );
    });

    test('should send email with attachments', async () => {
        const email = 'marcelo@google.com';
        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendEmail).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs del servidor',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
            ])
        });
    });


});
