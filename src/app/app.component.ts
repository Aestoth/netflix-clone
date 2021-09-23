import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { IonToolbar, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'netflix';

  constructor(private _render: Renderer2, private toastCtrl: ToastController) {
    this.displayToastInstall
  }

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

  async displayToastInstall(platform = null) {
    // Detects if device is on iOS 
    const isIos = () => {
      const userAgent = platform || window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);
    // Checks if should display install popup notification:
    console.log(isIos(), isInStandaloneMode());
    
    if (isIos() && !isInStandaloneMode()) {
      const toast =  await this.toastCtrl.create({
        message: "Vous pouvez installer cette application via l'icône du navigateur"
      });
     await toast.present()
    }
  }
}

