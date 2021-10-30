import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showSubNav } from '../../redux/side-bar/side-bar-actions';

const SubMenu = ({ data, handleSubNavClicked }) => {
  const dispatch = useDispatch();
  const activeItem = useSelector(state => state.sidebar.active);
  const subnavs = useSelector(state => state.sidebar.subNavs);
  return (
    <>
      <div
        className="categories-container"
        onClick={() =>
          data.Children.length
            ? data.Children && dispatch(showSubNav(data.id))
            : null
        }
      >
        {!data.Children.length ? (
          <Link to={`/dashboard${data.path}`}>
            <div className="categories" onClick={() => handleSubNavClicked(-1)}>
              {data.name}
            </div>
          </Link>
        ) : (
          <div className="categories">
            {data.name}
            {data.Children.length && subnavs[data.id] ? (
              <i className="fas fa-chevron-up sub-icons"></i>
            ) : data.Children.length ? (
              <i className="fas fa-chevron-down sub-icons"></i>
            ) : null}
          </div>
        )}
      </div>
      {subnavs[data.id] &&
        data.Children.map(child => (
          <div key={child.id} className="sub-categories-container">
            <Link to={`/dashboard${child.path}`}>
              <div
                className={
                  activeItem === child.id
                    ? 'sub-categories active'
                    : 'sub-categories'
                }
                onClick={() => handleSubNavClicked(child.id)}
              >
                {child.name}
              </div>
            </Link>
          </div>
        ))}
    </>
  );
};

export default SubMenu;
