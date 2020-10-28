import Image from "next/image";
import Link from "next/link";
import Unsplash from "unsplash-js";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.scss";

const Collection = ({ photos }) => {
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
