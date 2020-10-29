import { GetStaticPropsContext } from "next";
// import Image from "../../components/Image";
// import { Blurhash } from "react-blurhash";
import Image from "next/image";
import Link from "next/link";
import Unsplash from "unsplash-js";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.scss";

interface CollectionProps {
	photos: {
		id: string;
		urls: { full: string };
		width: number;
		height: number;
		// blur_hash: string;
	}[];
}

const Collection = ({ photos }: CollectionProps) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<Link href="/">
				<a className={styles.link}>Go back</a>
			</Link>
			{photos.map(({ id, urls, width, height }) => (
				<div key={id} className={styles.card}>
					<Image
						src={urls.full}
						width={width}
						height={height}
					// placeholder={
					// 	<Blurhash
					// 		hash={blur_hash}
					// 		width={500}
					// 		height={350}
					// 		resolutionX={32}
					// 		resolutionY={32}
					// 		punch={1}
					// 	/>
					// }
					/>
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

export const getStaticProps = async (
	ctx: GetStaticPropsContext<{ id: string }>
) => {
	if (!ctx.params?.id) {
		throw new Error("id missing");
	}

	const unsplash = new Unsplash({
		accessKey: process.env.APP_ACCESS_KEY || "",
	});

	const data = await unsplash.collections.getCollectionPhotos(
		parseInt(ctx.params.id, 10)
	);
	const photos = await data.json();

	return {
		props: {
			photos,
		},
		revalidate: 2,
	};
};
