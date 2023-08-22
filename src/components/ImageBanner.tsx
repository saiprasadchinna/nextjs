import {
  Field,
  Image,
  ImageField,
  Link,
  LinkField,
  RichText,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ImageBannerProps = ComponentProps & {
  fields: {
    title: Field<string>;
    description: Field<string>;
    image: ImageField;
    primarylink: LinkField;
    secondarylink: LinkField;
  };
};

const ImageBanner = (props: ImageBannerProps): JSX.Element => (
  <header className="bg-dark py-5">
    <div className="container px-5">
      <div className="row gx-5 align-items-center justify-content-center">
        <div className="col-lg-8 col-xl-7 col-xxl-6">
          <div className="my-5 text-center text-xl-start">
            <h1 className="display-5 fw-bolder text-white mb-2">
              <Text field={props.fields.title}></Text>
            </h1>
            <p className="lead fw-normal text-white-50 mb-4">
              <RichText field={props.fields.description}></RichText>
            </p>
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
              <Link field={props.fields.primarylink}></Link>
              <Link field={props.fields.secondarylink}></Link>
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
          <Image field={props.fields.image}></Image>
        </div>
      </div>
    </div>
  </header>
);

export default ImageBanner;
