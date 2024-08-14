export interface Variable {
    id : number
    nom : string
    formule : string
    publier : boolean
    type : number
    nature : number
    username : string
    categories: number[];
}

export var NatureVarOptions=['DATE', 'NOMBRE' , 'TEXTE' ,'IMAGE']
export var TypeVarOptions=[ 'Calculable', 'Simple' ]