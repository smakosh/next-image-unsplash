import Image from "next/image";
import Link from "next/link";
import Unsplash from "unsplash-js";

const Index = ({ collections }) => (
	<div
		style={{
			maxWidth: 960,
			margin: "0 auto",
			display: "flex",
			justifyContent: "center",
			flexDirection: "column",
			alignItems: "center",
		}}
	>
		{collections.map(({ id, title, cover_photo }) => (
			<div
				key={id}
				style={{
					marginBottom: 50,
					width: 500,
				}}
			>
				<Link href={`/collection/${id}`}>
					<a
						style={{
							margin: "2rem 0",
							fontSize: 16,
							display: "block",
							fontWeight: "bold",
							textDecoration: "underline",
							color: "tomato",
						}}
					>
						{title}
					</a>
				</Link>
				<Image
					src={cover_photo.urls.full}
					width={cover_photo.width}
					height={cover_photo.height}
				/>
			</div>
		))}
	</div>
);

export default Index;

export const getStaticProps = async () => {
	const unsplash = new Unsplash({ accessKey: process.env.APP_ACCESS_KEY });

	const data = await unsplash.users.collections("smakosh");
	const collections = await data.json();

	return {
		props: {
			collections,
		},
		revalidate: 2,
	};
};
