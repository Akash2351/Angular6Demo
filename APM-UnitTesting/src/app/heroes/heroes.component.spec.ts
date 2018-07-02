import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs/observable/of";

describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderMan", strength: 8 },
      { id: 2, name: "ShakthiMan", strength: 3 },
      { id: 3, name: "SnakeMan", strength: 11 }
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero"
    ]);
    component = new HeroesComponent(mockHeroService);
  });

  describe("delete", () => {
    it("should remove the indicated hero from heroes list", () => {
      component.heroes = HEROES;
      mockHeroService.deleteHero.and.returnValue(of(true));

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    });

    it("should call deleteHero", () => {
      component.heroes = HEROES;
      mockHeroService.deleteHero.and.returnValue(of(true));

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});
