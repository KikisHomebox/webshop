import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import StaticPage from '~/components/StaticPage/StaticPage';

const seo = ({data}) => ({
  title: `${data?.page?.title} | Kiki's home box`,
  description: data.page.body.includes('<p>')
    ? getMetaDescriptionText({pageHtml: data.page.body})
    : `This page is about ${data?.page?.title} in Kiki's Home Box.`,
});

export const handle = {
  seo,
};

function getMetaDescriptionText({pageHtml}) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = pageHtml;
  const pageText = tempElement.querySelector('p').innerText;
  return pageText.substring(0, 160);
}

export async function loader({params, context}) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  return json({page});
}

export default function Page() {
  const {page} = useLoaderData();

  return <StaticPage page={page} />;
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      handle
      body
      seo {
        description
        title
      }
    }
  }
`;
