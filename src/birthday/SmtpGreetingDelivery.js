export class SmtpGreetingDelivery {
    constructor(smtpPort, smtpUrl, transport) {
        this.smtpPort = smtpPort;
        this.smtpUrl = smtpUrl;
        this.transport = transport;
      }
    sendGreetingToEmployee(employee) {
        const message = {
          host: this.smtpUrl,
          port: this.smtpPort,
          from: "sender@here.com",
          to: [employee.getEmail()],
          subject: "Happy Birthday!",
          text: `Happy Birthday, dear ${employee.getFirstName()}!`,
        };
        this.transport.sendMail(message);
      }
}