import conf from '../conf/conf.js';
import {Client, Account, ID} from 'appwrite';

// class for defining Authentication services
export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(client);
    }

    //async method to create account
    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);

            if(userAccount){
                return this.login({email,password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }       
    }

    //async method to login
    async login(email,password){
        try {
            return await account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    //async method to get currentuser details
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }

    //async method to logout user
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error)
        }
    }

}

//object of AuthService class
const authservice = new AuthService(); 

export default authservice;