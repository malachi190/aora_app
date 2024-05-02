import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aora.app",
  projectId: "662436427e5d21fc90b4",
  databaseId: "6624389613ecb44cdb70",
  userCollectionId: "662438c2a017c7a0ad81",
  videoCollectionId: "66243904f1063ba61608",
  storageId: "66243bb518af0864d389",
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const db = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
  try {
    const newUser = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newUser) throw new Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const addUserToDb = await db.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newUser.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return addUserToDb;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = account.get();

    if(!currentAccount) throw new Error;

    const currentUser = await db.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw new Error;

    return currentUser.documents[0]
  } catch (error) {
      console.log(error);
  }
}
