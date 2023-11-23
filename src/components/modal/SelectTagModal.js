import { useSelector } from 'react-redux';
import './SelectTagModal.css';
import { IoClose } from 'react-icons/io5';
import { TiPlus } from 'react-icons/ti';
import { useState } from 'react';
import { TiMinus } from 'react-icons/ti';

const SelectTagModal = ({ setTagModalOpen, tag, setTag }) => {
  const tags = useSelector((state) => state.tag);
  const [selectedTags, setSelectedTags] = useState(tag);

  return (
    <div className="select-tag-modal-wrapper">
      <div className="select-tag-modal">
        <div className="select-tag-modal-first-block">
          <div className="select-tag-modal-name">ADD Tags</div>
          <div onClick={() => setTagModalOpen(false)}>
            <IoClose className="select-tag-modal-close-icon" />
          </div>
        </div>
        <div>
          <input className="select-tag-modal-input" placeholder="new tag..." />
        </div>
        <div>
          {tags.length !== 0 &&
            tags.map((tag, key) => {
              return (
                <div key={key} className="select-tag-modal-tag-container">
                  <div className="select-tag-modal-tag">{tag}</div>
                  {selectedTags.includes(tag) ? (
                    <div
                      onClick={() => {
                        const changeTag = selectedTags.filter((el) => el !== tag);
                        setSelectedTags(changeTag);
                        setTag(changeTag);
                      }}
                    >
                      <TiMinus className="select-tag-modal-plus-icon" />
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setSelectedTags([...selectedTags, tag]);
                        setTag([...selectedTags, tag]);
                      }}
                    >
                      <TiPlus className="select-tag-modal-plus-icon" />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default SelectTagModal;
