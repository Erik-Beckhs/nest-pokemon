import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './common/config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration]
    }), //para manejar las variables de entorno, preferentemente debe estar aqui arriba antes de mongoose module
    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'), //pagina estatica
    }),
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName:'pokemonDB' //este objeto lo añadimos para que el nombre de nuestra bd por default, se reflejara en railway
    }), //conexion a bd mongo
    PokemonModule, CommonModule, SeedModule,
  ],
    
})
export class AppModule {
  // constructor() 
  // {
  //   console.log(process.env.PORT)
  //   console.log(process.env.MONGODB)
  // }
}
