import { Component, OnInit } from '@angular/core';
import { slideUpDownAnimation,slideLeftRightAnimation,slideUp, slideFade } from 'src/app/animation';
@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css'],
  animations:[slideUpDownAnimation,slideLeftRightAnimation,slideUp, slideFade]
})
export class PromoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
