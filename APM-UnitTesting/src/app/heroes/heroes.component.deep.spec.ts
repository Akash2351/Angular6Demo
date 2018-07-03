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

    const heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentDEs.length).toBe(3);
    heroComponentDEs.forEach((heroComp, index) => {
      expect(heroComp.componentInstance.hero.name).toEqual(HEROES[index].name);
    });
  });

  it("should call heroService.delete with correct hero object ", () => {
    spyOn(fixture.componentInstance, "delete"); // watch n see if the method delete is called.
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //run ngOnInt
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroComponentDEs[0]
      .query(By.css("button"))
      .triggerEventHandler("click", { stopPropagation: () => {} }); //return obj with stopPropagation method on click.

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

    //other way to doing the above thing
    (<HeroComponent>heroComponentDEs[1].componentInstance).delete.emit(
      undefined
    );
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[1]);

    //another way of doing the same
    heroComponentDEs[2].triggerEventHandler('delete',null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[2]);
  });

  it('should add a new hero when hero list add button is clicked', ()=>{
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //run ngOnInt
    fixture.detectChanges();
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({ id:5, name: name, strength:4}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);








  })
});
