import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe("Hero Service", () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add"]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: mockMessageService
        }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  describe("getHero", () => {
    it("should call get with the correct url", inject(
      [HeroService],
      (service: HeroService) => {
        //subscribe will be returned only after req.flush returns.
        service.getHero(4).subscribe();

        //expect only one call to the below url.
        const req = httpTestingController.expectOne("api/heroes/4");
        req.flush({
          id: 4,
          name: "SuperDude",
          strength: 4
        });
        //will verify that only one url was called that was expected.
        httpTestingController.verify();
      }
    ));
  });
});
