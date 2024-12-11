import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { WatchComponent } from './components/watch/watch.component';
import { LocateComponent } from './components/locate/locate.component';
import { PopupComponent } from './components/popup/popup.component';

export const routes: Routes = [
    {
        path:"map",
        component:MapComponent,
        pathMatch:"full"
    },
    {
        path:"watch",
        component:WatchComponent
    },
    {
        path:"locate",
        component:LocateComponent
    },
    {
        path:"popup",
        component:PopupComponent
    },


    {
        path:"",
        redirectTo:"map",
        pathMatch:"full"
    },
    {
        path:"**",
        redirectTo:"map",
        pathMatch:"full"
    }
];
