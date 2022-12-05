import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    let { handleGlobalFeed, handleFeed, selectedTab, auth } = this.props;
    return (
      <div>
        {localStorage.token ? (
          <p
            className={
              selectedTab == 'feed'
                ? 'p-1 green cursor-pointer px-3 border-b-[1.4px] border-b-solid border-[#5db85c] inline-block -mb-[1px]'
                : 'p-1 cursor-pointer text-gray-400  px-3 border-b-[1.4px] border-b-solid  inline-block -mb-[1px]'
            }
            onClick={handleFeed}
          >
            Your Feed
          </p>
        ) : (
          ''
        )}
        <p
          onClick={handleGlobalFeed}
          className={
            selectedTab != 'global'
              ? 'p-1 cursor-pointer text-gray-400 px-3 border-b-[1.4px] border-b-solid  inline-block -mb-[1px]'
              : 'p-1 cursor-pointer text-[#5db85c] border-[#5db85c] px-3 border-b-[1.4px] border-b-solid  inline-block -mb-[1px]'
          }
        >
          Global Feed
        </p>
        {selectedTab != null &&
        selectedTab != 'feed' &&
        selectedTab != 'global' &&
        selectedTab != '' ? (
          <p className="p-1 green cursor-pointer px-3 border-b-[1.4px] border-b-solid border-[#5db85c] inline-block -mb-[1px]">
            {selectedTab}
          </p>
        ) : (
          ''
        )}
        <hr className="h-[1.4px] bg-[#E5E5E5]" />
      </div>
    );
  }
}
