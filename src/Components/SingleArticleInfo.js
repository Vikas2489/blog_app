import { NavLink } from 'react-router-dom';
import Loader from './Loader';
import React from 'react';
export default class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleInfo: '',
    };
  }
  componentDidMount() {
    let { slug } = this.props.match.params;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          articleInfo: data.article,
        });
      });
  }
  render() {
    if (this.state.articleInfo) {
      var { title, tagList, body, createdAt, author } = this.state.articleInfo;
      return (
        <>
          <section className="bg-[#323332] py-7">
            <div className="container">
              <h3 className="text-white text-3xl font-semibold">{title}</h3>
              <div className="flex items-center mt-9">
                <img
                  className="w-10 h-10 rounded-full"
                  src={author.image}
                  alt={author.username}
                />
                <div className="ml-1">
                  <NavLink
                    to={'/profile/' + author.username}
                    className="text-[#F1F0F0] text-sm"
                  >
                    {author.username}
                  </NavLink>
                  <p className="text-[#CECECF] text-xs font-thin">
                    {new Date(`${createdAt}`).toDateString()}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="container">
            <article>
              <p className="text-xl font-thin leading-9 my-4">{body}</p>
              <div className="my-4">
                {tagList.map((tag, i) => {
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
            {<RegisterOrLogin token={localStorage.token} />}
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

function RegisterOrLogin(props) {
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
  }
  return;
}
