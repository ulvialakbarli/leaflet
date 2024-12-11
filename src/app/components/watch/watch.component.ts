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
  selector: 'app-watch',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.scss'
})
export class WatchComponent  implements OnInit,AfterViewInit,OnDestroy{
  private map?:L.Map;
  constructor(private mapService:MapService){

  }
  ngOnDestroy(): void {
    this.unWatch()
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.watchLocation()
    
  }
  ngOnInit(): void {
  }
  initMap(){
    this.map = L.map('map', {
      center: [ 40.40050871474247, 47.61794526591817 ],
      zoom: 6
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  watchId?:number;

  locations?:Array<any>=[];

  watchLocation(){
    if(navigator.geolocation){
      this.watchId= navigator.geolocation.watchPosition(pos=>{
        this.locations?.push(pos);
        this.mapService.addMarker(pos.coords.latitude,pos.coords.longitude,this.map!)
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
}
