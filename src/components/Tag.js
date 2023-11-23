import { useLocation } from 'react-router-dom';
import { removeToNote, updateToNotePin } from '../store/noteSlice';
import Pin from './styledComponents/Pin';
import { BsPencilSquare } from 'react-icons/bs';
import { FaTrash, FaTrashRestore } from 'react-icons/fa';
import NoteModal from './modal/NoteModal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import printDateAndTime from './util/util';
import './Notes.css';

const Tag = () => {
  const location = useLocation();
  const title = location.search.split('?name=')[1];

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const tagNum = notes.reduce((acc, cur) => {
    if (cur.tag.includes(title)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="sub-container">
      <div className="sub-title-container">
        <div className="sub-title">{title}</div>
        <div className="plus-button" onClick={() => setNewModalOpen(true)}>
          +
        </div>
      </div>
      <div className="container">
        {tagNum === 0 ? (
          <div className="no-note">노트가 없습니다.</div>
        ) : (
          <div className="note-container">
            {notes.map((note, key) => {
              if (!note.trash && note.tag.includes(title))
                return (
                  <div key={key} style={{ backgroundColor: note.color }} className="note">
                    <div className="first-block">
                      <div className="note-title">{note.title}</div>
                      {/* <div className="pin-block">
                        <div className="note-priority">{note.priority}</div>
                        <div
                          onClick={() => {
                            dispatch(updateToNotePin(note.id));
                          }}
                        >
                          <Pin selected={note.pin} />
                        </div>
                      </div> */}
                    </div>
                    <div className="second-block">{note.content}</div>
                    <div className="third-block">
                      <div className="note-tag">{note.tag}</div>
                    </div>
                    <div className="fourth-block">
                      <div className="note-date">{printDateAndTime(note.id)}</div>
                      <div className="notes-icon-container">
                        <BsPencilSquare
                          className="note-icon"
                          onClick={() => {
                            setUpdateData(note);
                            setNewModalOpen(true);
                          }}
                        />
                        <FaTrash
                          className="note-icon"
                          onClick={() => {
                            dispatch(removeToNote(note.id));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
        )}
      </div>
      {newModalOpen && <NoteModal setNewModalOpen={setNewModalOpen} updateData={updateData} />}
    </div>
  );
};
export default Tag;
