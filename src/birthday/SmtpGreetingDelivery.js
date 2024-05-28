export class SmtpGreetingDelivery {
    sendGreetingToEmployee(employee, smtpUrl, smtpPort, transport) {
        const message = {
          host: smtpUrl,
          port: smtpPort,
          from: "sender@here.com",
          to: [employee.getEmail()],
          subject: "Happy Birthday!",
          text: `Happy Birthday, dear ${employee.getFirstName()}!`,
        };
        transport.sendMail(message);
      }
}