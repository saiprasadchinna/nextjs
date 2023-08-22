import {
  Text,
  Field,
  RichText,
  Image,
  ImageField,
  Link,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type HeaderCardProps = {
  fields: {
    title: Field<string>;
    description: Field<string>;
    image: ImageField;
    link: LinkField;
  };
};

const HeaderCard = (props: HeaderCardProps): JSX.Element => (
  <div>
    <Text field={props.fields.title} />
    <RichText field={props.fields.description} />
    <Image
      field={props.fields.image}
      editable={false}
      imageParams={{ mw: 100, mh: 50 }}
      height="50"
      width="94"
      data-sample="other-attributes-pass-through"
    />
    <Link field={props.fields.link} />
  </div>
);

export default HeaderCard;
