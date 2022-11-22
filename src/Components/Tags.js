import React from 'react';
import { tagsURL } from '../utils/constants';
import Loader from './Loader';

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      err: '',
    };
  }
  componentDidMount() {
    return fetch(tagsURL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        this.setState({
          tags: data.tags,
        });
      })
      .catch((error) => this.setState({ err: 'Not able to fetch!' }));
  }

  render() {
    let { selectedTag, handleTags } = this.props;

    return (
      <div className="basis-[23%] h-fit p-2 rounded bg-[#F2F2F3]">
        <h4 className="text-[#606364] text-sm my-[2px]">Popular tags</h4>
        {!this.state.err ? (
          this.state.tags.length > 0 ? (
            this.state.tags.map((tag) => {
              return (
                <button
                  key={tag}
                  onClick={() => handleTags(tag)}
                  className={
                    selectedTag != tag
                      ? 'hover:bg-[#687077] inline-block mr-2 bg-[#808B91] text-xs text-white rounded-full m-[3.3px] px-[9px] py-[4px]'
                      : 'inline-block underline mr-2 bg-[#687077] text-xs text-white rounded-full m-[3.3px] py-[4px] px-[9px]'
                  }
                >
                  {tag}
                </button>
              );
            })
          ) : (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          )
        ) : (
          <p className="text-red-600 text-center text-xs my-4">
            {this.state.err}
          </p>
        )}
      </div>
    );
  }
}
