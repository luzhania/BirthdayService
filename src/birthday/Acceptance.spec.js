import { OurDate } from "./OurDate";
import { InMemoryTransport } from "./InMemoryTransport";
import { BirthdayService } from "./BirthdayService";
import { FileEmployeesRepository } from "./FileEmployeesRepository";

describe("Acceptance", () => {
  const SMTP_PORT = 25;
  const SMTP_URL = "localhost";
  const FILENAME = "employee_data.txt";
  let birthdayService;
  let transport; // = new InMemoryTransport();

  beforeEach(() => {
    const employeesRepository = new FileEmployeesRepository(FILENAME);
    transport = new InMemoryTransport();
    birthdayService = new BirthdayService(employeesRepository);

  });

  it("base scenario", () => {
    birthdayService.sendGreetings(
      new OurDate("2008/10/08"),
      SMTP_URL,
      SMTP_PORT,
      transport
    );

    expect(transport.messagesSent.length).toEqual(1);
    const message = transport.messagesSent[0];
    expect(message.text).toEqual("Happy Birthday, dear John!");
    expect(message.subject).toEqual("Happy Birthday!");
    const tos = message.to;
    expect(tos.length).toEqual(1);
    expect(tos[0]).toEqual("john.doe@foobar.com");
  });

  it("will not send emails when nobodys birthday", () => {
    birthdayService.sendGreetings(
      new OurDate("2008/01/01"),
      SMTP_URL,
      SMTP_PORT,
      transport
    );

    expect(transport.messagesSent.length).toEqual(0);
  });

  it("uses correct transport", () => {
    birthdayService.sendGreetings(
      new OurDate("2008/10/08"),
      SMTP_URL,
      SMTP_PORT,
      transport
    );

    const message = transport.messagesSent[0];
    expect(message.host).toEqual(SMTP_URL);
    expect(message.port).toEqual(SMTP_PORT);
  });
});
