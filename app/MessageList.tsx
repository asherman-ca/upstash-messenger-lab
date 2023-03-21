'use client'

import React, { useEffect } from 'react'
import useSWR from 'swr'
import { clientPusher } from '../pusher'
import { Message } from '../typings'
import fetcher from '../utils/fefchMessages'
import MessageComponent from './MessageComponent'

function MessageList() {
	const {
		data: messages,
		error,
		mutate,
	} = useSWR<Message[]>('/api/getMessages', fetcher)

	useEffect(() => {
		const channel = clientPusher.subscribe('messages')

		channel.bind('new-message', async (data: Message) => {
			// check if the new message is from us to prevent duplicate
			if (messages?.find((message) => message.id === data.id)) return

			if (!messages) {
				mutate(fetcher)
			} else {
				mutate(fetcher, {
					optimisticData: [...messages!, data],
					rollbackOnError: true,
				})
			}
		})

		return () => {
			channel.unbind_all()
			channel.unsubscribe()
		}
	}, [messages, mutate, clientPusher])

	return (
		<div className='space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xp mx-auto'>
			{messages?.map((message) => (
				<MessageComponent key={message.id} message={message} />
			))}
		</div>
	)
}

export default MessageList
