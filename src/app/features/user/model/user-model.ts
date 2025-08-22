import { AuthorityModel } from "./authority.model";

export interface UserModel {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    display_name: string;
    password?: string;
    cel: string;
    email: string;
    genre: string;
    active: boolean;
    authorities: AuthorityModel[];
    enterprise_name: string;
    enterprise_id: number;
    profiles: AuthorityModel[];
}
