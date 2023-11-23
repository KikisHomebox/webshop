import Pagination from '../Pagination/Pagination';
import BlogCard from './BlogCard';
import './blogsPage.css';
import {Link} from '@remix-run/react';
import {useState, useMemo} from 'react';
import RecommendedProducts from '../RecommendedProducts/RecommendedProducts';

const BLOGS_PER_PAGE = 4;

const BlogsPage = ({blogs, recommendedProducts}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * BLOGS_PER_PAGE;
    const lastPageIndex = firstPageIndex + BLOGS_PER_PAGE;
    return blogs.articles.nodes.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="blogs-flex">
      <h1>{blogs.title}</h1>
      <div className="blogs-grid">
        {currentData.map((node) => (
          <Link
            key={`blog-${node.blog.handle}`}
            to={`/blogs/${node.blog.handle}/${node.handle}`}
            className="blogs-a"
          >
            <BlogCard
              key={node.id}
              image={node.image}
              title={node.title}
              body={node.contentHtml}
            />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={blogs.articles.nodes.length}
        pageSize={BLOGS_PER_PAGE}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {recommendedProducts.products && (
        <RecommendedProducts products={recommendedProducts.products} />
      )}
    </div>
  );
};

export default BlogsPage;
