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
    skills: string[]
}

export interface User{
    id: string;
    name: string;
    email: string;
    avatar: string;
    skills: string[];
    periods: string[];
    levels: string[];
    areas: string[];
}

  