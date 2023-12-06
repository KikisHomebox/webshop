import {Link} from '@remix-run/react';
import BlogCard from '../Blogs/BlogCard';
import './mpBlogsPosts.css';

const MainPageBlogPosts = ({articles}) => {
  return (
    <div className="mpBlogsPosts-grid">
      <h2 className="mpBlogsPosts-body-header">Our blog posts</h2>
      <div className="mpBlogsPosts-body">
        {articles.nodes.map((node) => (
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
    </div>
  );
};

export default MainPageBlogPosts;
