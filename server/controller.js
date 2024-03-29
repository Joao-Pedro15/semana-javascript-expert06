import { Service } from "./service.js";
import { logger } from "./util.js";

export class Controller {
 constructor() {
  this.service = new Service()
 }

 async getFileStream(filename) {
  return this.service.getFileStream(filename)
 }

 async handleCommand({ command }) {
  logger.info(`command received: ${command}`)
  const cmd = command.toLowerCase()
  const result = {
   result: 'ok'
  }
  if (cmd.includes('start')) {
   this.service.startStreamming()
   return result
  }
  if (cmd.includes('stop')) {
   this.service.stopStreamming()
   return result
  }
  const chosenFx = await this.service.readFxByName(cmd)
  logger.info(`added fx to service: ${chosenFx}`)
  this.service.appendFxStream(chosenFx)
  return result
 }


 createClientStream() {
  const { clientStream, id } = this.service.createClientStream()
  const onClose = () => {
   logger.info(`closing connection of ${id}`)
   this.service.removeClientStream(id)
  }

  return {
   id,
   stream: clientStream,
   onClose
  }
 }

}