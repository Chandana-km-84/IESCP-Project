export interface sponsorLoginModel{
    userName:string,
    password:string
}
export interface sponsorLoginResponse{
    token:string,
    success:string,
    message?:string
}
export interface sponsorSignupModel
{
    userName: string,
    password: string,
    email: string,
    phoneNumber: string,
    sponsorName: string,
    industry: string,
    company: string
}
export interface sponsorEditprofileModel
{
    email: string,
    phoneNumber:string,
    sponsorName: string,
    category: string,
    niche: string,
    reach: number
}
// export interface SponsorProfileModel {
//     sponsorName: string;
//     industry: string;
//     budget: number;
//     company: string;
//     isApproved: boolean;
//     website: string | null;
//     userId: number;
//     userName: string;
//     password: string;
//     email: string;
//     phoneNumber: string;
//     role: number;
//     profilePictureUrl: string;
//     isFlagged: boolean;
//   }





