import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class Authservice{
    client = new Client();

    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteprojectid);
        this.account = new Account(this.client);
    }

    async createaccount({email,password,name}){
        try{
            const useraccount = await this.account.create({userID:ID.unique(),email,password,name});
            if(useraccount){
                return this.login({email,password});
            }
            else{
                return useraccount;
            }
        }catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession({email,password})
        } catch (error) {
            throw error;
        }
    }

    async currentuser(){
        try{
            return await this.account.get();
        }catch(error){
            throw error;
        }

        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }
};

const authservice = new Authservice();

export default authservice;
