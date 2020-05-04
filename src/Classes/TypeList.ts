export type User = {
    activated: boolean,
    organization: string,
    firstName: string,
    lastName: string,
    name: string,
    designation: string,
    _id: string,
    email: string,
    city: string,
    county: string,
    serviceArea: string,
    photo: string
}

export type OptionsFiltersUser = {
        page: number,
        limit: number,
        name: string,
        organization: string,
        serviceArea: string,
        designation: string,
        sort: string
}

export type ProjectName = {
    _id: string,
    count: number
}

export type UserActivities = {
    currentPage: string
    data: UserActivity[]
    totalPages: number
}
export type UserActivity = {
    firstName: string
    lastName: string
    registerDate: string
    _id: string
    city: string,
    change: string,
    activityType: string
}