import { TransItem } from "@/type";
import { log } from "@/utils";
import * as Realm from "realm-web";


// https://cloud.mongodb.com/v2#/org/62eea0aa00fc641fee06bf87/projects

interface IWord {
  from: string;
  to: string;
  created_at: number;
}

const login = async () => {
  const APP_ID = "words-app-cupww"
  const app = new Realm.App({ id: APP_ID })
  
  const credentials = Realm.Credentials.anonymous()
  const user = await app.logIn(credentials)

  return user
}

let user: Realm.User | null = null
const getUser = async () => {
  if (!user) {
    user = await login()
  }

  return user
}

export const saveWord = async (transItem: TransItem) => {
  try {
    const doc: IWord = {
      from: transItem.src,
      to: transItem.dst,
      created_at: new Date().getTime(),
    }

    const user = await getUser()

    await user.functions.saveWord(doc);
  } catch (err: any) {
    log.err("[saveWord] " + err.message)
  }
}

export const queryWords = async () => {
  try {
    const user = await getUser()

    const result = await user.functions.queryWords();
    
    return result
  } catch (err) {
    console.error(err)
  }
}
