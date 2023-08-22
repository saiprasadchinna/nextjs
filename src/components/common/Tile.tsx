import { RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

const Tile = ({ items }): JSX.Element => (
  <div className="col-lg-8">
    <div className="row gx-5 row-cols-1 row-cols-md-2">
      {items &&
        items.map((listItem, index) => (
          <div className="col mb-5 h-100" key={`tileListItem-${index}`}>
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
              <i className="bi bi-collection"></i>
            </div>
            <h2 className="h5">
              <Text field={listItem.fields.title}></Text>
            </h2>
            <p className="mb-0">
              <RichText field={listItem.fields.description}></RichText>
            </p>
          </div>
        ))}
    </div>
  </div>
);

export default Tile;
