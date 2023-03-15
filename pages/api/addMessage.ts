// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis'
import { Message } from '../../typings'

type Data = {
	message: Message
}

type ErrorData = {
	name: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | ErrorData>
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ name: 'Method not allowed' })
	}

	const { message } = req.body

	const newMessage = {
		...message,
		created_at: Date.now(),
	}

	// push to upstash db

	await redis.hset('messages', message.id, JSON.stringify(newMessage))

	res.status(200).json({ message: newMessage })
}
