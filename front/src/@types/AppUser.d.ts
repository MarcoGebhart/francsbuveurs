export default interface IAppUser {
    id: number;
    email: string;
    role: "user" |"admin";
}