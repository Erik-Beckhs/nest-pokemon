import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose';

@Schema()
export class Pokemon extends Document {
    //el modelado tiene q ver con la bd, con las propiedades que llevaran los documentos
    @Prop({
        unique : true,
        index : true
    })
    name:string

    @Prop({
        unique : true,
        index : true
    })
    nro:number
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
