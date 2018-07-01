import { MessageService } from "../message.service";

describe("MessageService", () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it("should have no messages on start", () => {
    expect(service.messages.length).toBe(0);
  });

  it("should have messages when add is called", () => {
    service.add("Hello");

    expect(service.messages.length).toBe(1);
  });

  it("should have no messages when clear is called", () => {
    service.add("Hello");

    service.clear();

    expect(service.messages.length).toBe(0);
  });
});
