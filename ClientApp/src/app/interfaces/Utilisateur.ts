export interface Utilisateur {

    id : string;
    username: string;
    password: string;
    email: string;
    type : number;
    nom: string;
    categories: number[];
    
}

export  var TypeOptions = ['Administrateur', 'Speciale', 'Normale'];