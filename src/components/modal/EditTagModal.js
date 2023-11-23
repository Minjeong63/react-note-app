import { useDispatch, useSelector } from 'react-redux';
import './SelectTagModal.css';
import { IoClose } from 'react-icons/io5';
import { addToTag, removeToTag } from '../../store/tagSlice';
import { useEffect, useState } from 'react';

const EditTagModal = ({ setTagModalOpen }) => {
  const tags = useSelector((state) => state.tag);
  const dispatch = useDispatch();

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && newTag.trim() !== '') {
        // Enter 키를 눌렀고, 입력된 값이 비어있지 않을 때 데이터를 저장합니다.
        dispatch(addToTag(newTag.trim()));
        setNewTag(''); // 입력값 초기화
      }
    };

    // Enter 키 입력 이벤트 리스너 등록
    document.addEventListener('keydown', handleKeyPress);

    // 컴포넌트가 언마운트되면 이벤트 리스너 정리
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [newTag]);

  return (
    <div className="select-tag-modal-wrapper">
      <div className="select-tag-modal">
        <div className="select-tag-modal-first-block">
          <div className="select-tag-modal-name">Edit Tags</div>
          <div onClick={() => setTagModalOpen(false)}>
            <IoClose className="select-tag-modal-close-icon" />
          </div>
        </div>
        <div>
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="select-tag-modal-input"
            placeholder="new tag..."
          />
        </div>
        <div>
          {tags.length !== 0 &&
            tags.map((tag, key) => {
              return (
                <div key={key} className="select-tag-modal-tag-container">
                  <div className="select-tag-modal-tag">{tag}</div>

                  <div
                    onClick={() => {
                      dispatch(removeToTag(tag));
                    }}
                  >
                    <IoClose className="select-tag-modal-close-icon" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default EditTagModal;
