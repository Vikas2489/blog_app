import React from 'react';
import { articlesURL } from '../utils/constants';
import { AiFillDelete } from 'react-icons/ai';
import { withRouter } from 'react-router';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      allComments: [],
    };
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = () => {
    return fetch(articlesURL + `/${this.props.slug}/comments`, {
      method: 'get',
      headers: {
        Authorization: `${this.props.user.token}`,
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
        console.log(data.commentsArr, 'these are all the comments');
        return this.setState({
          allComments: data.commentsArr,
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = ({ target }) => {
    return this.setState({
      comment: target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.comment) {
      let { comment } = this.state;
      return fetch(articlesURL + `/${this.props.slug}/comments`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          Authorization: `${this.props.user.token}`,
        },
        body: JSON.stringify({
          body: comment,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((err) => Promise.reject(err));
          }
        })
        .then((data) => {
          this.setState({
            comment: '',
          });
          this.fetchComments();
        })
        .catch((err) => console.log(err));
    }
    return;
  };

  handleDelete = (commentId) => {
    return fetch(articlesURL + `/${this.props.slug}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${localStorage.token}`,
      },
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        return this.fetchComments();
      })
      .catch((err) => console.log(err));
  };

  render() {
    let { user } = this.props;
    return (
      <section className="my-4">
        <div className="flex justify-center rounded w-[630px] my-0 mx-auto">
          <form action="#" onSubmit={this.handleSubmit}>
            <textarea
              value={this.state.comment}
              onChange={this.handleChange}
              className="border-[1px] outline-none border-solid p-2 rounded"
              name="comment"
              cols="73"
              rows="4"
              placeholder="Write a comment..."
            ></textarea>
            <div className="flex -mt-3 p-4 bg-[#F5F5F5] justify-between">
              <div>
                <img
                  src={'/smiley.png'}
                  className="h-8 w-8 object-contain rounded-full inline"
                  alt={user.username}
                />
                <p className="text-sm font-bold text-green-400 inline-block ml-2 ">
                  {user.username}
                </p>
              </div>

              <input
                type="submit"
                value="Post Comment"
                onSubmit={this.handleSubmit}
                className="bg_green rounded text-white font-bold py-1 px-2 text-xs"
              />
            </div>
          </form>
        </div>
        {this.state.allComments.length > 0
          ? this.state.allComments.map((comment) => {
              return (
                <div key={comment.createdAt} className="my-3">
                  <div className="flex flex-col justify-center rounded w-[630px] my-0 mx-auto">
                    <p className="border rounded p-4 text-sm">{comment.body}</p>
                    <div className="flex p-4 bg-[#F5F5F5] justify-between">
                      <div>
                        <img
                          src={comment.author.image || '/smiley.png'}
                          className="h-6 w-6 rounded-full inline"
                          alt={comment.id}
                        />
                        <p className="text-sm text-green-400 inline ml-2">
                          {comment.author.username}
                        </p>
                        <p className="text-[#ababad] ml-3 inline text-xs font-thin">
                          {new Date(`${comment.createdAt}`).toDateString()}
                        </p>
                      </div>

                      {user.username == comment.author.username ? (
                        <h5 onClick={() => this.handleDelete(comment.id)}>
                          <AiFillDelete />
                        </h5>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          : ''}
      </section>
    );
  }
}

export default withRouter(CommentBox);
