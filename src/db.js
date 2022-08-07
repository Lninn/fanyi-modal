import * as Realm from "realm-web";


// https://cloud.mongodb.com/v2#/org/62eea0aa00fc641fee06bf87/projects

const login = async () => {
  const APP_ID = 'words-app-cupww'
  const app = new Realm.App({ id: APP_ID })
  
  const credentials = Realm.Credentials.anonymous()
  const user = await app.logIn(credentials)

  return user
}

let user = null
const getUser = async () => {
  if (!user) {
    user = await login()
  }

  return user
}

export const syncToDb = async (doc) => {
  try {
    const user = await getUser()

    await user.functions.addWord(doc);
  } catch (err) {
    console.error(err)
  }
}

export const queryWords = async () => {
  try {
    const user = await getUser()

    const result = await user.functions.getWords();
    
    return result
  } catch (err) {
    console.error(err)
  }
}
