import Article from './Article';
import Tags from './Tags';
import React from 'react';
import Loader from './Loader';
import { rootURL, articlesURL, tagsURL } from '../utils/constants';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesArr: [],
      totalArticles: '',
      selectedPageButton: 1,
      selectedTag: null,
    };
  }
  componentDidUpdate(_prevprops, prevState) {
    if (
      prevState.selectedPageButton != this.state.selectedPageButton ||
      prevState.selectedTag != this.state.selectedTag
    ) {
      this.fetchArticles();
    }
  }
  componentDidMount() {
    return this.fetchArticles();
  }
  pagination = () => {
    let { totalArticles } = this.state;
    let { articlesCountAccToTag } = this.props;

    let pageButtons = totalArticles ? totalArticles / 10 : '';
    pageButtons = Math.ceil(pageButtons);

    let arrOfPagination = [];
    for (let i = 0; i < pageButtons; i++) {
      arrOfPagination.push(i + 1);
    }
    return arrOfPagination;
  };
  handleClickOnPageButton = (pageNo) => {
    this.setState(() => {
      return { selectedPageButton: pageNo };
    });
  };

  fetchArticles = () => {
    let { selectedTag } = this.state;
    const offset = (this.state.selectedPageButton - 1) * 10;
    return fetch(
      articlesURL +
        `?limit=10&offset=${offset}` +
        (selectedTag != null ? `&tag=${selectedTag}` : '')
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('something went wrong');
        }
      })
      .then((data) => {
        this.setState({
          articlesArr: data.articles,
          totalArticles: data.articlesCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handleTags = (tag) => {
    return this.setState({ selectedTag: tag, selectedPageButton: 1 });
  };
  render() {
    let { articlesArr, totalArticles, selectedPageButton, selectedTag } =
      this.state;
    let arrOfButton = this.pagination();
    return (
      <div className="container flex justify-between">
        <article className="basis-[72%]">
          <div>
            <p
              onClick={() =>
                this.setState({ selectedTag: null, selectedPageButton: 1 })
              }
              className={
                selectedTag != null
                  ? 'p-1 cursor-pointer text-gray-400 px-3 border-b-[1.4px] border-b-solid  inline-block -mb-[1px]'
                  : 'p-1 cursor-pointer green px-3 border-b-[1.4px] border-b-solid border-[#5db85c] inline-block -mb-[1px]'
              }
            >
              Global Feed
            </p>
            {selectedTag ? (
              <p className="p-1 green cursor-pointer px-3 border-b-[1.4px] border-b-solid border-[#5db85c] inline-block -mb-[1px]">
                {selectedTag}
              </p>
            ) : (
              ''
            )}
            <hr className="h-[1.4px] bg-[#E5E5E5]" />
          </div>
          <section>
            {articlesArr.length > 0 ? (
              articlesArr.map((article, i) => {
                return <Article key={article.slug} article={article} i={i} />;
              })
            ) : (
              <Loader />
            )}
          </section>
          <Pagination
            arrOfButton={arrOfButton}
            handleClickOnPageButton={this.handleClickOnPageButton}
            selectedPageButton={selectedPageButton}
          />
        </article>
        <Tags handleTags={this.handleTags} selectedTag={selectedTag} />
      </div>
    );
  }
}

export default Articles;
