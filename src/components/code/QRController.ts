import EventBus from "./EventBusEvent";

export class QRController{

    constructor() {

    }

    onQRScanned(text: string){
        let data = this.toJson(text)
        let func = data.func

        if(func === "callMeeting"){
            let dat = {
                func: "openMeeting"
            }
            this.send(dat)
        }
    }

    send(json: any){
        let text = JSON.stringify(json)
        EventBus.emit("toMainOverlay", text)
    }

    toJson(text: string){
        console.log(text)
        return JSON.parse(text)
    }

}