import { getProviders } from 'next-auth/react'
import Image from 'next/image'
import SignInComponent from './SignInComponent'

async function page() {
	const providers = await getProviders()

	return (
		<div className='flex flex-col items-center'>
			<div>
				<Image
					className='rounded-full object-cover'
					width={700}
					height={700}
					src='https://links.papareact.com/161'
					alt='profile picture'
				/>
			</div>

			<SignInComponent providers={providers} />
		</div>
	)
}

export default page
