import React from 'react';
export default class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }
  componentDidMount() {
    return fetch('https://mighty-oasis-08080.herokuapp.com/api/tags')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          tags: data.tags,
        });
      });
  }
  handleTags = (tag) => {
    return this.setState(
      () => {
        return { selectedTag: tag };
      },
      () => this.fetchArticlesAccToTag()
    );
  };
  render() {
    return (
      <div className="basis-[23%] h-fit p-2 rounded bg-[#F2F2F3]">
        <h4 className="text-[#606364] text-sm my-[2px]">Popular tags</h4>
        <ul className="flex flex-wrap">
          {this.state.tags.length > 0 ? (
            this.state.tags.map((tag) => {
              return (
                <li key={tag}>
                  <button
                    onClick={() => this.props.handleTags(tag)}
                    className="hover:bg-[#687077]  inline-block mr-2 bg-[#808B91] text-xs text-white rounded-full my-[2px] py-[2px] px-1"
                  >
                    {tag}
                  </button>
                </li>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
    );
  }
}
