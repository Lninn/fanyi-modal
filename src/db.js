import * as Realm from "realm-web";


// https://cloud.mongodb.com/v2#/org/62eea0aa00fc641fee06bf87/projects

export const syncToDb = async (doc) => {
  const APP_ID = 'words-app-cupww'
  const app = new Realm.App({ id: APP_ID });
  
  const credentials = Realm.Credentials.anonymous();

  try {
    const user = await app.logIn(credentials);

    await user.functions.addWord(doc);
  } catch (err) {
    console.error(err)
  }
}

