import { faker } from '@faker-js/faker';
import Mock from 'mockjs';
import { IDocument, Lang } from './type';


const mockParagraph = (lang: Lang): string => {
  if (lang === 'cn') {
    return Mock.mock('@cparagraph(1, 3)')
  }

  if (lang === 'en') {
    return faker.lorem.paragraph()
  }

  return ''
}

export const createDoc = (lang: Lang) => {
  const doc: IDocument = {
    lang,
    text: mockParagraph(lang)
  }

  return doc
}
