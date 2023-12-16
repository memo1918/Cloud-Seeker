import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RemoveInstanceComponent } from "./remove-instance.component";
import { getTestBedDeclarations, getTestBedImports } from "../testbed.app";
import { FetchMockSpec } from "../fetch.mock.spec";
import { dummyApplicationData } from "../mocks/fetch/applicationdummydata.spec";

describe('RemoveInstanceComponent', () => {
  let component: RemoveInstanceComponent;
  let fixture: ComponentFixture<RemoveInstanceComponent>;

  beforeEach(() => {
    FetchMockSpec.getInstance().setSpy().setResponseData(dummyApplicationData);
    TestBed.configureTestingModule({
      ...getTestBedImports(),
      ...getTestBedDeclarations()
    });
    localStorage.clear();
    fixture = TestBed.createComponent(RemoveInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
