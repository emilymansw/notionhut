import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from "../utils/theme";
import Nav from '../components/Nav'



const MyApp = ({ Component, pageProps, apollo }) => {
  return (
    <ApolloProvider client={apollo}>
      <ChakraProvider theme={customTheme}>
        <Nav/>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);