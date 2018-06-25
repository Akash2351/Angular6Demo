import { PipeTransform, Pipe } from "@angular/core";


@Pipe({
    name: 'convertToSpacesPipe'
})
export class ConvertToSpacesPipe implements PipeTransform {
  
    transform(value: any,character: string ): string  {
        return value.replace(character, ' ');
    }

}