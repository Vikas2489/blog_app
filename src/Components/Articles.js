import { AiFillHeart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import Tags from './Tags';
import React from 'react';

class Articles extends React.Component {
  constructor(props) {
    super();
    this.state = {
      articlesArr: [],
      totalArticles: '',
      selectedPageButton: 1,
      selectedTag: null,
      globalFeedVisible: true,
    };
  }
  componentDidMount() {
    return this.fetchGlobalArticles();
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
  handleClickOnPageButton = (n) => {
    if (n == 1) {
      return fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=${10}`
      )
        .then((res) => res.json())
        .then((data) => {
          let articles = data.articles;
          this.setState({
            articlesArr: articles,
            selectedPageButton: n,
          });
        });
    } else {
      n = n - 1;
      return fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?offset=${Number(
          n + '0'
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          let filteredData = data.articles.filter((a, i) => {
            if (i <= 9) {
              return a;
            }
            return;
          });
          this.setState({
            articlesArr: filteredData,
            selectedPageButton: n + 1,
          });
        });
    }
  };
  fetchGlobalArticles = () => {
    return fetch(
      'https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10'
    )
      .then((res) => res.json())
      .then((data) => {
        let articles = data.articles;
        this.setState({
          articlesArr: articles,
          totalArticles: data.articlesCount,
          selectedTag: null,
          globalFeedVisible: true,
        });
      });
  };
  fetchArticlesAccToTag = () => {
    let { selectedTag } = this.state;
    if (selectedTag !== null) {
      return fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?tag=${selectedTag}`
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            articlesArr: data.articles,
            totalArticles: data.articlesCount,
            globalFeedVisible: false,
          });
        });
    }
    return;
  };

  handleTags = (tag) => {
    return this.setState(
      () => {
        return { selectedTag: tag };
      },
      () => this.fetchArticlesAccToTag()
    );
  };

  render() {
    let {
      articlesArr,
      totalArticles,
      selectedPageButton,
      selectedTag,
      globalFeedVisible,
    } = this.state;
    let arrOfButton = this.pagination();
    return (
      <div className="container flex justify-between">
        <article className="basis-[72%]">
          <div>
            <p
              onClick={this.fetchGlobalArticles}
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
                return (
                  <article
                    key={article.slug}
                    className="my-3 border-b-[1.4px] border-[#E5E5E5] pb-5"
                  >
                    <div className="flex my-5 justify-between">
                      <div className="flex items-center">
                        <img
                          className="w-10 h-10 rounded-full "
                          src={article.author.image}
                          alt={i}
                        />
                        <div className="ml-4">
                          <h4 className="text-green-500 text-sm">
                            {article.author.username}
                          </h4>
                          <p className="text-[#CECECF] text-xs font-thin">
                            {new Date(`${article.createdAt}`).toDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="green border-[1.5px] h-6 w-9 text-sm p-1 hover:bg-green-500 hover:text-white rounded flex border-green-500 items-center"
                      >
                        <AiFillHeart />
                        <span className="ml-1">0</span>
                      </button>
                    </div>
                    <NavLink to={'/articles/' + article.slug}>
                      <h2 className="text-[#363A3D] font-semibold text-[19px] ">
                        {article.title}
                      </h2>
                    </NavLink>
                    {/* <p className="text-[#B0B1B0] text-sm font-thin">
                      {article.description}
                    </p> */}
                    <div className="flex justify-between items-center">
                      <button className="text-[#B0B1B0] mt-6 text-xs">
                        Read more...
                      </button>
                      <div>
                        {article.tagList.length > 0
                          ? article.tagList.map((tag, i) => {
                              if (tag) {
                                return (
                                  <button
                                    key={i}
                                    className="text-[#B0B1B0] mx-1 border-[1px] rounded-full inline-block px-2 p-[2px]  border-solid mt-6 text-xs"
                                  >
                                    {tag}
                                  </button>
                                );
                              }
                            })
                          : ''}
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <p>Loading.....</p>
            )}
          </section>
          <div className="flex flex-wrap">
            {globalFeedVisible
              ? arrOfButton.length > 1
                ? arrOfButton.map((n) => {
                    return (
                      <button
                        key={n + 2}
                        onClick={() => this.handleClickOnPageButton(n)}
                        className={
                          selectedPageButton == n
                            ? 'bg-green-400  text-sm m-1 text-white border-[1px] border-solid inline-block px-2 py-1'
                            : 'green text-sm m-1  hover:bg-gray-100 hover:underline border-[1px] border-solid inline-block px-2 py-1'
                        }
                        type="button"
                      >
                        {n}
                      </button>
                    );
                  })
                : ''
              : ''}
          </div>
        </article>
        <Tags handleTags={this.handleTags} />
      </div>
    );
  }
}

export default Articles;
