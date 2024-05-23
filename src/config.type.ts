

export type IConfig = {
    API_KEY: string,
    jwt_secret: string,
    TELEGRAM_TOKEN: string,
    port: number,
    postgres: {
        port: number,
        host: string
    },
    mongo_host: string
    
}