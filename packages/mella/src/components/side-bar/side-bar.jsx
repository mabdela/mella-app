import React, { useState, useEffect } from 'react';
import './side-bar.scss';

import { useDispatch, useSelector } from 'react-redux';
import {
  getItemsRequest,
  newUpdateSubNav,
  setLocation,
  showActiveItem,
} from '../../redux/side-bar/side-bar-actions';
import { logoutUserRequest } from '../../redux/user/user-action';
import { hidePane } from '../../redux/side-bar/side-bar-actions';

import SubMenu from '../sub-menu/sub-menu';
import { Button } from '@mui/material';

// react-responsive
import { useMediaQuery } from 'react-responsive';

import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [, setSearch] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const name = useSelector(state => state.auth.user.name);
  const state = useSelector(state => state.sidebar);

  // const [subnavs, setSubnavs] = useState({});
  const [filteredCategories, setFilteredCategories] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // change background color when submenu clicked
  const showActive = itemId => {
    isMobile && dispatch(hidePane());
    dispatch(showActiveItem(itemId));
    // setActive({ activeItem: itemId });
  };

  useEffect(() => {
    dispatch(getItemsRequest());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategories(state.items);
  }, [state.items]);

  useEffect(() => {
    dispatch(setLocation(location.pathname));
  }, [dispatch, location.pathname]);

  const handleChange = e => {
    setSearch(e.target.value);
    searchCategories(e.target.value);
  };

  const logout = () => {
    dispatch(logoutUserRequest());
  };

  const searchCategories = searchTerm => {
    const newFilteredCategories = [];
    const updatedSubNavs = {};
    state.items.forEach(item => {
      let showSubNavForItem = false;
      const foundChildren = item.Children.filter(child =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const foundCategory = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (foundCategory) {
        // if its searched by category it didnt expand and show subcategories
        newFilteredCategories.push(item);
      } else if (foundChildren.length) {
        newFilteredCategories.push({ ...item, Children: foundChildren });
        // show subcategories if search string found in the subcategories
        showSubNavForItem = true;
      }
      updatedSubNavs[item.id] = showSubNavForItem;
    });
    setFilteredCategories(newFilteredCategories);
    // setSubnavs(updatedSubNavs);
    dispatch(newUpdateSubNav(updatedSubNavs));
  };

  return (
    <div className={state.hidden ? 'side-pane hide' : 'side-pane'}>
      <input
        type="search"
        placeholder="Search"
        className="input-container"
        onChange={handleChange}
      />
      <Link to="/course-list">
        <div className="categories-container">
          <div className="categories" onClick={() => showActive(-1)}>
            Explore Courses
          </div>
        </div>
      </Link>

      {filteredCategories.length > 0 &&
        filteredCategories.map((data, index) => {
          const newFilteredData =
            data.id === 0
              ? {
                  ...data,
                  name:
                    `${name.charAt(0).toUpperCase() + name.slice(1)}'s ` +
                    data.name,
                }
              : data;

          return (
            <SubMenu
              key={index}
              data={newFilteredData}
              handleSubNavClicked={showActive}
            />
          );
        })}

      {isMobile && (
        <Button className="logout" onClick={logout}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default SideBar;
