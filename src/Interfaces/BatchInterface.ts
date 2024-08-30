export default interface BatchInterface{
    id: number;
    year: string;
    created_at?:string;
}

export interface BatchFormInterface{
    id?: number;
    year?: string;
}