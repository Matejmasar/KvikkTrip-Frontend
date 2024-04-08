import './EditButton.css';

const EditButton = ({ onClick }) => {
    return (
        <button className="edit-button" onClick={onClick}>
            Edit
        </button>
    );
};

export default EditButton;
