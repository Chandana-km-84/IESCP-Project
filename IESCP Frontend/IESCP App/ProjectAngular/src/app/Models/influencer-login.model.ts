export interface InfluencerLoginModel{
    userName:string,
    password:string
}
export interface InfluencerLoginResponse{
    token?: string,
    success: boolean,
    message?: string
}
export interface InfluencerSignupModel
{
    userName: string,
    password: string,
    email: string,
    phoneNumber: string,
    influencerName: string,
    category: string,
    niche: string,
    reach: string
}

export interface InfluencerSignupResponse{
    success: boolean,
    message: string
}