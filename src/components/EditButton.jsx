import './EditButton.css';
import PropTypes from "prop-types";

const EditButton = ({ onClick }) => {
    return (
        <button className="edit-button" onClick={onClick}>
            Edit
        </button>
    );
};

EditButton.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default EditButton;
