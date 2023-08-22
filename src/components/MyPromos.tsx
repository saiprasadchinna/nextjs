import { Field, Item, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Tile from './common/Tile';

type MyPromosProps = ComponentProps & {
  fields: {
    header: Field<string>;
    tilesList: Item[];
  };
};

const MyPromos = (props: MyPromosProps): JSX.Element => (
  <section className="py-5" id="features">
    <div className="container px-5 my-5">
      <div className="row gx-5">
        <div className="col-lg-4 mb-5 mb-lg-0">
          <h2 className="fw-bolder mb-0">
            <Text field={props.fields.header}></Text>
          </h2>
        </div>
        <Tile items={props.fields.tilesList}></Tile>
      </div>
    </div>
  </section>
);

export default MyPromos;
