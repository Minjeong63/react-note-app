import { FaLightbulb } from 'react-icons/fa';
import './Sidebar.css';
import { BiSolidPencil } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { FaArchive } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa6';
import { useState } from 'react';
import EditTagModal from '../modal/EditTagModal';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const tags = useSelector((state) => state.tag);
  const [tagModalOpen, setTagModalOpen] = useState(false);

  return (
    <div className="sidebar-container">
      <div className="sidebar-title">Keep</div>
      <div className="">
        <div className="tab" onClick={() => navigate('/')}>
          <div className="sidebar-icon-container">
            <FaLightbulb className="sidebar-icon" />
          </div>
          <div className="sidebar-subtitle">Notes</div>
        </div>

        {tags.length !== 0 &&
          tags.map((tag, key) => {
            return (
              <div key={key} className="tab" onClick={() => navigate(`/tag?name=${tag}`)}>
                <div className="sidebar-icon-container">
                  <FaTag className="sidebar-icon" />
                </div>
                <div className="sidebar-subtitle">{tag}</div>
              </div>
            );
          })}

        <div className="tab" onClick={() => setTagModalOpen(true)}>
          <div className="sidebar-icon-container">
            <BiSolidPencil className="sidebar-icon" />
          </div>
          <div className="sidebar-subtitle">Edit Notes</div>
        </div>

        <div className="tab" onClick={() => navigate('/archive')}>
          <div className="sidebar-icon-container">
            <FaArchive className="sidebar-icon" />
          </div>
          <div className="sidebar-subtitle">Archive</div>
        </div>

        <div className="tab" onClick={() => navigate('/trash')}>
          <div className="sidebar-icon-container">
            <FaTrash className="sidebar-icon" />
          </div>
          <div className="sidebar-subtitle">Trash</div>
        </div>
      </div>
      {tagModalOpen && <EditTagModal setTagModalOpen={setTagModalOpen} />}
    </div>
  );
};
export default Sidebar;
