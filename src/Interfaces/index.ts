export interface Job{
    id:string,
    company: string,
    job_title:string,
    create_at: string,
    period:string,
    region: string,
    image: string,
    new: boolean,
    featured: boolean,
    skills: Array<string>[]
}