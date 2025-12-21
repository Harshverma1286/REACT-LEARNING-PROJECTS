import conf from "../conf/conf";

import {Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;


    constructor(){
        this.client.setEndpoint(appwriteUrl).setProject(appwriteprojectid);
        this.databases = new Databases(this.databases);
        this.bucket = new Storage(this.bucket);
    }


    async createpost({title,slug,content,featuredimage,status,userid}){
        try {
            return await this.databases.createDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid
                }
            )
        } catch (error) {
            console.log("appwrite error :",error);
        }
    }

    async updatepost(slug,{title,content,featuredimage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite error :",error);
        }
    }

    async deletepost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite error :",error);
            return false;
        }
    }

    
};

const service = new Service();

export default service;