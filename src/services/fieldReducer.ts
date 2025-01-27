import { Field } from "../classes/Field";
import {ITile,IAction, ActionType} from "../interfaces";

export function fieldReducer(field:Field,action:IAction):Field
{
    const {actType,actRow,actCol}=action;
    switch(actType)
    {
        case ActionType.discoverCell:
            var newField=Field.copyField(field);
            newField.matrix[actRow][actCol].isDiscovered=true;
            if(newField.matrix[actRow][actCol].isMine)
                alert("You Lost!");
            return newField;
        case ActionType.resetField:
            var newField=new Field(field.width,field.height,field.mineCount);
            return newField;
    }
    return field;
}