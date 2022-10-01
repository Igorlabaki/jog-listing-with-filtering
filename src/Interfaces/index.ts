import { User } from "@prisma/client"

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
export interface AuthLogin {
    email: string,
    username?: string,
    password: string,
    userType?: 'developer' | 'company' | ''
    level?: string
    area?: string
    country?: string,
    city?: string
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

export interface bodyUpdateJob {
    avatar: string,
    user: User,
    area: string,
    level: string,
    skillsList: string[],
    period: string,
    about: string,
    country: {
        country:string
        iso2:string 
        iso3:string
    },
    city: string
}