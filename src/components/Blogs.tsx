import { Item, Text, Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
// import { StyleguideComponentProps, StyleguideSitecoreContextValue } from 'lib/component-props';
import { ComponentProps } from 'lib/component-props';

import Blog from './shared/blog';

type BlogsProps = ComponentProps & {
  fields: {
    title: Field<string>;
    description: Field<string>;
    blogList: Item[];
  };
};

const Blogs = (props: BlogsProps): JSX.Element => (
  <section className="py-5">
    <div className="container px-5 my-5">
      <div className="row gx-5 justify-content-center">
        <div className="col-lg-8 col-xl-6">
          <div className="text-center">
            <h2 className="fw-bolder">
              <Text field={props.fields.title}></Text>
            </h2>
            <p className="lead fw-normal text-muted mb-5">
              <RichText field={props.fields.description}></RichText>
            </p>
          </div>
        </div>
      </div>
      <Blog items={props.fields.blogList}></Blog>
      {/* {props.route && <Placeholder name="headless-formbanner" rendering={props.route} />} */}
    </div>
  </section>
);

export default Blogs;
