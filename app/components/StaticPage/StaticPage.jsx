import './StaticPage.css';

const StaticPage = ({page}) => {
  return (
    <div className="page">
      <header>
        <h1 className="page-title">{page.title}</h1>
      </header>
      <main dangerouslySetInnerHTML={{__html: page.body}} />
    </div>
  );
};

export default StaticPage;
