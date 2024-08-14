export interface Modele {

id : number,
nom : string,
type:number,
publier : boolean,
categorieId : number,
contenu : string,
username : string
variables: number[];

}

export var TypeModeleOptions = [ 
    'LETTRE',
    'COURRIEL'
];