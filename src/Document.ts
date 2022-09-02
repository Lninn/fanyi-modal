import { faker } from '@faker-js/faker'
import Mock from 'mockjs'
import {
  IDocument,
  Lang,
  TransItem,
} from './type'

export const mockWord = (
  lang: Lang,
) => {
  if (lang === 'CN') {
    return Mock.mock('@cword(3,5)')
  }

  if (lang === 'EN') {
    return faker.word.noun()
  }

  return ''
}

export const mockParagraph = (
  lang: Lang,
): string => {
  if (lang === 'CN') {
    return Mock.mock(
      '@cparagraph(1, 3)',
    )
  }

  if (lang === 'EN') {
    return faker.lorem.paragraph()
  }

  return ''
}

export const createDoc = (
  lang: Lang,
) => {
  const doc: IDocument = {
    lang,
    text: mockParagraph(lang),
  }

  return doc
}

export const createTransItem = () => {
  const item: TransItem = {
    src: mockWord('CN'),
    dst: mockWord('EN'),
  }

  return item
}

export const creatTransItemList =
  () => {
    const list = []

    let COUNT = 30

    while (COUNT > 0) {
      const item = createTransItem()
      list.push(item)

      COUNT--
    }

    return list
  }
