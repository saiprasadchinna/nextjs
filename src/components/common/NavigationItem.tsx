/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from '@sitecore-jss/sitecore-jss-nextjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types
const NavigationItem = ({ items }: { items: any }): JSX.Element => (
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {items &&
        items.map((listItem: any, index: any) => (
          <li className="nav-item" key={`navigationListItem-${index}`}>
            {/* The referenced item's fields can be rendered and edited using normal helper components: */}
            <Link field={listItem.fields.link} />
          </li>
        ))}
    </ul>
  </div>
);
export default NavigationItem;
