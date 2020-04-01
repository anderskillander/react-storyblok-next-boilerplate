/* 🌈 This is the client side 🌈*/

/* dependencies */
import fetch from "isomorphic-unfetch";
import Link from 'next/link';
/* layout */
import DefaultLayout from "../components/layouts/DefaultLayout";

/* components */
import HeadlineModule from "../components/modules/HeadlineModule";
import ParagraphModule from "../components/modules/ParagraphModule";
import ImageModule from "../components/modules/ImageModule";


/* Helper function to fetch data - do we need this as an extra function? Debatable. 😊 */
function fetchUrl(url) {
  return fetch(url).then(r => r.json());
}

/* This route gets hit when our user appends a slug to
the url and therefore the page request, e.g. your-site.com/about */
const SlugPage = ({ data }) => {
  const { content } = data;
  const headlineModuleData = content.body.find(
    (item) => item.component === "Headline Module"
  );
  const paragraphModuleData = content.body.find(
    (item) => item.component === "Paragraph Module"
  );
  console.log(`🌈 I am getting this content from Storybok`);
  console.log(content);
  /* ---- */
  return (
    <DefaultLayout>
      {/* <h3>This is what you are getting back from Storyblok:</h3> */}
      {headlineModuleData ? (
        <HeadlineModule title={headlineModuleData.title} />
      ) : null}
      {paragraphModuleData ? (
        <ParagraphModule copy={paragraphModuleData.text} />
      ) : null}

    </DefaultLayout>
  );
};


/* Before rendering, we are calling our internal API endpoint (server).
This call is hitting the code we wrote in 'pages/api/page/[slug].js' */
SlugPage.getInitialProps = async ({ query }) => {
  /* {query} is an object we receive within this method from Next,
	so that we can retrieve the slug (e.g. '/welcome') coming with the route */
  const { page } = query;
  /* Calling our internal api endpoint so that we can fetch Storyblok content
	server-side (we are on client-side here) */
  const data = await fetchUrl(`http://localhost:3000/api/page/${page}`);
  /* Returning the data back into SlugPage as props */
  return { data }; /* This is the same as { data: data } */
};

export default SlugPage;