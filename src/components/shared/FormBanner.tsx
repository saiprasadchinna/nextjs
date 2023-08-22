import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';

type FormBannerProps = {
  fields: {
    title: Field<string>;
    subTitle: Field<string>;
    privacyTitle: Field<string>;
    buttonText: Field<string>;
  };
};

const FormBanner = (props: FormBannerProps) => (
  <aside className="bg-primary bg-gradient rounded-3 p-4 p-sm-5 mt-5">
    <div className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
      <div className="mb-4 mb-xl-0">
        <div className="fs-3 fw-bold text-white">
          <Text field={props.fields.title}></Text>
        </div>
        <div className="text-white-50">
          <Text field={props.fields.subTitle}></Text>
        </div>
      </div>
      <div className="ms-xl-4">
        <div className="input-group mb-2">
          <input
            className="form-control"
            type="text"
            placeholder="Email address..."
            aria-label="Email address..."
            aria-describedby="button-newsletter"
          ></input>
          <button className="btn btn-outline-light" id="button-newsletter" type="button">
            {props.fields.buttonText.value}
          </button>
        </div>
        <div className="small text-white-50">
          <Text field={props.fields.privacyTitle}></Text>
        </div>
      </div>
    </div>
  </aside>
);

export default FormBanner;
