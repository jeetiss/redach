import "../styles/globals.css";
import { usePageview } from "../utils";

function MyApp({ Component, pageProps }) {
  usePageview();

  return <Component {...pageProps} />;
}

export default MyApp;
