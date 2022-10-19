import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
import DeleteSongModal from './DeleteSongModal.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    if (store.currentList == null) {
        store.history.push('/');
        return null;
    }
    const handleKeyPress = (event) => {
        store.handleKeyPress(event);
    }
    return (
        <div id="playlist-cards"
            onKeyDown={handleKeyPress} tabIndex="0"
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))
            }
            <DeleteSongModal />
        </div>

    )
}

export default PlaylistCards;