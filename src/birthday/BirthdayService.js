import { FileEmployeesRepository } from "./FileEmployeesRepository";

export class BirthdayService {
  constructor() {}

  sendGreetings(ourDate, fileName, smtpUrl, smtpPort, transport) {
    let employeesRepository = new FileEmployeesRepository();
    let employees = employeesRepository.getEmployeesByBirthDate(ourDate, fileName);

    employees.forEach((employee) => {
      const message = {
        host: smtpUrl,
        port: smtpPort,
        from: "sender@here.com",
        to: [employee.getEmail()],
        subject: "Happy Birthday!",
        text: `Happy Birthday, dear ${employee.getFirstName()}!`,
      };
      transport.sendMail(message);
    });
  }

}
