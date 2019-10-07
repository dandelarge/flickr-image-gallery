import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {

  const flikrResponse = {
    photos: {
        photo: [
            {
                title: 'title1',
                farm: 1,
                server: 1,
                id: 'photo_id1',
                secret: 'secret-secret-igotasecret'
            },
            {
                title: 'title2',
                farm: 2,
                server: 2,
                id: 'photo_id2',
                secret: 'secret-secret-igotasecret'
            },
            {
                title: 'title3',
                farm: 3,
                server: 3,
                id: 'photo_id3',
                secret: 'secret-secret-igotasecret'
            }
        ]
    }
}
const httpStub = jasmine.createSpyObj('HttpClient', ['get']);
httpStub.get.and.returnValue(of(flikrResponse));
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GalleryComponent
      ],
      providers: [{provide: HttpClient, useValue: httpStub}],
      imports: [ScrollingModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
