import { TestBed, async } from "@angular/core/testing";
import { GalleryComponent } from './gallery.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';


describe('GalleryComponent', () => {
    let fixture, component;
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
                GalleryComponent
            ],
            providers: [{provide: HttpClient, useValue: httpStub}],
            imports: [HttpClientModule, ScrollingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(GalleryComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('Should render', () => {
        expect(component).toBeTruthy();
    });

    it('Should multiply the request until it\'s over 10,000 items', () => {
       const list = component.multiplyEntries(flikrResponse.photos.photo);
       expect(list.length).toBeGreaterThan(10000);
    });

    it(`Should call the http service on init`, ()=> {
        component.ngOnInit();
        expect(httpStub.get).toHaveBeenCalled();
    })

    it(`should transform the response into view objects on init`, () => {
        component.ngOnInit();
        expect(component.entries[0]).toEqual(jasmine.objectContaining(
            {
                image: 'https://farm1.staticflickr.com/1/photo_id1_secret-secret-igotasecret.jpg',
                title: 'title1'
            }
        ));
    });
});