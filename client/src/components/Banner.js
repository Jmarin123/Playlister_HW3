import EditToolbar from "./EditToolbar";
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
/*
    Our Application's Banner, note we are using function-style
    React. Our banner just has a left-aligned heading and a
    right-aligned toolbar for undo/redo and close list buttons.
    
    @author McKilla Gorilla
*/
function Banner(props) {
    const { store } = useContext(GlobalStoreContext);
    const handleKeyPress = (event) => {
        store.handleKeyPress(event);
    }
    return (
        <div id="playlister-banner" onKeyDown={handleKeyPress} tabIndex="0">
            Playlister
            <EditToolbar />
        </div>
    );
}

export default Banner;