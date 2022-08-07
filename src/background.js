import {
  COMMEND_ID,
  CONTENT_LOAD,
  TRANSLATE_START,
  TRANSLATE_END,
  TRANSLATE_ERROR,
} from './action'
import { createTranslateUrl } from './baidu-setup'

import { syncToDb } from './db'

class Demo {
  currentActiveTabId = null

  constructor() {
    chrome.contextMenus.create( {
      title: COMMEND_ID + ' "%s"',
      id: COMMEND_ID,
      contexts: ['selection'],
    })

    chrome.runtime.onMessage.addListener(
      this.onRuntimeMessage.bind(this)
    )
    chrome.contextMenus.onClicked.addListener(
      this.onContextMenusClick.bind(this)
    )
  }

  onRuntimeMessage(message, sender, sendResponse) {
    switch (message.type) {
      case CONTENT_LOAD:
        const { tab: { id } } = sender
        this.currentActiveTabId = id
        break
    }

    sendResponse(true)
  }

  onContextMenusClick(evt) {
    if (evt.menuItemId === COMMEND_ID) {
      const doc = { text: evt.selectionText }
      syncToDb(doc)
      
      const url = createTranslateUrl(evt.selectionText)
      this.sendToActiveTab({ type: TRANSLATE_START })

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
          this.sendToActiveTab(p)
        })
        .catch(err => {
          console.error(err)

          this.sendToActiveTab({ type: TRANSLATE_ERROR })
        })
    }
  }

  sendToActiveTab(payload) {
    if (!this.currentActiveTabId) return

    chrome.tabs.sendMessage(
      this.currentActiveTabId,
      payload,
      function() {
        if (!chrome.runtime.lastError) {
          console.log('error in chrome')
        }
      }
    )
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  new Demo()
})
