import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public view: any = null;

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  constructor(private primengConfig: PrimeNGConfig) {}

  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;
    const map = new Map({
      basemap: "satellite" // Basemap layer service
    });
    const view = new MapView({
      container,
      map: map,
      center: [102.805, 13.027], // Longitude, latitude
      zoom: 5, // Zoom level
    });
    this.view = view;
    return this.view.when();
  }

  ngOnInit(): any {
    this.primengConfig.ripple = true;
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(() => {
      // The map has been initialized
      console.log('The map is ready.');
    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
}
