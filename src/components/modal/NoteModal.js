import { useEffect, useState } from 'react';
import './NoteModal.css';
import SelectTagModal from './SelectTagModal';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { addToNote, updateToNote } from '../../store/noteSlice';

const NoteModal = ({ setNewModalOpen, updateData }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(updateData ? updateData.title : '');
  const [content, setContent] = useState(updateData ? updateData.content : '');
  const [tag, setTag] = useState(updateData ? updateData.tag : []);
  const [selectedColor, setSelectedColor] = useState(updateData ? updateData.color : 'white');
  const [selectedPriority, setSelectedPriority] = useState(
    updateData ? updateData.priority : 'LOW'
  );
  const [tagModalOpen, setTagModalOpen] = useState(false);

  useEffect(() => {
    if (updateData) {
      updateData.color === 'pink'
        ? setSelectedColor('red')
        : updateData.color === 'rgb(179, 238, 179)'
        ? setSelectedColor('green')
        : updateData.color === 'rgb(141, 203, 216)'
        ? setSelectedColor('blue')
        : setSelectedColor('white');
    }
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeColor = (e) => {
    setSelectedColor(e.target.value);
  };

  const onChangePriority = (e) => {
    setSelectedPriority(e.target.value);
  };

  const createNote = () => {
    const data = {
      id: updateData ? updateData.id : new Date().getTime(),
      title,
      content,
      tag: tag,
      color:
        selectedColor === 'red'
          ? 'pink'
          : selectedColor === 'green'
          ? 'rgb(179, 238, 179)'
          : selectedColor === 'blue'
          ? 'rgb(141, 203, 216)'
          : 'white',
      priority: selectedPriority,
      pin: false,
      trash: false,
    };
    updateData ? dispatch(updateToNote({ updatedData: data })) : dispatch(addToNote(data));
    setNewModalOpen(false);
  };

  return (
    <div className="note-modal-wrapper">
      <div className="note-modal">
        <div className="note-modal-first-block">
          <div className="note-modal-name">노트 생성하기</div>
          <div onClick={() => setNewModalOpen(false)}>
            <IoClose className="note-modal-close-icon" />
          </div>
        </div>
        <div>
          <input
            className="note-modal-title"
            value={title}
            onChange={(e) => onChangeTitle(e)}
            placeholder="title"
          />
        </div>
        <div>
          <input
            style={{
              backgroundColor:
                selectedColor === 'red'
                  ? 'pink'
                  : selectedColor === 'green'
                  ? 'rgb(179, 238, 179)'
                  : selectedColor === 'blue'
                  ? 'rgb(141, 203, 216)'
                  : 'white',
            }}
            className="note-modal-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="content"
          />
        </div>
        <div className="last-block">
          <div className="sort" onClick={() => setTagModalOpen(true)}>
            Add Tag
          </div>

          <div>
            배경색 :{' '}
            <select value={selectedColor} onChange={(e) => onChangeColor(e)}>
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </div>

          <div>
            우선순위 :{' '}
            <select value={selectedPriority} onChange={(e) => onChangePriority(e)}>
              <option value="LOW">Low</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>
        <div className="note-modal-tag-container">
          {tag.length !== 0 &&
            tag.map((item, key) => {
              return (
                <div key={key} className="note-modal-tag">
                  {item}
                  <IoClose
                    onClick={() => {
                      const changeTag = tag.filter((el) => el !== item);
                      setTag(changeTag);
                    }}
                    className="note-modal-close-icon"
                  />
                </div>
              );
            })}
        </div>
        <div className="note-modal-plus-button-container">
          <div className="node-modal-plus-button" onClick={createNote}>
            + 생성하기
          </div>
        </div>
      </div>
      {tagModalOpen && (
        <SelectTagModal setTagModalOpen={setTagModalOpen} tag={tag} setTag={setTag} />
      )}
    </div>
  );
};
export default NoteModal;
