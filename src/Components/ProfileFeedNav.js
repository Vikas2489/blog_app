import React from 'react';

class ProfileFeedNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { selectedTab, handleSelectedTab } = this.props;
    return (
      <div className=" w-[800px] mx-auto my-0 px-[32px] pt-[32px]">
        <p
          className={
            selectedTab == 'myArticles'
              ? 'p-1  cursor-pointer text-[#5db85c] border-[#5db85c] px-3 border-b-[1.4px] border-b-solid  inline-block -mb-[1px]'
              : 'p-1 hover:text-[#666668] cursor-pointer text-gray-400 px-3 border-b-[1.4px] border-b-solid  inline-block -mb-[1px]'
          }
          onClick={() => handleSelectedTab('myArticles')}
        >
          My Articles
        </p>
        <p
          className="p-1 hover:text-[#666668] cursor-pointer text-gray-400 px-3 border-b-[1.4px] border-b-solid  inline-block -mb-[1px]"
          onClick={() => handleSelectedTab('myFavs')}
          className={
            selectedTab == 'myFavs'
              ? 'p-1  cursor-pointer text-[#5db85c] border-[#5db85c] px-3 border-b-[1.4px] border-b-solid  inline-block -mb-[1px]'
              : 'p-1 hover:text-[#666668] cursor-pointer text-gray-400 px-3 border-b-[1.4px] border-b-solid  inline-block -mb-[1px]'
          }
        >
          Favourite Articles
        </p>
        <hr />
      </div>
    );
  }
}

export default ProfileFeedNav;
