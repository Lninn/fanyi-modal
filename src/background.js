import {
  COMMEND_ID,
  CONTENT_LOAD,
  TRANSLATE_START,
  TRANSLATE_END,
  TRANSLATE_ERROR,
} from './action'
import { createTranslateUrl } from './baidu-setup'
import { saveWord } from './db'


let currentActiveTabId = null

function sendToActiveTab(payload) {
  if (!currentActiveTabId) return

  chrome.tabs.sendMessage(
    currentActiveTabId,
    payload,
    function() {
      const err = chrome.runtime.lastError

      if (err) {
        console.log('[background] error ' + JSON.stringify(err))
      }
    }
  )
}

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create( {
    title: COMMEND_ID + ' "%s"',
    id: COMMEND_ID,
    contexts: ['selection'],
  })
  
  chrome.contextMenus.onClicked.addListener(
    function(evt) {
      if (evt.menuItemId === COMMEND_ID) {
        const url = createTranslateUrl(evt.selectionText)
        sendToActiveTab({ type: TRANSLATE_START })
    
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
            sendToActiveTab(p)
            saveWord({
              from: p.payload.src,
              to: p.payload.dst,
              created_at: new Date().getTime()
            })
          })
          .catch(err => {
            console.error(err)
    
            sendToActiveTab({ type: TRANSLATE_ERROR })
          })
      }
    }
  )
})

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    switch (message.type) {
      case CONTENT_LOAD:
        const { tab: { id } } = sender
        currentActiveTabId = id
        break
    }

    sendResponse(true)
  }
)
