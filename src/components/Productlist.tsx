import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ProductlistProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Productlist = (props: ProductlistProps): JSX.Element => (
  <div>
    <p>Productlist Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default withDatasourceCheck()<ProductlistProps>(Productlist);
