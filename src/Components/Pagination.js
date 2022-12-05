import React from 'react';

export default class Pagination extends React.Component {
  render() {
    let { arrOfButton, handleClickOnPageButton, selectedPageButton } =
      this.props;
    return (
      <div className="flex flex-wrap">
        {arrOfButton.length > 1
          ? arrOfButton.map((n) => {
              return (
                <button
                  key={n + 2}
                  onClick={() => handleClickOnPageButton(n)}
                  className={
                    selectedPageButton == n
                      ? 'bg-green-400  text-sm m-1 text-white border-[1px] border-solid inline-block px-2 py-1'
                      : 'green text-sm m-1  hover:bg-gray-100 hover:underline border-[1px] border-solid inline-block px-2 py-1'
                  }
                  type="button"
                >
                  {n}
                </button>
              );
            })
          : ''}
      </div>
    );
  }
}
