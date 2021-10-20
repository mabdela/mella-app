import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllPriority,
  fetchHighPrioritySidebar,
  fetchSecondPrioritySidebar,
  getItemsRequest,
} from '../../redux/side-bar/side-bar-actions';
import './goals.scss';

const Goals = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.auth.user.name);

  const handleAllPriority = () => {
    dispatch(getItemsRequest());
    dispatch(fetchAllPriority());
  };
  const handleHighPriority = () => {
    dispatch(getItemsRequest());
    dispatch(fetchHighPrioritySidebar());
  };
  const handleSecondPriority = () => {
    dispatch(fetchSecondPrioritySidebar());
  };
  return (
    <div className="goals-wrapper">
      <h2 className="goals-text">
        What's your Goal, {name && name.charAt(0).toUpperCase() + name.slice(1)}
        ?
      </h2>
      <div className="goals-container">
        <div className="goals" onClick={() => handleAllPriority()}>
          <div className="goals-icon-container">
            <i className="fas fa-check"></i>
          </div>
          <div className="goals-name">FULL 4.0</div>
          <p className="goals-explanation">Prepare for everything</p>
        </div>

        <div className="goals" onClick={() => handleHighPriority()}>
          <div className="goals-icon-container">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="goals-name">FAST LANE</div>
          <p className="goals-explanation">Most Important content</p>
        </div>

        <div className="goals" onClick={() => handleSecondPriority()}>
          <div className="goals-icon-container">
            <i className="far fa-clock"></i>
          </div>
          <div className="goals-name">2HR SPRINT</div>
          <p className="goals-explanation">Focus on the exam</p>
        </div>
      </div>
    </div>
  );
};

export default Goals;
