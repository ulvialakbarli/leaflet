import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makePopup(data: {lat:number,lang:number}): string { 
    return `` +
      `<div>Latitude: ${ data.lat }</div>` +
      `<div>Longitude: ${ data.lang }</div>`
  }
}
