import "./HelpPopup.css";
import {useState} from "react";
import Button from "./Button.jsx";
import Select from "react-select";
import {updatePreferences} from "../services/apiservice.js";

const Preferences = (props) => {
    // eslint-disable-next-line react/prop-types
    const [preferences, setPreferences] = useState(props.preferences);
    // eslint-disable-next-line react/prop-types
    const tags = props.tags.filter(tag => !preferences.find(pref => pref.label === tag.label));
    // eslint-disable-next-line react/prop-types
    const userid = props.userid;
    const [selectedTag, setSelectedTag] = useState(null);
    const [inputValue, setInputValue] = useState(0.1);
    const handleDelete = (label) => {
        const updatedPreferences = preferences.filter(pref => pref.label !== label);
        setPreferences(updatedPreferences);
    };
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            position: 'absolute',
            left: '0',
            top: 'calc(100% + 4px)',
            width: '100%',
        }),
    };
    const handleSave = async () => {
        await updatePreferences(userid, preferences);
        document.location.href = '/userpage';
    }
    const handleCancel = async () => {
        document.location.href = '/userpage';
    }

    const handleChange = (label, value) => {
        const updatedPreferences = preferences.map(pref =>
            pref.label === label ? { ...pref, weight: value } : pref
        );
        setPreferences(updatedPreferences);
    }

    const handleAdd = () => {
        if (selectedTag && inputValue >= 0.1 && inputValue <= 1) {
            const newPreference = { label: selectedTag.label, weight: inputValue };
            const updatedPreferences = [...preferences, newPreference];
            setPreferences(updatedPreferences);
            setSelectedTag(null);
            setInputValue(0.1);
        } else {
            console.error("Error: Please select a tag and enter a valid value between 0.1 and 1.");
        }
    }
    return(
        // eslint-disable-next-line react/no-unknown-property
        <div className="prefPopup" align='center'>
            <h1>Edit your preferences</h1>
            <div>
                <ul style={{ listStyleType: 'none' }}>
                    {preferences.map(tag => ( //user_id's preferences
                        <li key={tag.label} style={{marginTop: '5px'}}>
                            {tag.label},
                            <div style={{ display: 'inline-block', marginRight: '5px' }}>
                                <input
                                    type="number"
                                    min={0.1}
                                    max={1}
                                    id="weight"
                                    name="weight"
                                    step={0.1}
                                    value={tag.weight}
                                    onChange={(e) => handleChange(tag.label, e.target.value)}
                                />
                            </div>
                            <Button onClick={() => handleDelete(tag.label)} text={'Delete'} />
                        </li>
                    ))}
                </ul>
                <div style={{ position: 'relative', width: '200px' }}>
                    <Select
                        name="prefSelect"
                        placeholder="Choose tag"
                        options={tags}
                        isClearable={true}
                        value={selectedTag}
                        onChange={(selectedOption) => setSelectedTag(selectedOption)}
                        styles={customStyles}
                    />
                </div>
                <div style={{ display: 'inline-block', marginRight: '5px' , marginTop: '5px'}}>
                    <input
                        type="number"
                        min={0.1}
                        max={1}
                        id="weight"
                        name="weight"
                        step={0.1}
                        defaultValue={0.1}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>
                <div style={{ display: 'inline-block', marginRight: '5px' , marginTop: '5px'}}>
                    <Button onClick={() => handleAdd(selectedTag, inputValue)} text={'Add'} />
                </div>

            </div>
            <div className='user-info-item' id='button' style={{marginTop: '5px'}}>
                <Button onClick={handleSave} text={'Save changes'} type="submit" />
            </div>
            <div className='user-info-item' id='button' style={{marginTop: '5px'}}>
                <Button onClick={handleCancel} text={'Cancel changes'} type="submit" />
            </div>
        </div>
    )
}

export default Preferences;