'use client'
import { FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Message } from '../typings'

function ChatInput() {
	const [input, setInput] = useState('')
	const addMessage = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!input) return
		setInput('')
		const id = uuid()
		const message: Message = {
			id,
			message: input,
			created_at: Date.now(),
			username: 'Elon Musk',
			profilePic: 'https://links.papareact.com/jne',
			email: 'email@email.com',
		}

		const uploadMessageToUpstash = async () => {
			const data = await fetch('/api/addMessage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message }),
			})
		}
	}

	return (
		<form
			className='fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100'
			onSubmit={addMessage}
		>
			<input
				type='text'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder='Enter message here...'
				className='flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed'
			/>
			<button
				type='submit'
				disabled={!input}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disbaled:opacity-50 disabled:cursor-not-allowed'
			>
				send
			</button>
		</form>
	)
}

export default ChatInput
