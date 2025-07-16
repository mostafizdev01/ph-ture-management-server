import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE",
}


/// providers list 
/// how to user login 
/// 1. email, password
/// 2. google authencation, facebook, github etc authnercation


export interface IAuthProvider {
    provider: "google" | "credetials";  /// "Google", "Credential ===>> email and password"
    providerId: string;
}

/// create isAction enum

export enum isActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password ?: string;
    phone ?: string;
    picture ?: string;
    address ?: string;
    isDeleted ? : string;
    isActive ? : isActive;  // isActive a enum create kora hoise.
    isVerified ? : boolean;
    role: Role;   /// enum diye user er role create kora hoise.
    auths: IAuthProvider[]; // ekta user ki vabe login korse sei data IAuthProvider er mordhe rakha hoise.
    bookings ?: Types.ObjectId[]; // ekta user joto gula booking korese sob id or info gula ai array er mordhe rekhe dibo
    guides ? : Types.ObjectId[] /// ekta user k joto jon guide korse tader id of info gula ai array er mordhe rakha hobe.
}