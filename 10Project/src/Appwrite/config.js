import conf from "../conf/conf";

import {Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;


    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteprojectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
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

    async getpost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            )
        } catch (error) {
            console.log("appwrite error :",error);
            return false;
        }
    }

    async getallposts(){
        try {
            return await this.databases.listDocuments(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            console.log("appwrite error :",error);
            return false;
        }
    }

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("appwrite error :",error);
            return false;
        }
    }

    async deletefile(fileid){
        try {
            await this.bucket.deleteFile(
                conf.appwritebucketid,
                fileid
            )
            return true;
        } catch (error) {
            console.log("appwrite error :",error);
        }
    }

    getfilepreview(fileid){
        return this.bucket.getFilePreview(
            conf.appwritebucketid,
            fileid
        )
    }


};

const service = new Service();

export default service;