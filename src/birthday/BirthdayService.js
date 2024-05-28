import { SmtpGreetingDelivery } from "./SmtpGreetingDelivery";
export class BirthdayService {
  constructor(employeesRepository) {
    this.employeesRepository = employeesRepository;
  }

  sendGreetings(ourDate, smtpUrl, smtpPort, transport) {
    let employees = this.employeesRepository.getEmployeesByBirthDate(ourDate);
    let greetingDelivery = new SmtpGreetingDelivery();
    employees.forEach((employee) => {
      greetingDelivery.sendGreetingToEmployee(employee, smtpUrl, smtpPort, transport);
    });
  }
}
