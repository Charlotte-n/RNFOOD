export interface GetDailyIntakeData {
    birth: string
    exercise: string | number
    fat?: number
    gym: string | number
    height: string | number
    sex: string | number
    target: string | number
    userid: string | number
    weight: string | number
}

export interface ResponseDailyIntake {
    cellulose: number
    calories: number
    fat: number
    carbohydrate: number
    protein: number
}
