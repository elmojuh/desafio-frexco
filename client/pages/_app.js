import GlobalStyle from "../src/components/Theme/globalStyle";
import Head from "../src/components/Head/head";


function MyApp({Component, pageProps}){
    return (
        <>
            <Head/>
            <Component {...pageProps}/>
            <GlobalStyle/>
        </>
    )

}
export default MyApp;