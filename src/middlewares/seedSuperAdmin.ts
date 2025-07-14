import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import  bcrypt from 'bcryptjs'


export const seedSuperAdmin = async () => {
    try{
     const isSuperAdminExist = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})

     if(isSuperAdminExist){
        console.log("Super Admin Already Exists!");
        return;
     }

     console.log("Trying to create Super Admin...");
     

     const hashedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASS, Number(envVars.BCRYPT_SALT_ROUND))

     const authProvider: IAuthProvider = {
        provider: "credetials",
        providerId: envVars.SUPER_ADMIN_EMAIL
     }

     const payload : IUser = {
        name: "Super admin",
        role : Role.SUPER_ADMIN,
        email: envVars.SUPER_ADMIN_EMAIL,
        password: hashedPassword,
        isVerified: true,
        auths: [authProvider]
     }

     const superAdmin = await User.create(payload)
     console.log("Super Admin Created Successfuly!");
     return superAdmin;
    }
    catch(error){
        console.log(error);
        
    }
}