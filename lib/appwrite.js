import {
  Account,
  ID,
  Client,
  Databases,
  Query,
  Avatars,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.oceeboy.OceeWorldHub",
  projectId: "668efc88000037db2bc5",
  databaseId: "6690233d00021b3e5609",
  userCollectionId: "6690237c0013c89d3a01",
  storageId: "6690281d000f67ce595d",
  cartCollectionId: "66904da3000490e96dab",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

export async function createUser(email, password, name) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(name);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        name: name,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const saveCartToDatabase = async (userId, cartItems) => {
  try {
    const document = await databases.createDocument(
      config.databaseId,
      config.cartCollectionId,
      ID.unique(),
      {
        userId,
        cartItems,
      }
    );
    return document;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCartFromDatabase = async (userId) => {
  try {
    const cartData = await databases.listDocuments(
      config.databaseId,
      config.cartCollectionId,
      [Query.equal("userId", userId)]
    );
    return cartData.documents[0]?.cartItems || [];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
