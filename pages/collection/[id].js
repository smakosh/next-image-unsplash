import Image from "next/image";
import Link from "next/link";
import Unsplash from "unsplash-js";
import { useRouter } from "next/router";

const Collection = ({ photos }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<div
			style={{
				padding: "2rem 0",
				maxWidth: 960,
				margin: "0 auto",
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Link href="/">
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
					Go back
				</a>
			</Link>
			{photos.map(({ id, urls, width, height }) => (
				<div
					key={id}
					style={{
						marginBottom: 50,
						width: 500,
					}}
				>
					<Image src={urls.full} width={width} height={height} />
				</div>
			))}
		</div>
	);
};

export default Collection;

export const getStaticPaths = async () => ({
	paths: [],
	fallback: true,
});

export const getStaticProps = async ({ params: { id } }) => {
	const unsplash = new Unsplash({ accessKey: process.env.APP_ACCESS_KEY });

	const data = await unsplash.collections.getCollectionPhotos(id);
	const photos = await data.json();

	return {
		props: {
			photos,
		},
		revalidate: 2,
	};
};
