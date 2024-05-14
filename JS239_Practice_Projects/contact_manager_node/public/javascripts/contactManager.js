import { APIHandler } from "./apiHandler.js";
import { DisplayHandler } from "./display.js";
import { SetupHandler } from "./setup.js"

document.addEventListener('DOMContentLoaded', () => {
  let apiHandler = new APIHandler();
  let displayHandler = new DisplayHandler(apiHandler);
  let setupHandler = new SetupHandler(apiHandler, displayHandler);
});