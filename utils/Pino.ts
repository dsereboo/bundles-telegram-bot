import pino, {LoggerOptions} from "pino";


//File transport function
//Find appropriate types required for this to work properly
const fileTransport = pino.transport({
        target:"pino/file",
        options:{destination:`./logs/app.log`}
    })


//Find type to specify config
const config:LoggerOptions ={
    //minimum log level
    level:"info",

    
    formatters:{
        //modifying levels
        level:(label,number)=>{
            return {label:label, number:number}
        },
        bindings:(bindings)=>{
            //Find type for bindings
            return {pid:bindings.pid, host:bindings.hostname, node_version:process.version }
        }

    },
    //transport:transportFunction
}

export const logger = pino(config, fileTransport)
