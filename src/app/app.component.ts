import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import gsap from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('media', { static: false }) media: any;
  @ViewChild('videoWrapper', { static: false }) videoWrapper!: ElementRef;
  @ViewChild('video', { static: false }) video!: ElementRef;

  preload: string = 'auto';
  api!: VgApiService;

  videoOnPause:boolean=false;

  constructor() {}

  fullscreen():void {
    this.api.fsAPI.toggleFullscreen()
  }

  togglePlayPause():void{
    if(this.videoOnPause){
      this.api.play();
    }else{
      this.api.pause();
    }
    this.videoOnPause =!this.videoOnPause
  }

  onPlayerReady(source: VgApiService): void {
    this.api = source;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.autoplay.bind(this)
    );
  }

  autoplay(): void {
    this.api.play();
  }
  ngAfterViewInit() {
    const mm = gsap.matchMedia();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.container',
        start: 'top top',
        end: '+=1500',
        pin: true,
        pinSpacing: true,
        scrub: 1,
      }
    });

    tl.fromTo(['.video-wrapper', '.card-1'],
      { scale: 1.04, opacity: 0, yPercent: 30 },
      { scale: 1, opacity: 1, duration: 0.8, yPercent: 0, ease: 'cubic-bezier(0.8, 0, 0.2, 1)' }
    );

    tl.fromTo('.video', { scale: 1.1 }, { scale: 1, duration: 0.8, ease: 'cubic-bezier(0.8, 0, 0.2, 1)' });

    tl.to('.card-1', { scale: 0.92, yPercent: -18, opacity: 0.5 }, "+=0.5");
    tl.to('.card-2', { opacity: 1 }, "-=0.3");

    tl.to('.card-2', { scale: 0.95, yPercent: -8, opacity: 0.5 }, "+=0.5");
    tl.to('.card-3', { opacity: 1, yPercent: -5 }, "-=0.3");

    tl.to('.card-3', { scale: 1, opacity: 1 });

    tl.to('.container', { duration: 1 });

    const triggerText =()=> gsap.fromTo('.word',
      { opacity: 0.2, y: 20, visibility: 'hidden' },
      {
        opacity: 1,
        y: 0,
        visibility: 'visible',
        duration: 0.6,
        stagger: 0.05,
        ease: 'cubic-bezier(0, 0, 1, 1)',
        scrollTrigger: {
          trigger: '.text-section',
          start: 'bottom+=200px',
          end:'+=50px',
          toggleActions: 'play none none none',
          scrub: 1,
          markers: true
        }
      })

    mm.add("(min-width: 1001px)", () => { 
      console.log('min')
        gsap.fromTo('.word',
      { opacity: 0.2, y: 20, visibility: 'hidden', },
      {
        opacity: 1,
        y: 0,
        visibility: 'visible',
        duration: 0.6,
        stagger: 0.05,
        ease: 'cubic-bezier(0, 0, 1, 1)',
        scrollTrigger: {
          trigger: '.text-section',
          start: 'bottom-=120px',
          toggleActions: 'play none none none',
          scrub: 1
        }
      }
    );
    })
    mm.add("(max-width: 1000px)", () => {
      gsap.set('.text-section', { yPercent: -18, opacity: 1 }); 

      triggerText()
    })

    mm.add("(max-width: 900px)", () => {
      gsap.set('.text-section', { yPercent: -10, opacity: 1 }); 

      triggerText()
    })

    mm.add("(max-width: 800px)", () => {
      gsap.set('.text-section', { yPercent: -22, opacity: 1 }); 

      triggerText()
    })

    mm.add("(max-width: 700px)", () => {
      gsap.set('.text-section', { yPercent: -28, opacity: 1 }); 

      triggerText()
    })
    
    mm.add("(max-width: 600px)", () => {
      gsap.set('.text-section', { yPercent: -32, opacity: 1 }); 

      triggerText()
    })

    mm.add("(max-width: 500px)", (context) => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 500px)", () => {
        gsap.set('.text-section', { yPercent: -35, opacity: 0 }); 
      
        gsap.to('.text-section', { 
          opacity: 1, 
          duration: 0.6, 
          ease: "power2.out" 
        });
      
        gsap.fromTo('.word',
          { opacity: 0.2, y: 20, visibility: 'hidden' },
          {
            opacity: 1,
            y: 0,
            visibility: 'visible',
            duration: 0.6,
            stagger: 0.05,
            ease: 'cubic-bezier(0, 0, 1, 1)',
            scrollTrigger: {
              trigger: '.text-section',
              start: 'bottom+=500px',
              end:'+=50px',
              toggleActions: 'play none none none',
              scrub: 1,
              markers: true
            }
          }
        );
      });
      
      tl.to(['.video-wrapper', '.card-1'],
        { scale: 1, borderRadius: '18px', opacity: 1, duration: 0.8, yPercent: 0, ease: 'cubic-bezier(0.8, 0, 0.2, 1)' }
      );
      gsap.to('.card-1', { y: -10, duration: 0.6, scale: 0.80 });
      gsap.to('.card-2', { y: -11, duration: 0.6, scale: 1 });
      gsap.to('.card-3', { y: -5, duration: 0.6 });
    });
  }
}
