import Article from './Article';
import Tags from './Tags';
import React from 'react';
import Loader from './Loader';
import { rootURL, articlesURL, tagsURL } from '../utils/constants';
import Pagination from './Pagination';

class Articles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { articlesArr, handlefavOrUnfav } = this.props;
    return (
      <section>
        {articlesArr.length > 0 ? (
          articlesArr.map((article, i) => {
            return (
              <Article
                key={article.slug}
                article={article}
                i={i}
                handlefavOrUnfav={handlefavOrUnfav}
              />
            );
          })
        ) : (
          <div className="flex justify-center my-4">
            <p className="text-sm text-red-600 ">No articles found!</p>
          </div>
        )}
      </section>
    );
  }
}

export default Articles;
