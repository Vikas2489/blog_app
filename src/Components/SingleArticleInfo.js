import { NavLink } from 'react-router-dom';
import CommentBox from './CommentBox';
import Loader from './Loader';
import { withRouter } from 'react-router';
import React from 'react';
import { articlesURL } from '../utils/constants';

class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleInfo: '',
    };
  }
  componentDidMount() {
    let { slug } = this.props.match.params;
    fetch(articlesURL + `/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          articleInfo: data.article,
        });
      });
  }

  handleDeleteArticle = (slug) => {
    fetch(articlesURL + `/${slug}`, {
      method: 'delete',
      headers: {
        authorization: `${localStorage.token}`,
      },
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => this.props.history.push('/'))
      .catch((err) => console.log(err, 'after deleting your article'));
  };

  render() {
    if (this.state.articleInfo) {
      var { title, taglist, body, createdAt, author, slug } =
        this.state.articleInfo;
      return (
        <>
          <section className="bg-[#323332] py-7">
            <div className="container">
              <h3 className="text-white text-3xl font-semibold">{title}</h3>
              <div className="flex items-center mt-9">
                <img
                  className="w-8 h-8 rounded-full"
                  src={author.image || '/smiley.png'}
                  alt={author.username}
                />
                <div className="ml-1">
                  <NavLink
                    to={'/profile/' + author.username}
                    className="green font-bold text-sm"
                  >
                    {author.username}
                  </NavLink>
                  <p className="text-[#CECECF] text-xs font-thin">
                    {new Date(`${createdAt}`).toDateString()}
                  </p>
                </div>
                <div className="ml-3">
                  {this.props.user.username == author.username ? (
                    <>
                      <NavLink to={'/edit/' + slug}>
                        <button
                          type="button"
                          className="border-[1px] border-solid border-[#ACACAD] text-[#ACACAD] text-xs px-3 py-[1.5px] hover:bg-gray-400 rounded hover:text-white"
                        >
                          edit
                        </button>
                      </NavLink>
                      <button
                        type="button"
                        onClick={() => this.handleDeleteArticle(slug)}
                        className="border-[1px] border-solid border-[#935051] hover:bg-[#935051] text-[#935051] text-xs px-3 py-[1.5px] ml-1 inline-block rounded hover:text-white"
                      >
                        delete
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </section>
          <div className="container">
            <article>
              <p className="text-xl font-thin leading-9 my-4">{body}</p>
              <div className="my-4">
                {taglist.map((tag, i) => {
                  return (
                    <button
                      key={i}
                      className="text-[#B0B1B0] mx-1 border-[1px] rounded-full inline-block px-2 p-[2px]  border-solid mt-6 text-xs"
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <hr />
            </article>
            {
              <ShowRegisterOrLogin
                token={localStorage.token}
                user={this.props.user}
                slug={slug}
              />
            }
          </div>
        </>
      );
    } else {
      return (
        <div className="container flex items-center justify-center">
          <Loader />
        </div>
      );
    }
  }
}

function ShowRegisterOrLogin(props) {
  if (!props.token) {
    <p className="ml-7 my-4 text-sm">
      <NavLink to="/login">
        <span className="green"> Sign in </span>
      </NavLink>
      or
      <NavLink to="/register">
        <span className="green"> Sign up </span>
      </NavLink>
      to add comments on this article.
    </p>;
  } else {
    return <CommentBox slug={props.slug} user={props.user} />;
  }
}

export default withRouter(SingleArticle);
