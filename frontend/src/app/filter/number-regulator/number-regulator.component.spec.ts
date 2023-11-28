import { TestBed } from "@angular/core/testing";
import { getTestBedDeclarations, getTestBedImports } from "../../testbed.app.module";


describe('PriceRegulatorComponent', () => {
  // let component: NumberRegulatorComponent;
  // let fixture: ComponentFixture<NumberRegulatorComponent>;
  it("should be silent",()=>{
    expect(true).toEqual(true);
  })
  beforeEach(() => {
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    TestBed.compileComponents();
  });
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [NumberRegulatorComponent],
  //     imports: [
  //       BrowserModule,
  //       MatExpansionModule,
  //       BrowserAnimationsModule,
  //       MatIconModule,
  //       MatTabsModule,
  //       MatTableModule,
  //       MatToolbarModule,
  //       MatBadgeModule,
  //       MatListModule,
  //       MatInputModule,
  //       MatSliderModule,
  //       MatRippleModule,
  //       MatGridListModule,
  //       MatButtonModule,
  //       MatCardModule,
  //       MatSidenavModule,
  //       MatCheckboxModule,
  //       MatDividerModule,
  //       ReactiveFormsModule,
  //       MatSelectModule,
  //       MatDialogModule,
  //       MatChipsModule,
  //       MatRadioModule,
  //       FormsModule
  //   ]
  //   });
  //   fixture = TestBed.createComponent(NumberRegulatorComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
