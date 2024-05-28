export class BirthdayService {
  constructor(greetingDelivery, employeesRepository) {
    this.employeesRepository = employeesRepository;
    this.greetingDelivery = greetingDelivery;
  }

  sendGreetings(ourDate) {
    let employees = this.employeesRepository.getEmployeesByBirthDate(ourDate);
    employees.forEach((employee) => {
      this.greetingDelivery.sendGreetingToEmployee(employee);
    });
  }
}
