# Flickr Gallery

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## The solution
I made use of angular-cdk's virtual scroll viewport for the long list rendering. The gallery I took from flickr only has 44 items, so I multiplied it to make it over 10,000 items long. 

### The virtual viewport
angular-cdk's scrolling viewport takes a list, and renders only a chunk specified by the itemsSize input; 50 in my case. so the rendering is quite snappy. the height needs to be fixed and flex-containers don't work propperly with it, so it is better to stick with more traditional approaches to the tiles.

### Images Lazy loading
I created a lazy loading directive that uses the browser's intersection observer. nevertheless, it's not working well with the virtual viewport. It scrambles the src of the objects shown in the screen. Because of this reason I didn't applied it. This doesn't really affects the loading time a lot, since it's only 44 images requested at loading time.

## Important notes
- I was tempted to create an ImageService with two methods: getImages and multiplyEntries, but doe to the smallness of the whole app, I just included everything into the gallery component, so it's easier to read.

- I ran out of time and didn't have much options but to choose in between the lazy loading of the images and the virtual scrolling. Because of this I opted for the virtual scrolling since that seemed to be the main focus of the assignment.

- Because I ran out of time, also, there was not much time to make the grid prettier.

- **About Interfaces and Classes**: I deally I would have use typescript interfaces to define the structure of the response and requests I want in the application. nevertheless because I am a slow writter, I started by testing unsing "any" for everything as a type. I was thinking on cleaning this code afterwards, but then again, I ran out of time.