import { Text, Field, ImageField, RichText, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
// import { useI18n } from 'next-localization';

type QuoteProps = ComponentProps & {
  fields: {
    name: Field<string>;
    position: Field<string>;
    description: Field<string>;
    image: ImageField;
  };
};

const Quote = (props: QuoteProps): JSX.Element => {
  // const { t } = useI18n();
  // console.log(t('firstName.Key'));
  return (
    <>
      <div className="py-5 bg-light">
        <div className="container px-5 my-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-10 col-xl-7">
              <div className="text-center">
                <div className="fs-4 mb-4 fst-italic">
                  <RichText field={props.fields.description}></RichText>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Image field={props.fields.image}></Image>
                  <div className="fw-bold">
                    <Text field={props.fields.name}></Text>
                    <span className="fw-bold text-primary mx-1">/</span>
                    <Text field={props.fields.position}></Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quote;
