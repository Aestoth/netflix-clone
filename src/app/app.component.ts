import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'netflix';

  constructor(private _render: Renderer2) {}

  @ViewChild(IonToolbar, {static: true, read: ElementRef}) public toolbar: ElementRef<IonToolbar> | undefined

  contentScroll($event:any) {
      console.log($event)
      const alpha = $event.detail.currentY > 0 ? $event.detail.currentY /100 : 0;
      const color = `rgba(0,0,0, ${alpha >= 1 ? 1 : alpha})`
      this._render.setStyle(
        this.toolbar?.nativeElement,
        'background-color',
        color
      )
  }
  
}

