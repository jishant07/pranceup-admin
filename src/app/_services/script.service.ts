import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor() { }

  myScriptElement: HTMLScriptElement;

  public loadJsScript(src:string){
    //To load compement specific js
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = src;
    document.body.appendChild(this.myScriptElement);
  }
}
