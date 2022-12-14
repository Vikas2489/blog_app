import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaSmileWink } from 'react-icons/fa';
import { articlesURL, rootURL } from '../utils/constants';
import { NavLink } from 'react-router-dom';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { article, i, handlefavOrUnfav } = this.props;
    return (
      <article
        key={article.slug}
        className="my-3 border-b-[1.4px] border-[#E5E5E5] pb-5"
      >
        <div className="flex my-5 justify-between">
          <div className="flex items-center">
            <NavLink
              to={`/profile/${article.author.username}`}
              className="text-green-500 text-sm"
            >
              <img
                className="w-10 h-10 rounded-full "
                src={article.author.image || '/smiley.png'}
                alt={'pic_' + i}
              />
            </NavLink>
            <div className="ml-4">
              <NavLink
                to={`/profile/${article.author.username}`}
                className="text-green-500 text-sm"
              >
                {article.author.username}
              </NavLink>
              <p className="text-[#CECECF] text-xs font-thin">
                {new Date(`${article.createdAt}`).toDateString()}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              handlefavOrUnfav(article.slug, article.favourited, i)
            }
            className={
              article.favourited
                ? 'border-[1.5px] h-6 w-9 text-sm p-1 bg-green-500 text-white hover:bg-green-600 rounded flex border-green-500 items-center'
                : 'green border-[1.5px] h-6 w-9 text-sm p-1 hover:bg-green-500 hover:text-white rounded flex border-green-500 items-center'
            }
          >
            <AiFillHeart />
            <span className="ml-1 tex">{article.favouritesCounts}</span>
          </button>
        </div>
        <NavLink to={'/articles/' + article.slug}>
          <h2 className="text-[#363A3D] font-semibold text-[19px] ">
            {article.title}
          </h2>
        </NavLink>
        <p className="text-[#C3C2C3] text-xs my-2">{article.description}</p>
        <div className="flex justify-between items-center">
          <NavLink to={'/articles/' + article.slug}>
            <button className="text-[#B0B1B0] mt-6 text-xs">
              Read more...
            </button>
          </NavLink>
          <div>
            {article.taglist.length > 0
              ? article.taglist.map((tag, i) => {
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
  }
}
