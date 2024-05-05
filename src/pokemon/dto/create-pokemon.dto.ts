import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator"

export class CreatePokemonDto {
    @IsInt({message:'nro deberia ser entero'})
    @IsPositive()
    @Min(1)
    nro:number

    @IsString()
    @MinLength(1)
    name:string 
} 
