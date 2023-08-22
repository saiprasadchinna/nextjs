import { Field, Link, Text } from '@sitecore-jss/sitecore-jss-nextjs';

const NavigationItem = ({ items }): JSX.Element => (
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {items &&
        items.map((listItem, index) => (
          <li className="nav-item" key={`navigationListItem-${index}`}>
            {/* The referenced item's fields can be rendered and edited using normal helper components: */}
            <Link field={listItem.fields.link} />
          </li>
        ))}
    </ul>
  </div>
);
export default NavigationItem;