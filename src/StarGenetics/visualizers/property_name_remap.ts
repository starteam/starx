export class Remapper {
    static capitalize(str:string):string {
        return str[0].toUpperCase() + str.substr(1);
    }

    static transform(input:string):string {
        if (input == 'bodycolor') {
            return 'Body color';
        }
        if (input == 'Bodycolor') {
            return 'Body color';
        }
        return Remapper.capitalize(input);
    }

}