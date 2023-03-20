import Image from 'next/image'

import { Message } from '../typings'

type Props = {
	message: Message
}

function MessageComponent({ message }: Props) {
	const isUser = true

	return (
		<div className={`flex w-fit items-center ${isUser && 'ml-auto'}`}>
			<div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
				<Image
					className='rounded-full mx-2'
					height={10}
					width={50}
					src={message.profilePic}
					alt='Profile picture'
				/>
			</div>

			<div>
				<p
					className={`text-[0.65rem] px-[2px] pb-[2px] ${
						isUser ? 'text-blue-400 text-right' : 'text-red-400'
					}`}
				>
					{message.username}
				</p>
				<div className={`flex items-end`}>
					<div
						className={`px-3 py-2 rounded-lg w-fit text-white ${
							isUser ? 'order-2 bg-blue-400 ml-auto' : 'bg-red-400'
						}`}
					>
						<p>{message.message}</p>
					</div>

					<p
						className={`text-[0.65rem] italic px-2 text-gray-300 ${
							isUser && 'text-right'
						}`}
					>
						{new Date(message.created_at).toLocaleString()}
					</p>
				</div>
			</div>
		</div>
	)
}

export default MessageComponent
