import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    ConfigModule, //importamos para el uso de variables de entorno desde el servicio config
    MongooseModule.forFeature([
     {
      name:Pokemon.name,
      schema:PokemonSchema
     }
    ])
  ],
  exports:[MongooseModule] //exportamos para manejar el modelo
})
export class PokemonModule {}
