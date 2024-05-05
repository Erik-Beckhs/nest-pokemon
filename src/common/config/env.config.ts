export const EnvConfiguration = ()=>({ //cuando ponemos ({...}) es para que retorne
    environment:process.env.NODE_ENV || 'dev',
    mongodb:process.env.MONGODB,
    port:process.env.PORT || 3001,
    defaultLimit:process.env.DEFAULT_LIMIT || 7
})