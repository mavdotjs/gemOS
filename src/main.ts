import './app.postcss'
import App from './GemOS.svelte'
import { writable } from 'svelte/store'

class Dispatcher {
  #events: Record<string, { listeners: Array<(...data: any[]) => null> } >
  constructor () {
      this.#events = {};   
  }
  
  addListener(event: string, callback: (...data: any[]) => null) {
      // Check if the callback is not a function
      if (typeof callback !== 'function') {
          console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
          return false;
      }
      
      
      // Check if the event is not a string
      if (typeof event !== 'string') {
          console.error(`The event name must be a string, the given type is ${typeof event}`);
          return false;
      }
      
      // Check if this event not exists
      if (this.#events[event] === undefined) {
          this.#events[event] = {
              listeners: []
          }
      }
      
      this.#events[event].listeners.push(callback);
  }
  
  removeListener(event: string, callback: (...data: any[]) => null) {
      // Check if this event not exists
      if (this.#events[event] === undefined) {
          console.error(`This event: ${event} does not exist`);
          return false;
      }
      
    this.#events[event].listeners = this.#events[event].listeners.filter(listener => {
        return listener.toString() !== callback.toString(); 
    });
  }
  
  dispatch(event: string, ...details: any[]) {
      // Check if this event not exists
      if (this.#events[event] === undefined) {
          console.error(`This event: ${event} does not exist`);
          return false;
      }
      
      this.#events[event].listeners.forEach((listener) => {
          listener(...details);
      });
  }  
}

type Win = {
  x: number,
  y: number
}


const api = {
  messages: new Dispatcher()
}

const app = new App({
  target: document.getElementById('app'),
})

export default app
