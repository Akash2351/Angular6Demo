import { HeroesComponent } from "./heroes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs/observable/of";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe("HeroesComponent deep tests", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;


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
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
       schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService
        }
      ]
    });
    fixture = TestBed.createComponent(HeroesComponent);

  });

  it("should render each hero as a HeroComponent", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //run ngOnInt
    fixture.detectChanges();

   const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toBe(3);
    heroComponentDEs.forEach((heroComp, index) =>{
      expect(heroComp.componentInstance.hero.name).toEqual(HEROES[index].name);
    })
  });

});
