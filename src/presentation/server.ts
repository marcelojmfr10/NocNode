import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

const emailService = new EmailService();

export class Server {

    public static start() {
        console.log('Server started...');

        //mandar email

        // new SendEmailLogs(emailService, fileSystemLogRepository).execute('marcelofuentes_10@hotmail.com');


        // const emailService = new EmailService();
        // emailService.sendEmail({
        //     to: 'marcelofuentes_10@hotmail.com',
        //     subject: 'prueba de envío',
        //     htmlBody: `
        //     <h3>logs de sistema - noc</h3>
        //     <p>prueba</p>
        //     <p>ver logs adjuntos</p>`
        // });

        // emailService.sendEmailWithFileSystemLogs('marcelofuentes_10@hotmail.com');

        // CronService.createJob('*/5 * * * * *', () => {
        //     const url = 'https://google.com';
        //     new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log(`${url} is ok`), 
        //         (error) => console.log(error)).execute(url);
        //     // new CheckService().execute('http://localhost:3000');
        // });

    }
}