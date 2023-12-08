import './StaticPage.css';

const StaticPage = ({page}) => {
  if (page.handle === 'contact') {
    return (
      <div className="contact-us">
        <header>
          <h1 className="page-title">{page.title}</h1>
        </header>
        <form id="contact-us-form">
          <div className="form-group">
            <input type="text" id="form-name" placeholder="" />
            <label htmlFor="form-name">Name</label>
          </div>
          <div className="form-group">
            <input type="email" id="form-email" placeholder="" />
            <label htmlFor="form-email">Email</label>
          </div>
          <div className="form-group">
            <input type="text" id="form-phonenumber" placeholder="" />
            <label htmlFor="form-phonenumber">Phone Number</label>
          </div>
          <div className="form-group">
            <textarea id="form-comment" placeholder="" />
            <label htmlFor="form-comment">Comment</label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="page">
        <header>
          <h1 className="page-title">{page.title}</h1>
        </header>
        <main dangerouslySetInnerHTML={{__html: page.body}} />
      </div>
    );
  }
};

export default StaticPage;
