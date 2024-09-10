export default interface CourseInterface{
    id: number;
    title: string;
    created_at?:string;
}

export interface CourseFormInterface{
    id?: number;
    title?: string;
}

export interface CourseValidationError{
    title?:string;
}