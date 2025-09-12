import { AuthorityModel } from "../../profile/model/authority.model";
import { SocialNetworkModel } from "./social-network.model";

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
    address: string;
    city: string;
    country: string;
    postal_code: number;
    active: boolean;
    authorities: AuthorityModel[];
    enterprise_name: string;
    enterprise_id: number;
    profiles: AuthorityModel[];
    social_networks: SocialNetworkModel[];
}
