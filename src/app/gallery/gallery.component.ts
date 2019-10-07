import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-gallery',
    templateUrl: 'gallery.component.html',
    styleUrls: ['gallery.component.css']
})
export class GalleryComponent implements OnInit {
    url = 'https://www.flickr.com/services/rest/';
    params = new HttpParams()
        .set('method', 'flickr.galleries.getPhotos')
        .set('api_key', environment.FLICKR_API_KEY)
        .set('gallery_id', environment.GALLERY_ID)
        .set('format', 'json')
        .set('nojsoncallback', '1');
    entries = [];
    
    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
       this.http.get(this.url, {params: this.params}).subscribe(
            (response: any) => {
                const list = response.photos.photo.map(
                    (photo: any) => ({
                        image: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                        title: photo.title
                    }));

                this.entries = this.multiplyEntries(list).map(
                    (entry, index) => ({
                        ...entry,
                        index
                    })
                );
           },
           error => console.log(error)
       );
    }

    multiplyEntries(list): any[] {
        while(list.length < 10000) {
            // Making a copy of the array and appending it to the current array
            const copy = [...list];
            list = [...list, ...copy];
        }
        
        return list
    }

}