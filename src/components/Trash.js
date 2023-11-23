import './Notes.css';
import { FaTrashRestore } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeToNote } from '../store/noteSlice';
import printDateAndTime from './util/util';

const Trash = () => {
  const notes = useSelector((state) => state.note);
  const dispatch = useDispatch();

  return (
    <div className="sub-container">
      <div className="sub-title-container">
        <div className="sub-title">Trash</div>
      </div>
      <div className="container">
        <div className="note-container">
          {notes.map((note, key) => {
            if (note.trash)
              return (
                <div key={key} style={{ backgroundColor: note.color }} className="note">
                  <div className="first-block">
                    <div className="note-title">{note.title}</div>
                  </div>
                  <div className="second-block">{note.content}</div>
                  <div className="third-block">
                    <div className="note-tag">{note.tag}</div>
                  </div>
                  <div className="fourth-block">
                    <div className="note-date">{printDateAndTime(note.id)}</div>
                    <div className="notes-icon-container">
                      <FaTrashRestore
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
    </div>
  );
};
export default Trash;
