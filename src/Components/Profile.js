import { NavLink } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai';
import React from 'react';
import { articlesURL, rootURL } from '../utils/constants';
import ProfileFeedNav from './ProfileFeedNav';
import Articles from './Articles';
import Pagination from './Pagination';
import Loader from './Loader';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'myArticles',
      limit: 10,
      articlesArr: [],
      articlesCount: 0,
      selectedPageButton: 1,
      isLoading: false,
    };
  }

  handleSelectedTab = (activeTab) => {
    this.setState({
      selectedTab: activeTab,
    });
  };

  componentDidUpdate(_prevprops, prevState) {
    if (
      prevState.selectedTab != this.state.selectedTab ||
      prevState.selectedPageButton != this.state.selectedPageButton
    ) {
      return this.fetchArticles();
    }
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    let { selectedTab } = this.state;
    let username = this.props.match.params.username;
    const offset = (this.state.selectedPageButton - 1) * 10;
    let url;
    if (selectedTab == 'myArticles') {
      url = articlesURL + `?author=${username}&limit=10&offset=${offset}?`;
    } else if (selectedTab == 'myFavs') {
      url = articlesURL + `?favorited=${username}&limit=10&offset=${offset}?`;
    }
    this.setState({ isLoading: true });
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((err) => Promise.reject(err));
        }
      })
      .then((data) => {
        return this.setState({
          articlesArr: data.articles,
          articlesCount: data.articlesCount,
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  handleClickOnPageButton = (pageNo) => {
    this.setState(() => {
      return { selectedPageButton: pageNo };
    });
  };

  pagination = () => {
    let { articlesCount } = this.state;

    let pageButtons = articlesCount ? articlesCount / 10 : '';
    pageButtons = Math.ceil(pageButtons);

    let arrOfPagination = [];
    for (let i = 0; i < pageButtons; i++) {
      arrOfPagination.push(i + 1);
    }
    return arrOfPagination;
  };

  render() {
    let arrOfButton = this.pagination();
    return (
      <>
        <section className="bg-[#F2F2F3] py-9">
          <div className="flex  w-[800px] mx-auto my-0  flex-col justify-center items-center">
            <img
              className="w-16 object-contain h-16  rounded-full block"
              src="/smiley.png"
              alt="rashehehe12"
            />
            <p className="text-[#363A3D] font-bold text-xl mt-2">
              {this.props.match.params.username}
            </p>
            <div className="self-end">
              {localStorage.username == this.props.match.params.username ? (
                <NavLink
                  to="/settings"
                  className="text-[#9B9A9B] flex justify-center items-center hover:bg-slate-200 rounded font-thin text-xs border-[1px] border-solid border-[#9B9A9B] py-1 px-3"
                >
                  <AiOutlineSetting className=" mr-1" />
                  Edit Profile Settings
                </NavLink>
              ) : (
                <NavLink
                  to="/follow"
                  className="text-[#9B9A9B] flex justify-center items-center hover:bg-slate-200 rounded font-thin text-xs border-[1px] border-solid border-[#9B9A9B] py-1 px-3"
                >
                  {'follow ' + this.props.match.params.username}
                </NavLink>
              )}
            </div>
          </div>
        </section>
        <ProfileFeedNav
          handleSelectedTab={this.handleSelectedTab}
          selectedTab={this.state.selectedTab}
        />
        {this.state.isLoading ? (
          <div className="flex justify-center my-4">
            <Loader />
          </div>
        ) : (
          <div className="w-[800px] p-[32px] mx-auto my-0">
            <Articles articlesArr={this.state.articlesArr} />
          </div>
        )}

        <Pagination
          arrOfButton={arrOfButton}
          handleClickOnPageButton={this.handleClickOnPageButton}
          selectedPageButton={this.state.selectedPageButton}
        />
      </>
    );
  }
}

export default Profile;
