import {
  GetStaticComponentProps,
  useComponentProps,
  constants,
  GraphQLRequestClient,
  GetServerSideComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useState } from 'react';
import {
  SearchDocument,
  AppRoute,
  Item,
  GraphQlConnectedDemo as GrapQLConnectedDemoDatasource,
} from './Search/query.graphql';
import { ComponentProps } from 'lib/component-props';
import config from 'temp/config';
type RouteItem = AppRoute & Item;

type GraphQLConnectedDemoData = {
  datasource: GrapQLConnectedDemoDatasource;
  contextItem: RouteItem;
};

const Search = (props: ComponentProps): JSX.Element => {
  const [message, setMessage] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };

  const externalData = useComponentProps<GraphQLConnectedDemoData>(props.rendering.uid);
  //console.log('graphQL Data ' + externalData.search.total.results.length());
  // useEffect(() => {
  //   resetEditorChromes();
  // }, []);
  async function SearchData() {
    alert(message);
    try {
      const postQueryData = await fetchDataFromGraphQl(message);
      debugger;
      console.log(postQueryData);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div data-e2e-id="graphql-connected">
      <div>
        <p>Search Functionality</p>
        <div>
          {externalData.search.results &&
            externalData.search.results.map((item, i) => (
              <div key={`blogItem-${i}`}>{item.id}</div>
            ))}
        </div>
        <div className="search-area">
          <div className="input">
            <img
              className="icon"
              src="https://www.adnec.ae/dist/AdnecWeb/adnec-vectors/Global-Search/search-typing.svg"
            ></img>
            <input placeholder="Type to search" onChange={handleChange}></input>
            <input type="button" value={'Enter'} onClick={SearchData}></input>
            {/* <button type="submit" value={'button type Enter'} onClick={SearchData}></button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Will be called during SSG
 * @param {ComponentRendering} rendering
 * @param {LayoutServiceData} layoutData
 * @param {GetStaticPropsContext} context
 */
export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }
  console.log('static props calling');
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });
  console.log(rendering.dataSource);
  const result = await graphQLClient.request<GraphQLConnectedDemoData>(SearchDocument as any, {
    pathId: '{6736E5C8-5584-56F9-8BD8-C90983F51744}',
    language: 'en',
    searchKeyword: 'home',
  });
  console.log(result);
  return result;
};

/**
 * Will be called during SSR
 * @param {ComponentRendering} rendering
 * @param {LayoutServiceData} layoutData
 * @param {GetServerSidePropsContext} context
 */
export const getServerSideProps: GetServerSideComponentProps = async (rendering, layoutData) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }

  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const result = await graphQLClient.request<GraphQLConnectedDemoData>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SearchDocument as any,
    {
      pathId: '{EA8C799A-7482-4DD9-BAD3-01856E841AF9}',
      language: 'en',
      searchKeyword: 'home',
    }
  );
  console.log(result);

  return result;
};

async function fetchDataFromGraphQl(textKeyword: any) {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });
  debugger;
  const result = await graphQLClient.request<GraphQLConnectedDemoData>(SearchDocument as any, {
    pathId: '{EA8C799A-7482-4DD9-BAD3-01856E841AF9}',
    language: 'en',
    searchKeyword: textKeyword,
  });
  debugger;
  console.log(result);
  return result;
}
export default Search;

// // import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
// import { GraphQLRequestClient, useComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
// import { GraphQLClient, gql } from 'graphql-request';
// import {
//   ConnectedDemoQueryDocument,
//   AppRoute,
//   Item,
//   GraphQlConnectedDemo as GrapQLConnectedDemoDatasource,
// } from './Search/query.graphql';
// // import { loadEnvConfig } from '@next/env';
// import config from 'temp/config';

// // import { StyleguideComponentProps } from 'lib/component-props';
// import { GetServerSideProps, GetStaticProps } from 'next';
// // import {type} from 'graphql-let/loader';

// // type SearchProps = StyleguideComponentProps & {
// //   fields: {
// //     heading: Field<string>;
// //   };
// // };
// // const endpoint = process.env.GRAPH_QL_ENDPOINT as string;
// export const getStaticProps: GetStaticProps = async () => {
//   return await fetchDataFromGraphQl();
// };

// async function fetchDataFromGraphQl(): any {
//   const graphQLClient = new GraphQLClient(config.graphQLEndpoint);
//   graphQLClient.setHeader('sc_apikey', config.sitecoreApiKey as string);
//   const query = gql`
//     query Search {
//       search(where: { value: "test", operator: CONTAINS }, first: 20) {
//         total
//         results {
//           id
//           name
//           path
//         }
//       }
//     }
//   `;
//   const data = await graphQLClient.request(query);
//   console.log(data?.search?.total);
//   return {
//     data,
//   };
// }

// async function SearchData() {
//   try {
//     const postQueryData = await fetchDataFromGraphQl();
//     console.log(postQueryData?.search?.total);
//   } catch (e) {
//     console.log(e);
//   }
// }

// const Search = ({ rendering }: any): JSX.Element => {
//   const externalData = useComponentProps(rendering.uid) as externalDataProps;
//   console.log(externalData.data.search.results);
//   return (
//     <div>
//       <p>Search Functionality</p>
//       <div>
//         {externalData.data.search.results &&
//           externalData.data.search.results.map((item, i) => <div key={`blogItem-${i}`}>{item.id}</div>)}
//       </div>
//       <div className="search-area">
//         <div className="input">
//           <img
//             className="icon"
//             src="https://www.adnec.ae/dist/AdnecWeb/adnec-vectors/Global-Search/search-typing.svg"
//           ></img>
//           <input placeholder="Type to search"></input>
//           <input type="button" value={'Enter'} onClick={SearchData}></input>
//           {/* <button type="submit" value={'button type Enter'} onClick={SearchData}></button> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;
// // export const getServerSideProps: GetServerSideProps = async () => {
// //   // server side env vars can be accessed in getServerSideProps() or
// //   // getStaticProps() because they are executed on the server
// //   const myVar = process.env.GRAPH_QL_ENDPOINT;
// //   console.log('SERVER_SIDE_ONLY_VAR:', myVar);

// //   return {
// //     props: {}, // will be passed to the page component as props
// //   };
// // };
// export async function getServerSideProps() {
//   debugger;
//   const myVar = process.env.GRAPH_QL_ENDPOINT;
//   console.log('SERVER_SIDE_ONLY_VAR:', myVar);
// }
