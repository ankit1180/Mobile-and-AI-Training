import { Model } from "@nozbe/watermelondb";
import { field, date,readonly } from '@nozbe/watermelondb/decorators'

export default class Note extends Model{
    static table = 'notes';
    @field('note') note;
    @field('description') description;
    @readonly @date('Created_At') created_At;
    
}


