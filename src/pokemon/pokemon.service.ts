import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit; //variables de entorno como servicio

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,
    private readonly configService:ConfigService //variables de entorno como servicio
  ){
    this.defaultLimit=this.configService.get('defaultLimit'); //variables de entorno como servicio
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name =  createPokemonDto.name.toLocaleLowerCase();
    try{
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    }
    catch(error){
      this.handleException(error);
    }
  }

  findAll(data:PaginationDto) {

    const {limit=this.defaultLimit, offset=0} = data
    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      nro:1 //se ordena por numero
    })
    .select('-__v') //quitamos esta propiedad
    ;
  }

  async findOne(term: string) {
    let pokemon:Pokemon;

    if(!isNaN(+term)){ //busqueda por nro
      pokemon = await this.pokemonModel.findOne({nro:term});
    }
    if(!pokemon && isValidObjectId(term)){ //busqueda por id
      pokemon = await this.pokemonModel.findById(term);
    }
    if(!pokemon){ //busqueda por nombre de pokemon
      pokemon = await this.pokemonModel.findOne({name:term.toLocaleLowerCase()});
    }
    if(!pokemon)
      throw new NotFoundException(`Pokemon with id, nro or name "${term}" not found`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if(updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

   try{
    await pokemon.updateOne(updatePokemonDto, {new:true});
     return {
        ...pokemon.toJSON(),
        ...updatePokemonDto
    } 
    }
    catch(error){
       this.handleException(error);
      }
    }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // return {id};

    //const result = await this.pokemonModel.findByIdAndDelete(id);//busca por id y lo elimina(en realidad no nos notifica si lo encuentra, igual elimina aunq no exista)
    const {deletedCount} = await this.pokemonModel.deleteOne({_id:id}); //elimina por id, sin embargo en deletedCount encontramos cuantos registros se eliminó
    if(deletedCount == 0)
      throw new BadRequestException(`Pokemon with id ${id} not found`);

    return ;
  }

  handleException(error){
    if(error.code = 11000)
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue) }`);
    
    console.log(error);
    throw new InternalServerErrorException(error);  
  }
}
