/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types
const NavigationItem = ({ items }: { items: any }): JSX.Element => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    //console.log(toggle);
    setToggle(!toggle);
  };
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {items &&
          items.map((listItem: any, index: any) => {
            let markup;
            console.log(listItem.fields.subMenuList);
            if (listItem.fields.isSubMenu.value) {
              console.log(toggle);
              markup = (
                <>
                  <li
                    className="nav-item dropdown"
                    key={`navigationListItem-${index}`}
                    onClick={handleClick}
                  >
                    {/* The referenced item's fields can be rendered and edited using normal helper components: */}
                    <p
                      className={
                        toggle ? 'nav-link dropdown-toggle show' : 'nav-link dropdown-toggle '
                      }
                    >
                      {listItem.fields.link.value.text}
                    </p>
                    {/* <a className="nav-link dropdown-toggle" href="#">
                      {listItem.fields.link.value}
                    </a> */}
                    <ul
                      className={
                        toggle
                          ? 'dropdown-menu dropdown-menu-end show'
                          : 'dropdown-menu dropdown-menu-end'
                      }
                      aria-labelledby="navbarDropdownBlog"
                    >
                      {listItem &&
                        listItem.fields.subMenuList.map((subItem: any, subIndex: any) => {
                          console.log('submenu' + subItem.fields.link.value.text);
                          return (
                            <>
                              <li key={`subMenuListItem-${subIndex}`}>
                                <Link field={subItem.fields.link} className="dropdown-item" />
                              </li>
                            </>
                          );
                        })}
                    </ul>
                  </li>
                </>
              );
            } else {
              markup = (
                <li className="nav-item" key={`navigationListItem-${index}`}>
                  {/* The referenced item's fields can be rendered and edited using normal helper components: */}
                  <Link field={listItem.fields.link} />
                </li>
              );
            }
            return markup;
          })}
      </ul>
    </div>
  );
};
export default NavigationItem;
