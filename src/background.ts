console.log('background.js ...')

import {
  COMMEND_ID,
  CONTENT_LOAD,
  TRANSLATE_START,
  TRANSLATE_END,
  TRANSLATE_ERROR,
} from './action'
import { createTranslateUrl } from './baidu'
import { saveWord } from '@/service'
import { debug } from './utils'


const getCurrentTabId = async () => {
  const queryInfo = {
    active: true,
    currentWindow: true,
  }

  const tabs = await chrome.tabs.query(queryInfo)

  const [tab] = tabs

  if (tab) {
    return tab.id
  } else {
    return null
  }
}

interface Payload {
  type: string
}

const syncToCurrentTab = async (payload: Payload) => {
  const id = await getCurrentTabId()

  if (!id) return

  try {
    const result = await chrome.tabs.sendMessage(id, payload)
    debug('syncToCurrentTab ', result)
  } catch(err) {
    debug('syncToCurrentTab', err)
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create( {
    title: COMMEND_ID + ' "%s"',
    id: COMMEND_ID,
    contexts: ['selection'],
  })
})

chrome.contextMenus.onClicked.addListener(
  function(evt) {
    if (evt.menuItemId === COMMEND_ID) {
      debug('context click ', COMMEND_ID)

      const url = createTranslateUrl(evt.selectionText)
      syncToCurrentTab({ type: TRANSLATE_START })
  
      fetch(url)
        .then(res => res.json())
        .then(res => {
          if (res.error_code === '54001' || res.error_code === '52003') {
            console.log('ERROR ', res.error_msg)
            return
          }
  
          const { trans_result } = res
  
          const p = {
            type: TRANSLATE_END,
            payload: trans_result[0]
          }
          syncToCurrentTab(p)
          saveWord({
            from: p.payload.src,
            to: p.payload.dst,
            created_at: new Date().getTime()
          })
        })
        .catch(err => {
          console.error(err)
  
          syncToCurrentTab({ type: TRANSLATE_ERROR })
        })
    }
  }
)

chrome.runtime.onMessage.addListener(
  function(message, _, sendResponse) {
    switch (message.type) {
      case CONTENT_LOAD:
        debug('content.js is load ')
        break
    }

    sendResponse(true)
  }
)
