import './EditButton.css'; // Make sure to create a corresponding CSS file

const EditButton = ({ onClick }) => {
    return (
        <button className="edit-button" onClick={onClick}>
            Edit
        </button>
    );
};

export default EditButton;
