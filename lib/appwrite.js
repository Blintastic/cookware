import { Client } from 'react-native-appwrite';
import { Account } from 'react-native-appwrite';
import { ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.kw.cookware',
    projectId: '6753613f000da8a3227d',
    databaseId: '67536294002ebad97250',
    videoCollectionId: '675362d30030ea6cfe9b',
    storageId: '675363f10020af4ffbac'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

    const account = new Account(client);

export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}
