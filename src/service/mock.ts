import { faker } from '@faker-js/faker';


const resolve = (r: any) => Promise.resolve(r)

export const query = () => {
  const randomName = faker.name.fullName();
  const randomEmail = faker.internet.email();

  const data = {
    name: randomName,
    email: randomEmail,
  }

  return resolve(data)
}
