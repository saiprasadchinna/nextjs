import {
  useComponentProps,
  constants,
  GraphQLRequestClient,
  GetServerSideComponentProps,
  Field,
  Text,
  getFieldValue,
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
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';
import { useI18n } from 'next-localization';
type RouteItem = AppRoute & Item;

type GraphQLConnectedDemoData = {
  datasource: GrapQLConnectedDemoDatasource;
  contextItem: RouteItem;
};

type SearchProps = ComponentProps &
  StyleguideSpecimenFields & {
    fields: {
      searchRootItem: Item;
      searchResultsPageSize: Field<number>;
      searchboxPlaceholderText: Field<string>;
      searchResultFoundText: Field<string>;
      recommendedSearchLink: Item[];
    };
  };
const Search = (props: SearchProps): JSX.Element => {
  const { t, locale } = useI18n();
  const { searchRootItem, searchboxPlaceholderText } = props.fields;
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  //let externalData = useComponentProps<GraphQLConnectedDemoData>(props.rendering.uid);
  //console.log('graphQL Data ' + externalData.search.total.results.length());
  // useEffect(() => {
  //   resetEditorChromes();
  // }, []);
  async function SearchData() {
    try {
      const postQueryData = await fetchDataFromGraphQl(message, searchRootItem.id, locale());
      console.log(postQueryData);
      return setData(postQueryData);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div data-e2e-id="graphql-connected">
      <div>
        <div className="search-area">
          <div className="input">
            <img
              className="icon"
              src="https://www.adnec.ae/dist/AdnecWeb/adnec-vectors/Global-Search/search-typing.svg"
            ></img>
            <input placeholder={searchboxPlaceholderText.value} onChange={handleChange}></input>
            <input type="button" value={'Enter'} onClick={SearchData}></input>
            <div>
              {data?.search?.results &&
                data?.search?.results.map((item, i) => (
                  <>
                    <a href={item.url.path}>{item.title.value}</a>
                    <br />
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

async function fetchDataFromGraphQl(textKeyword: any, rootId: any, currentLanguage: string) {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });
  const result = await graphQLClient.request<GraphQLConnectedDemoData>(SearchDocument as any, {
    pathId: rootId,
    language: currentLanguage,
    searchKeyword: textKeyword,
  });
  console.log(result);
  return result;
}
export default Search;
