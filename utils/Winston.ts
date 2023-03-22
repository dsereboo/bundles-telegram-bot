import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";"winston-daily-rotate-file"

const { combine, timestamp, json, metadata, align,splat,printf,padLevels } = winston.format;


const logFormat = printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

// const transportConfig: winston.transports.FileTransportOptions = {
//     zippedArchive:true,
//     maxsize:1,
//     maxFiles:50,
//     filename:'application-%DATE%.log'
// }

const transport : DailyRotateFile = new DailyRotateFile({
    level:'info',
    datePattern: 'YYYY-MM-DD-HH',
    auditFile:"logrotation.config.json",

    //Auto creates zip if max size is reached
    // zippedArchive:true,
    //Maximum file size upon which new log file is created
    maxSize:'3000k',
    //No. of days a log file must persist
    maxFiles:'14d',
    filename:'logs/application-%DATE%',
    extension:".log",
    utc:true
})

const config:winston.LoggerOptions ={
    //default log level
    level:"info",
    //format log message
    format:combine(
        //add a timestamp
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
        //add metadata
        metadata({ fillExcept: ['message', 'level', 'timestamp', 'label',] }), 
        printf((info)=>`[${info.timestamp}] ${info.level}: ${info.message}`),
        //aligns logs
        align(),
        // splat(),
        //output format
        json()
        ),
    transports:[
        transport
        // new winston.transports.Console(),
        // // new winston.transports.Console({
        // //     format:combine(logFormat)
        // // }),
        // new winston.transports.File({
        //     filename:`logs/${date.toDateString()}.log`,
        //     // format:combine(json())
        // })
    ]
}

export const winstonLogger = winston.createLogger(config)