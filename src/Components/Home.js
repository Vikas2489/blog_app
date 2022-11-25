import React from 'react';
import Pagination from './Pagination';
import Articles from './Articles';
import Tags from './Tags';
import FeedNav from './FeedNav';
import { rootURL, articlesURL, tagsURL } from '../utils/constants';
import Loader from './Loader';

class Home extends React.Component {
  state = {
    articlesArr: [],
    totalArticles: '',
    isLoading: false,
    selectedPageButton: 1,
    selectedTab: localStorage.token ? 'feed' : 'global',
  };
  handleGlobalFeed = () => {
    this.setState(() => {
      return { selectedTab: 'global', selectedPageButton: 1 };
    });
  };

  componentDidUpdate(_prevprops, prevState) {
    if (
      prevState.selectedPageButton != this.state.selectedPageButton ||
      prevState.selectedTab != this.state.selectedTab
    ) {
      this.fetchArticles();
    }
  }

  componentDidMount() {
    return this.fetchArticles();
  }

  pagination = () => {
    let { totalArticles } = this.state;

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
    let { selectedTab } = this.state;
    let { auth } = this.props;
    const offset = (this.state.selectedPageButton - 1) * 10;

    if (selectedTab == 'feed') {
      var token = localStorage.token;
      this.setState({
        isLoading: true,
      });

      return fetch(articlesURL + `/feed?limit=10&offset=${offset}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
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
            isLoading: false,
          });
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        isLoading: true,
      });
      return fetch(
        articlesURL +
          `?limit=10&offset=${offset}` +
          (selectedTab != null && selectedTab != 'global'
            ? `&tag=${selectedTab}`
            : '')
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
            isLoading: false,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  handleFeed = () => {
    this.setState({
      selectedTab: 'feed',
    });
  };

  handleTags = (tag) => {
    return this.setState({ selectedTab: tag, selectedPageButton: 1 });
  };

  render() {
    let {
      articlesArr,
      totalArticles,
      isLoading,
      selectedPageButton,
      selectedTab,
    } = this.state;
    let { auth, feedVisible } = this.props;
    let arrOfButton = this.pagination();
    return (
      <>
        <section className="container flex flex-wrap justify-between">
          <article className="basis-[72%]">
            <FeedNav
              handleFeed={this.handleFeed}
              handleGlobalFeed={this.handleGlobalFeed}
              selectedTab={this.state.selectedTab}
              auth={auth}
              feedVisible={feedVisible}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <Articles articlesArr={articlesArr} isLoading={isLoading} />
            )}
            {!isLoading ? (
              <Pagination
                arrOfButton={arrOfButton}
                handleClickOnPageButton={this.handleClickOnPageButton}
                selectedPageButton={selectedPageButton}
              />
            ) : (
              ''
            )}
          </article>
          <div className="basis-[24%]">
            <Tags handleTags={this.handleTags} selectedTab={selectedTab} />
          </div>
        </section>
      </>
    );
  }
}

export default Home;
