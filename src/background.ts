console.log('background.js ...')

import {
  COMMEND_ID,
  CONTENT_LOAD,
  TRANSLATE_START,
  TRANSLATE_END,
} from './action'
import { createTranslateUrl } from './baidu'
import { saveWord } from '@/service'


main()

function main() {
  chrome.runtime.onInstalled.addListener(() => {
    createContextMenus()
  })

  chrome.contextMenus.onClicked.addListener(
    handleContextMenuClick
  )

  chrome.runtime.onMessage.addListener(handleRuntimeMessage)
}

function createContextMenus() {
  const selectProperties: chrome.contextMenus.CreateProperties = {
    title: COMMEND_ID + ' "%s"',
    id: COMMEND_ID,
    contexts: ['selection'],
  };

  chrome.contextMenus.create(selectProperties, () => {
    console.log('context menus 创建成功')
  })
}

function handleContextMenuClick(evt: chrome.contextMenus.OnClickData) {
  if (evt.menuItemId === COMMEND_ID) {
    const queryText = evt.selectionText

    if (queryText) {
      handleTranslateClick(queryText)
    }
  }
}

function handleRuntimeMessage(
  message: any,
  _: any,
  sendResponse: (response?: any) => void,
) {
  switch (message.type) {
    case CONTENT_LOAD:
      console.log('content.js is load')
      break
  }

  sendResponse(true)
}

async function handleTranslateClick(queryText: string) {
  if (!queryText) {
    return
  }

  await sendToActiveTab({
    type: TRANSLATE_START
  })

  const url = createTranslateUrl(queryText)
  const result = await baiduQuery(url)

  if (!result || !result?.length) {
    return
  }

  const [item] = result

  sendToActiveTab({
    type: TRANSLATE_END,
    payload: item,
  })
  // saveWord({
  //   from: item.src,
  //   to: item.dst,
  //   created_at: new Date().getTime(),
  // })
}

async function baiduQuery(url: string) {
  try {
    const result = await fetch(url).then(r => r.json())

    if (result.error_code === '54001' || result.error_code === '52003') {
      console.error('[baiduQuery] ', result.error_msg)
      return
    }

    return result.trans_result
  } catch (error) {
    console.error(error)
  }
}

async function getActiveTab() {
  const queryInfo: chrome.tabs.QueryInfo = {
    active: true,
    currentWindow: true,
  }

  const tabs = await chrome.tabs.query(queryInfo)

  if (!tabs.length) return null

  const [tab] = tabs

  if (tab) {
    return tab
  } else {
    return null
  }
}

async function getActiveTabId() {
  const activeTab = await getActiveTab()

  if (activeTab) {
    return activeTab.id
  } else {
    return null
  }
}

async function sendToActiveTab(message: any) {
  const activeId = await getActiveTabId()

  if (!activeId) {
    return
  }

  try {
    const result = await chrome.tabs.sendMessage(activeId, message)
    console.log('[sendToActiveTab] ', result)
  } catch (error: any) {
    console.log('[sendToActiveTab] ', error.message)
  }
}
