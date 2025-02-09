import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as L from "leaflet";
import { MapService } from '../../services/map.service';
const iconRetinaUrl = 'public/marker-icon-2x.png';
const iconUrl = 'public/marker-icon.png';
const shadowUrl = 'public/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit,AfterViewInit,OnDestroy{
  private map?:L.Map;
  constructor(private mapService:MapService){

  }
  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
    this.initMap();
    
  }
  ngOnInit(): void {
    this.getLocation();
  }
  initMap(){
    this.map = L.map('map', {
      //center: [ 40.40050871474247, 47.61794526591817 ],
      zoom: 6
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  //////////////////////////////////

  location?:GeolocationPosition;
  
  
 
 
  getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
       this.location=pos;
       this.mapService.addMarker(this.location?.coords.latitude,this.location?.coords.longitude,this.map!);
       let zoomLevel=1;
       const maxZoom=17;
       this.location = pos;
      const latitude = this.location.coords.latitude;
      const longitude = this.location.coords.longitude;

       const zoomInterval = setInterval(() => {
        if (zoomLevel < maxZoom) {
          zoomLevel++;
          this.map?.setView([latitude, longitude], zoomLevel, {
            animate: true,
            duration: 1.0, // Smooth animation for 1 second
          });
        } else {
          clearInterval(zoomInterval); // Stop the interval when max zoom is reached
        }
      }, 1000); // Update zoom every 1 second

      })
     }
  }
  
  
}
