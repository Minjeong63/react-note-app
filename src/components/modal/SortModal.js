import { useState } from 'react';
import './SortModal.css';
import { IoClose } from 'react-icons/io5';

const SortModal = ({ setSortModalOpen, setPinSort }) => {
  const [highOrLow, setHighOrLow] = useState('');
  const [dateStandard, setDateStandard] = useState('');

  const onChangeHighOrLow = (e) => {
    setHighOrLow(e.target.value);
    setPinSort(e.target.value);
  };

  const onChangeDateStandard = (e) => {
    setDateStandard(e.target.value);
  };

  return (
    <div className="sort-modal-wrapper">
      <div className="sort-modal">
        <div className="sort-modal-first-block">
          <div className="sort-clear">
            <div className="select-tag-modal-name">정렬</div>
            <div
              className="sort-clear-text"
              onClick={() => {
                setHighOrLow('');
                setPinSort('');
              }}
            >
              CLEAR
            </div>
          </div>
          <div onClick={() => setSortModalOpen(false)}>
            <IoClose className="select-tag-modal-close-icon" />
          </div>
        </div>
        <div>
          <div className="sort-title">PRIORITY</div>
          <div className="high-low-sort">
            <label>
              <input
                type="radio"
                value="HIGH"
                checked={highOrLow === 'HIGH'}
                onChange={(e) => onChangeHighOrLow(e)}
              />
              Low to High
            </label>

            <label>
              <input
                type="radio"
                value="LOW"
                checked={highOrLow === 'LOW'}
                onChange={(e) => onChangeHighOrLow(e)}
              />
              High to Low
            </label>
          </div>
        </div>
        <div>
          <div className="sort-title">DATE</div>
          <div className="high-low-sort">
            <label>
              <input
                type="radio"
                value="latest"
                checked={dateStandard === 'latest'}
                onChange={(e) => onChangeDateStandard(e)}
              />
              Sort by Latest
            </label>

            <label>
              <input
                type="radio"
                value="created"
                checked={dateStandard === 'created'}
                onChange={(e) => onChangeDateStandard(e)}
              />
              Sort by Created
            </label>

            <label>
              <input
                type="radio"
                value="edited"
                checked={dateStandard === 'edited'}
                onChange={(e) => onChangeDateStandard(e)}
              />
              Sort by Edited
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SortModal;
