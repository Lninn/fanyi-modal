import { test, expect } from 'vitest'

import { createDoc, creatTransItemList } from '../Document'

test('create Chinese document', () => {
  const doc = createDoc('cn')

  expect(doc).toMatchInlineSnapshot(`
    {
      "lang": "cn",
      "text": "该达这期主些因识个即气深无至书情技。局好照交热得一气效问些外许。标段叫写温很许转她边头价之。",
    }
  `)
})

test('create English document', () => {
  const doc = createDoc('en')

  expect(doc).toMatchInlineSnapshot(`
    {
      "lang": "en",
      "text": "Dolorem sunt blanditiis quis itaque dolores reiciendis commodi. Dolorem numquam alias nesciunt dignissimos est iusto. Voluptatem ut est quasi blanditiis et sunt voluptatibus. Consequuntur nisi vel in. Numquam maiores totam expedita non qui.",
    }
  `)
})

test('create transItem list', () => {
  const list = creatTransItemList()

  expect(list).toMatchInlineSnapshot(`
    [
      {
        "dst": "taxicab",
        "src": "素",
      },
      {
        "dst": "ligand",
        "src": "温",
      },
      {
        "dst": "casino",
        "src": "表",
      },
      {
        "dst": "polish",
        "src": "群",
      },
      {
        "dst": "fingerling",
        "src": "地",
      },
      {
        "dst": "swimming",
        "src": "联",
      },
      {
        "dst": "running",
        "src": "据",
      },
      {
        "dst": "repair",
        "src": "口",
      },
      {
        "dst": "beancurd",
        "src": "记",
      },
      {
        "dst": "motion",
        "src": "该",
      },
      {
        "dst": "bootee",
        "src": "活",
      },
      {
        "dst": "psychoanalyst",
        "src": "部",
      },
      {
        "dst": "vice",
        "src": "系",
      },
      {
        "dst": "bomber",
        "src": "公",
      },
      {
        "dst": "wasp",
        "src": "水",
      },
    ]
  `)
})
