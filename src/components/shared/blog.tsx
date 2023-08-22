import { Image, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

const blog = ({ items }): JSX.Element => (
  <div className="row gx-5">
    {items &&
      items.map((listItem, index) => (
        <div className="col-lg-4 mb-5" key={`blogItem-${index}`}>
          <div className="card h-100 shadow border-0">
            <Image field={listItem.fields.image}></Image>
            <div className="card-body p-4">
              <div className="badge bg-primary bg-gradient rounded-pill mb-2">News</div>
              <a className="text-decoration-none link-dark stretched-link" href="#!">
                <h5 className="card-title mb-3">
                  <Text field={listItem.fields.title}></Text>
                </h5>
              </a>
              <p className="card-text mb-0">
                <RichText field={listItem.fields.description}></RichText>
              </p>
            </div>
            <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
              <div className="d-flex align-items-end justify-content-between">
                <div className="d-flex align-items-center">
                  <Image field={listItem.fields.ownerImage}></Image>
                  <div className="small">
                    <div className="fw-bold">
                      <Text field={listItem.fields.ownerName}></Text>
                    </div>
                    <div className="text-muted">April 2, 2023 · 10 min read</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
  </div>
);

export default blog;
