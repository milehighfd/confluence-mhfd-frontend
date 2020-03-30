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
    serviceArea: string
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