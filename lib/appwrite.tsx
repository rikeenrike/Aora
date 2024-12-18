import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.rke.aora',
    projectId: '675d0ab000222ac56b6d',
    databaseId: '675d0be3000e5af0cb11',
    usercollectionId: '675d0bf5003354b68e3d',
    videocollectionId: '675d0c0b002fc2adb41c',
    storageId: '675d0d0a000e58fe41e1'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    usercollectionId,
    videocollectionId,
    storageId
} = config;

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


export const createAccount = async (email: string, password: string, name: string) => {

    try {

        const newAccount = await account.create(ID.unique(), email, password, name);

        const avatarURL = avatars.getInitials(name);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.usercollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username : name,
                avatar: avatarURL
            }
        );

        return newUser;

    } catch (e) {
        console.log(e)
    }

}

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;

    } catch (e) {
        console.log(e)
    }
}

export const getCurrentUser = async () => {
    try {
        const user = await account.get();

        if (!user) throw new Error("User not found");

        const query = [Query.equal('accountId', user.$id)];

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.usercollectionId,
            query
        );

        if (!currentUser) throw new Error("Current user not found");

        return currentUser.documents[0]; 

    } catch (e) {
        console.log("Error:", e);
        return null; 
    }
}

export const getallPost = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videocollectionId);

        return posts.documents;

    } catch (e) {
        console.log(e);
    }
}

export const getLatestPost = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videocollectionId, [Query.orderDesc('$createdAt'), Query.limit(7)]);

        return posts.documents;

    } catch (e) {
        console.log(e);
    }
}

export const searchPosts = async (query: any) => {

    console.log("Query:", query);
    try {
        const posts = await databases.listDocuments(databaseId, videocollectionId, [Query.search('title', query)]);

        return posts.documents;

    } catch (e) {
        console.log(e);
    }
}