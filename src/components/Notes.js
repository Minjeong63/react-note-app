import { useEffect, useState } from 'react';
import './Notes.css';
import { BsPencilSquare } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import Pin from './styledComponents/Pin';
import NoteModal from './modal/NoteModal';
import { useDispatch, useSelector } from 'react-redux';
import { removeToNote, updateToNotePin } from '../store/noteSlice';
import printDateAndTime from './util/util';
import SortModal from './modal/SortModal';

const Notes = () => {
  const notes = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const [pinSort, setPinSort] = useState('');
  const [sortedNotes, setSortedNotes] = useState([]);
  const [sortModalOpen, setSortModalOpen] = useState(false);

  const sortByPriority = (a, b) => {
    // priority가 'HIGH'인 경우를 먼저 정렬
    if (a.priority === 'HIGH' && b.priority !== 'HIGH') {
      return pinSort === 'HIGH' ? -1 : 1;
    }
    // priority가 'low'인 경우를 그 다음에 정렬
    if (a.priority !== 'HIGH' && b.priority === 'HIGH') {
      return pinSort === 'HIGH' ? 1 : -1;
    }
    // 나머지 경우에는 원래 순서를 유지
    return 0;
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    // notes를 복제한 후, sortByPriority 함수를 사용하여 정렬한 값을 setSortedNotes로 업데이트
    setSortedNotes([...notes].sort(sortByPriority));
  }, [pinSort, notes]);

  return (
    <div className="sub-container">
      <div className="sub-title-container">
        <div className="sub-title">Notes</div>
        <div className="plus-button" onClick={() => setNewModalOpen(true)}>
          +
        </div>
      </div>
      <div className="container">
        <div>
          <input
            className="title-input"
            value={title}
            placeholder="노트의 제목을 입력해 주세요."
            onChange={(e) => onChangeTitle(e)}
          />
        </div>
        <div className="sort-container" onClick={() => setSortModalOpen(true)}>
          <div className="sort">정렬</div>
        </div>
        <div className="pinned-note">Pinned Notes</div>
        <div className="note-container">
          {pinSort === ''
            ? notes.map((note, key) => {
                if (note.pin && !note.trash)
                  return (
                    <div key={key} style={{ backgroundColor: note.color }} className="note">
                      <div className="first-block">
                        <div className="note-title">{note.title}</div>
                        <div className="pin-block">
                          <div className="note-priority">{note.priority}</div>
                          <div
                            onClick={() => {
                              dispatch(updateToNotePin(note.id));
                            }}
                          >
                            <Pin selected={note.pin} />
                          </div>
                        </div>
                      </div>
                      <div className="second-block">{note.content}</div>
                      <div className="third-block">
                        {note.tag.map((item, key) => {
                          return (
                            <div key={key} className="note-tag">
                              {item}
                            </div>
                          );
                        })}
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
              })
            : sortedNotes.map((note, key) => {
                if (note.pin && !note.trash)
                  return (
                    <div key={key} style={{ backgroundColor: note.color }} className="note">
                      <div className="first-block">
                        <div className="note-title">{note.title}</div>
                        <div className="pin-block">
                          <div className="note-priority">{note.priority}</div>
                          <div
                            onClick={() => {
                              dispatch(updateToNotePin(note.id));
                            }}
                          >
                            <Pin selected={note.pin} />
                          </div>
                        </div>
                      </div>
                      <div className="second-block">{note.content}</div>
                      <div className="third-block">
                        {note.tag.map((item, key) => {
                          return (
                            <div key={key} className="note-tag">
                              {item}
                            </div>
                          );
                        })}
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

        <div className="pinned-note">All Notes</div>
        <div className="note-container">
          {pinSort === ''
            ? notes.map((note, key) => {
                if (!note.pin && !note.trash)
                  return (
                    <div key={key} style={{ backgroundColor: note.color }} className="note">
                      <div className="first-block">
                        <div className="note-title">{note.title}</div>
                        <div className="pin-block">
                          <div className="note-priority">{note.priority}</div>
                          <div
                            onClick={() => {
                              dispatch(updateToNotePin(note.id));
                            }}
                          >
                            <Pin selected={note.pin} />
                          </div>
                        </div>
                      </div>
                      <div className="second-block">{note.content}</div>
                      <div className="third-block">
                        {note.tag.map((item, key) => {
                          return (
                            <div key={key} className="note-tag">
                              {item}
                            </div>
                          );
                        })}
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
              })
            : sortedNotes.map((note, key) => {
                if (!note.pin && !note.trash)
                  return (
                    <div key={key} style={{ backgroundColor: note.color }} className="note">
                      <div className="first-block">
                        <div className="note-title">{note.title}</div>
                        <div className="pin-block">
                          <div className="note-priority">{note.priority}</div>
                          <div
                            onClick={() => {
                              dispatch(updateToNotePin(note.id));
                            }}
                          >
                            <Pin selected={note.pin} />
                          </div>
                        </div>
                      </div>
                      <div className="second-block">{note.content}</div>
                      <div className="third-block">
                        {note.tag.map((item, key) => {
                          return (
                            <div key={key} className="note-tag">
                              {item}
                            </div>
                          );
                        })}
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
      </div>
      {newModalOpen && <NoteModal setNewModalOpen={setNewModalOpen} updateData={updateData} />}
      {sortModalOpen && <SortModal setPinSort={setPinSort} setSortModalOpen={setSortModalOpen} />}
    </div>
  );
};
export default Notes;
