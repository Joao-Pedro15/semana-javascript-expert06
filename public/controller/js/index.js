import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";

const url = `${window.location.origin}/controller`

Controller.initialized({
 view: new View(),
 service: new Service({ url })
})