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
    password:string,
    avatar: string;
    skills: string[];
    periods: string[];
    levels: string[];
    areas: string[];
    token:string
}

export interface AuthLogin {
    email: string,
    username?: string,
    password: string,
    typeAccount?: 'developer' | 'company'
    level?: string
    area?: string
}

export interface ErrorAuth {
    field: string
    message:string
}

export interface CountriesCityies{
    iso2: string
    iso3: string
    cities: String[]
    country: string
}