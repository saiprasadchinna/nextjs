import { Item, Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import './NavigationItem';
import NavigationItem from './NavigationItem';
// import NavigationItem from './NavigationItem';

type HeaderProps = ComponentProps & {
  fields: {
    title: Field<string>;
    navigationLists: Item[];
  };
};

const Header = (props: HeaderProps): JSX.Element => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container px-5">
      <a className="navbar-brand" href="index.html">
        <Text field={props.fields.title} />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <NavigationItem items={props.fields.navigationLists}></NavigationItem>
    </div>
  </nav>
);

export default withDatasourceCheck()<HeaderProps>(Header);
