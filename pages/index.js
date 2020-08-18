import Head from "next/head";
import styles from "../styles/Home.module.css";


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Redach</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Redach</h1>

        <p className={styles.description}>True avatar redactor</p>

        <a className={styles.link} href="/builder">Build your avatar</a>
      </main>
    </div>
  );
}
