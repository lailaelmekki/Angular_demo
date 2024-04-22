import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-app-error',
  templateUrl: './app-error.component.html',
  styleUrl: './app-error.component.css'
})
export class AppErrorComponent {
  constructor(public appState:AppStateService) {
  }

}
