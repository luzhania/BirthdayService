export class BirthdayService {
  constructor(employeesRepository) {
    this.employeesRepository = employeesRepository;
  }

  sendGreetings(ourDate, smtpUrl, smtpPort, transport) {
    let employees = this.employeesRepository.getEmployeesByBirthDate(ourDate);

    employees.forEach((employee) => {
      this.sendGreetingToEmployee(employee, smtpUrl, smtpPort, transport);
    });
  }
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
