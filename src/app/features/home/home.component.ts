import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/@services/film.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public data: any

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 5,
    spaceBetween: 20,
    pagination: false
  };

  constructor(private movieService: FilmService) { }

  async ngOnInit() {
  this.data = await this.movieService.getData()
  
    console.log("genres", this.data.genres)
  }

}
