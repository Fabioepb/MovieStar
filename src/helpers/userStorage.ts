import { NativeStorage } from "@ionic-native/native-storage";
import { Injectable } from '@angular/core';

@Injectable()
export class UserStorage {
    constructor(
        public stg: NativeStorage
    ) {}

    async getUser(username:string): Promise<any> {
        try {
            let user = await this.stg.getItem(username);
            return user;
        } catch(err) {
            throw err;
        }
    }
    
    async getValue({ username, key }): Promise<any> {
        try {
            let user = await this.stg.getItem(username);
            return user[key];
        } catch(err) {
            throw err;
        }
    }

    async setUser({ username, user }):Promise<void> {
        try {
            await this.stg.setItem(username, user);
        } catch(err) {
            throw err;
        }
    }

    async setValue({username, values}):Promise<void> {
        try {
            let user = await this.stg.getItem(username);
            return await this.stg.setItem(username, { ...user, ...values });
        } catch(err) {
            throw err;
        }
    }
}