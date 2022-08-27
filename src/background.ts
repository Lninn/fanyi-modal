import { createTranslateUrl } from './baidu'
import { saveWord } from '@/service'
import { log } from './utils'
import { TransItem } from './type'
import { IMessage } from './action'


console.log('background.js ...')

const COMMEND_ID = 'COMMEND_ID'

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
    case '123':
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
    type: 'start'
  })

  const url = createTranslateUrl(queryText)
  const transItem = await baiduQuery(url)

  if (!transItem) {
    return
  }

  await sendToActiveTab({
    type: 'end',
    payload: transItem,
  })
  await saveWord(transItem)
}

async function baiduQuery(url: string) {
  try {
    const {
      error_code,
      error_msg,
      trans_result
    } = await fetch(url).then(r => r.json())

    if (error_code === '54001' || error_code === '52003') {
      log.err(error_msg)
      return null
    }

    const item: TransItem | null = trans_result[0]

    return item
  } catch (err: any) {
    log.err(err.message)
  }

  return null
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

async function sendToActiveTab(message: IMessage) {
  const activeId = await getActiveTabId()

  if (!activeId) {
    return
  }

  try {
    const result = await chrome.tabs.sendMessage(activeId, message)

    log.info('[sendToActiveTab] ' + result)
  } catch (error: any) {
    log.err('[sendToActiveTab] ' + error.message)
  }
}
