import { test, expect } from 'vitest'

import { createDoc } from '../Document'

test('create Chinese document', () => {
  const doc = createDoc('cn')

  expect(doc).toMatchInlineSnapshot(`
    {
      "lang": "cn",
      "text": "己当制为局价张过术共万世除和斗。至每度位技家育记进米过连原等。",
    }
  `)
})

test('create English document', () => {
  const doc = createDoc('en')

  expect(doc).toMatchInlineSnapshot(`
    {
      "lang": "en",
      "text": "Repellat beatae labore. Ut nostrum consequatur et aut possimus. Aut laborum ea similique fuga nihil et. Non et vel veritatis assumenda ipsam aut dolore. Ut ipsam dolorem.",
    }
  `)
})
