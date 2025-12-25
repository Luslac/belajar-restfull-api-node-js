import winston from "winston";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({})
    ]
})

// Berguna untuk mencatat aktivitas dari aplikasi, better than console.log because its containt many fiture that console.log 
// doesnt have.