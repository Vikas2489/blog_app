import { NavLink } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai';
import React from 'react';
import { articlesURL, rootURL } from '../utils/constants';
import ProfileFeedNav from './ProfileFeedNav';
import Articles from './Articles';
import Pagination from './Pagination';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

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
      showFollowOrUnfollow: '',
    };
  }

  handleSelectedTab = (activeTab) => {
    this.setState({
      selectedTab: activeTab,
    });
  };

  handleFollowOrUnfollow = (username) => {
    return fetch(rootURL + `profiles/${username}/follow`, {
      method: this.state.showFollowOrUnfollow == 'follow' ? 'post' : 'delete',
      headers: {
        Authorization: `${localStorage.token}`,
      },
    })
      .then((res) =>
        res.json().then((data) => {
          let { following } = data.profile;
          this.setState({
            showFollowOrUnfollow: following == true ? 'unfollow' : 'follow',
          });
        })
      )
      .catch((err) => console.log(err));
  };

  componentDidUpdate(prevprops, prevState) {
    if (
      prevState.selectedTab != this.state.selectedTab ||
      prevState.selectedPageButton != this.state.selectedPageButton ||
      prevprops.match.params.username != this.props.match.params.username
    ) {
      return this.fetchArticles();
    }
  }

  componentDidMount() {
    this.fetchArticles();
    if (this.props.match.params.username != this.props.user.username) {
      fetch(rootURL + `profiles/${this.props.match.params.username}`, {
        method: 'get',
        headers: {
          Authorization: `${localStorage.token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            res.json().then((err) => Promise.reject(err));
          }
        })
        .then((data) => {
          return this.setState({
            showFollowOrUnfollow: data.profile.following
              ? 'unfollow'
              : 'follow',
          });
        })
        .catch((err) => console.log(err));
    }
  }

  fetchArticles = () => {
    let { selectedTab } = this.state;
    let username = this.props.match.params.username;
    const offset = (this.state.selectedPageButton - 1) * 10;
    let url;
    if (selectedTab == 'myArticles') {
      url = articlesURL + `?author=${username}&limit=10&offset=${offset}`;
    } else if (selectedTab == 'myFavs') {
      url = articlesURL + `?favouritedBy=${username}&limit=10&offset=${offset}`;
    }
    this.setState({ isLoading: true });
    fetch(url, {
      method: 'get',
      headers: {
        Authorization: `${localStorage.token}`,
      },
    })
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
      .catch((err) => {
        this.setState({
          isLoading: false,
        });
      });
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

  handlefavOrUnfav = (slug, favorited, index) => {
    if (!favorited) {
      return fetch(articlesURL + `/${slug}/favorite`, {
        method: 'post',
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((err) => Promise.reject(err));
          }
        })
        .then((data) => {
          let { article } = data;
          this.setState({
            articlesArr: this.state.articlesArr.map((a, i) => {
              if (i == index) {
                return (a = article);
              } else {
                return a;
              }
            }),
          });
        })
        .catch((err) => console.log(err));
    } else if (favorited) {
      return fetch(articlesURL + `/${slug}/favorite`, {
        method: 'delete',
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((err) => Promise.reject(err));
          }
        })
        .then((data) => {
          this.fetchArticles();
        })
        .catch((err) => console.log(err));
    }
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
                <button
                  type="button"
                  disabled={!this.state.showFollowOrUnfollow == true}
                  onClick={() =>
                    this.handleFollowOrUnfollow(
                      this.props.match.params.username
                    )
                  }
                  className="text-[#9B9A9B] flex justify-center items-center hover:bg-slate-200 rounded font-thin text-xs border-[1px] border-solid border-[#9B9A9B] py-1 px-3"
                >
                  {this.state.showFollowOrUnfollow +
                    ' ' +
                    this.props.match.params.username}
                </button>
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
            <Articles
              articlesArr={this.state.articlesArr}
              handlefavOrUnfav={this.handlefavOrUnfav}
            />
            <Pagination
              arrOfButton={arrOfButton}
              handleClickOnPageButton={this.handleClickOnPageButton}
              selectedPageButton={this.state.selectedPageButton}
            />
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Profile);
