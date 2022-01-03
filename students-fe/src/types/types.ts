export type Student = {
    id: number,
    firstName: string,
    lastName: string,
    email: string
}

export type ApiResponse = {
    data: Student[]
}