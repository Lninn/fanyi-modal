import { faker } from '@faker-js/faker';

function resolve<T>(response: T) {
  return Promise.resolve(response);
}

export const query = () => {
  const randomName = faker.name.fullName();
  const randomEmail = faker.internet.email();

  const data = {
    name: randomName,
    email: randomEmail,
  };

  return resolve(data);
};
