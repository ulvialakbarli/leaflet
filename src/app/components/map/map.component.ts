import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from "leaflet";
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
  imports: [JsonPipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit,AfterViewInit{
  ngAfterViewInit(): void {
    this.initMap();
    
    
  }
  location?:GeolocationPosition;
  watchId?:number;
  private map?:any;
  ngOnInit(): void {
    this.getLocation();
   // this.watchLocation();
    
  }
  initMap(){
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
       this.location=pos;
       this.addMarker(this.location?.coords.latitude,this.location?.coords.longitude);
      })
     }
  }
  watchLocation(){
    if(navigator.geolocation){
      this.watchId= navigator.geolocation.watchPosition(pos=>{
        console.log(pos)
      },
    err=>{
      console.log(err)
    },
  {
    enableHighAccuracy:false,
    timeout:10000,
    maximumAge:0
  })
    }
  }
  unWatch(){
    if(this.watchId){
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  addMarker(lat:any,lon:any){
    console.log(lat);
    console.log(lon);
    const marker=L.marker([lat,lon])
    marker.addTo(this.map)
  }

}
