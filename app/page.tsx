import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { Message } from '../typings'
import { getServerSession } from 'next-auth'

async function HomePage() {
	const session = await getServerSession()

	const data = await fetch(
		`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/getMessages`
	).then((res) => res.json())
	const messages: Message[] = data.messages

	return (
		<main>
			<MessageList initialMessages={messages} />
			<ChatInput session={session} />
		</main>
	)
}

export default HomePage
