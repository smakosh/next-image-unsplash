import Image from "next/image";
import Link from "next/link";
import Unsplash from "unsplash-js";
import styles from "../styles/Home.module.scss";

const Index = ({ collections }) => (
	<div className={styles.container}>
		{collections.map(({ id, title, cover_photo }) => (
			<div key={id} className={styles.card}>
				<Link href={`/collection/${id}`}>
					<a className={styles.link}>{title}</a>
				</Link>
				<Link href={`/collection/${id}`}>
					<a>
						<Image
							src={cover_photo.urls.full}
							width={cover_photo.width}
							height={cover_photo.height}
						/>
					</a>
				</Link>
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
