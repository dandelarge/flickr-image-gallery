import { AfterViewInit, Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]'
})
export class LazyLoadDirective implements AfterViewInit {
    // intercepting the src attribute from the images and using it as an input 
    // for this directive. 
    @HostBinding('attr.src') srcAttr = null;
    @Input() src: string;
    
    constructor(private el: ElementRef) {}
    
    ngAfterViewInit() {
        // once the view has loaded, let's check if the browser supports IntersectionObserver
        // if it doesnt, we just load the Image
        this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
    }
    
    private canLazyLoad() {
        return window && 'IntersectionObserver' in window;
    }
    
    private lazyLoadImage() {
        // setting the observer
        const obs = new IntersectionObserver(entries => {
            entries.forEach(({ isIntersecting }) => {
                if (isIntersecting) {
                    this.loadImage();
                    // we can stop observing the image once it's loaded
                    obs.unobserve(this.el.nativeElement);
                }
            });
        });
        
        // start observing the image
        obs.observe(this.el.nativeElement);
    }
    
    private loadImage() {
        // get the intercepted src from the image and putting it in the native src, so it loads!
        this.srcAttr = this.src;
    }
}