import { Client, Databases} from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.kw.cookware',
    projectId: '6753613f000da8a3227d',
    databaseId: '67536294002ebad97250',
    videoCollectionId: '675362d30030ea6cfe9b',
    recipesCollectionId: '6761678d0011beb46a06',
    storageId: '675363f10020af4ffbac'
}

//Appwrite Client Setup
const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const databases = new Databases(client);



