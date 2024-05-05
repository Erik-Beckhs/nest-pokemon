import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {

  constructor(
    // private readonly pokemonsService:PokemonService
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>
  ){

  }

  async executeSeed() {
    const axiosInstance: AxiosInstance = axios.create(); // Crear una nueva instancia de Axios
    await this.pokemonModel.deleteMany({}) //eliminamos todos los pokemons

    // const pokemonInsertPromise  = [];//2da forma

    const pokemonToInsert:{name:string, nro:number}[] = []; //3era forma


    const {data} = await axiosInstance.get<any>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemons = data.results;

    pokemons.forEach(({name, url}) => {
      const segments = url.split('/');
      const nro = segments[segments.length - 2]; 

      // this.pokemonModel.create({nro, name}) //1era forma
      // this.pokemonsService.create({name, nro})
      // pokemonInsertPromise.push(this.pokemonModel.create({nro, name})) //2da forma

      pokemonToInsert.push({name, nro}) //3era forma
    });

    // await Promise.all(pokemonInsertPromise); //2da forma
    await this.pokemonModel.insertMany(pokemonToInsert);


    return `Seed executed`; // Devuelve solo los datos de la respuesta, no la respuesta completa
  }
}