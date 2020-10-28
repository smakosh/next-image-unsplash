import { Blurhash } from "react-blurhash";
import { GetStaticProps } from "next";
import Link from "next/link";
import Unsplash from "unsplash-js";
import Image from "../components/Image";
import styles from "../styles/Home.module.scss";
import { FC } from "react";

interface Collections {
	collections: {
		id: string;
		title: string;
		cover_photo: {
			urls: { full: string };
			width: number;
			height: number;
			blur_hash: string;
		};
	}[];
}

const Index: FC<Collections> = ({ collections }) => (
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
							placeholder={
								<Blurhash
									hash={cover_photo.blur_hash}
									width={600}
									height={600}
									resolutionX={32}
									resolutionY={32}
									punch={1}
								/>
							}
						/>
					</a>
				</Link>
			</div>
		))}
	</div>
);

export default Index;

export const getStaticProps: GetStaticProps = async () => {
	const unsplash = new Unsplash({
		accessKey: process.env.APP_ACCESS_KEY || "",
	});

	const data = await unsplash.users.collections("smakosh");
	const collections = await data.json();

	return {
		props: {
			collections,
		},
		revalidate: 2,
	};
};
