'use client'

import React from 'react'
import useSWR from 'swr'
import fetcher from '../utils/fefchMessages'

function MessageList() {
	const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)

	return <div>MessageList</div>
}

export default MessageList
