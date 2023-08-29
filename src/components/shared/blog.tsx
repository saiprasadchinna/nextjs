import { Image, RichText, Text, DateField, Field } from '@sitecore-jss/sitecore-jss-nextjs';

const blog = ({ items }): JSX.Element => (
  <div className="row gx-5">
    {items &&
      items.map((listItem, index) => (
        <div className="col-lg-4 mb-5" key={`blogItem-${index}`}>
          <div className="card h-100 shadow border-0">
            <Image field={listItem.fields.image}></Image>
            <div className="card-body p-4">
              <div className="badge bg-primary bg-gradient rounded-pill mb-2">
                <Text field={listItem.fields.tag as Field<string>}></Text>
              </div>
              <h5 className="card-title mb-3">
                <Text field={listItem.fields.title as Field<string>}></Text>
              </h5>
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
                    <div className="text-muted">
                      <DateField
                        field={listItem.fields.date}
                        render={(date) =>
                          date &&
                          date.toLocaleDateString('en-us', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                          })
                        }
                      />
                    </div>
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
