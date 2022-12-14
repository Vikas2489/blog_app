import React from 'react';
import { articlesURL } from '../utils/constants';
import { withRouter } from 'react-router';

class NewArticlePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      body: '',
      tagList: [],
      errors: {
        title: '',
        description: '',
        body: '',
      },
    };
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = { ...this.state.errors };
    switch (name) {
      case 'title':
        errors[name] = value.length == 0 ? 'Title cannot be blank' : '';
        break;
      case 'description':
        errors[name] = value.length == 0 ? 'Description cannot be blank' : '';
        break;
      case 'body':
        errors[name] = value.length == 0 ? 'Body cannot be blank' : '';
        break;
      default:
        break;
    }
    if (name == 'tagList') {
      return this.setState({
        [name]: value
          .trim()
          .split(',')
          .map((a) => a.trim()),
      });
    }
    return this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmit = (e) => {
    let { title, description, body, tagList, errors } = this.state;
    e.preventDefault();
    fetch(articlesURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `${localStorage.token}`,
      },
      body: JSON.stringify({
        title,
        description,
        body,
        taglist: tagList,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((error) => Promise.reject(error));
        }
      })
      .then((data) => {
        if (data.errors) {
          let { title, description, body } = data.errors;
          return this.setState({
            errors: {
              title,
              description,
              body,
            },
          });
        } else if (data.article) {
          this.props.history.push(`articles/${data.article.slug}`);
        }
      })
      .catch((error) => {
        let { title, description, body } = error.errors;
        return this.setState({
          errors: {
            title,
            description,
            body,
          },
        });
      });
  };
  render() {
    let { errors } = this.state;
    return (
      <div className="w-[700px] mx-auto my-0">
        <form
          action={articlesURL}
          method="post"
          className="mt-8 w-full"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.title}
            placeholder="Article Title"
            name="title"
            className="border-[1px] w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3 placeholder:font-normal placeholder:text-[#999898]"
          />
          {errors.title ? (
            <div className="flex items-center">
              <div className="dot"></div>
              <span className="text-[#b95d5c] text-xs font-semibold">
                {errors.title}
              </span>
            </div>
          ) : (
            ''
          )}
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.description}
            placeholder="What's this article about?"
            name="description"
            className="border-[1px] my-3 w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3 placeholder:font-normal placeholder:text-[#999898]"
          />
          {errors.description ? (
            <div className="flex items-center">
              <div className="dot"></div>
              <span className="text-[#b95d5c] text-xs font-semibold">
                {errors.description}
              </span>
            </div>
          ) : (
            ''
          )}
          <textarea
            name="body"
            value={this.state.body}
            placeholder="Write your article(in markdown)"
            cols="83"
            rows="10"
            onChange={this.handleChange}
            className="border-[1px] rounded p-3 w-full border-[#D9D8D8] border-solid"
          ></textarea>
          {errors.body ? (
            <div className="flex items-center">
              <div className="dot"></div>
              <span className="text-[#b95d5c] text-xs font-semibold">
                {errors.body}
              </span>
            </div>
          ) : (
            ''
          )}
          <input
            type="text"
            placeholder="Enter Tags"
            name="tagList"
            value={this.state.tagList}
            onChange={this.handleChange}
            className="border-[1px] w-full rounded block bg-transparent border-[#D9D8D8] border-solid py-2 px-3 mt-1 placeholder:font-normal placeholder:text-[#999898]"
          />

          <div className="text-right">
            <input
              type="submit"
              className="bg_green btn-login rounded text-white py-3 px-6 my-4"
              disabled={errors.title || errors.body || errors.description}
              value="Publish Article"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(NewArticlePost);
