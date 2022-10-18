import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [youTubeId, setYouTubeId] = useState("");
    const [draggingTo, setDraggingTo] = useState(false);

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

    const handleDeleteSong = (event) => {
        event.stopPropagation();
        let value = event.target.id.split('-')[2];
        store.markSongForDeletion(value);
    }
    const handleDoubleClick = (event) => {
        event.stopPropagation();
        toggleEdit();
    }
    const handleDragEnter = (event) => {
        event.preventDefault();
        setDraggingTo(true);
    }
    const handleDragLeave = (event) => {
        event.preventDefault();
        setDraggingTo(false);
    }
    const toggleEdit = () => {
        let newEdit = !editActive;
        if (newEdit) {
            store.setSongNameActive();
        } else {
            store.setSongNameDisable();
        }
        setEditActive(newEdit);
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleArtistChange = (event) => {
        setArtist(event.target.value);
    }

    const handleYoutubeChange = (event) => {
        setYouTubeId(event.target.value);
    }
    const handleDragStart = (event) => {
        let songId = event.target.id.split('-')[1];
        event.dataTransfer.setData("song", songId);
    }
    const handleDragDrop = (event) => {
        event.preventDefault();
        let songTarget = event.target.id.split('-')[1];
        let songDragged = event.dataTransfer.getData("song");
        store.switchSongs(songDragged, songTarget);
        setDraggingTo(false);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            // let id = event.target.id.substring("list-".length);
            // if (text !== '') {
            //     store.changeListName(id, text);
            // }
            let titleValue = title;
            let artistValue = artist;
            let youtubeValue = youTubeId;
            if (titleValue === '') {
                titleValue = song.title;
            }
            if (artistValue === '') {
                artistValue = song.artist;
            }
            if (youtubeValue === '') {
                youtubeValue = song.youTubeId;
            }
            if (titleValue !== song.title || artistValue !== song.artist || youtubeValue !== song.youTubeId) {
                let newInfo = {
                    title: titleValue,
                    artist: artistValue,
                    youTubeId: youtubeValue
                }
                store.editSong(index, newInfo);
            }
            toggleEdit();
        }
    }
    let checkDisable = false;
    if (store.markedSongForDelete || store.currentlyEditingSong) {
        checkDisable = true;
    }
    if (draggingTo) {
        cardClass = "list-card selected-list-card";
    }
    let songElement = <div
        key={index}
        id={'song-' + index + '-card'}
        className={cardClass}
        onDoubleClick={handleDoubleClick}
        onDragStart={handleDragStart}
        onDragOver={(event) => event.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        draggable="true"
    >
        {index + 1}.
        <a
            id={'song-' + index + '-link'}
            className="song-link"
            href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
            {song.title} by {song.artist}
        </a>
        <input
            type="button"
            id={"remove-song-" + index}
            className="list-card-button"
            disabled={checkDisable}
            onClick={handleDeleteSong}
            value={"\u2715"}
        />
    </div>
    if (editActive) {
        songElement = <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onKeyPress={handleKeyPress}
        >
            <input type="text"
                defaultValue={song.title}
                onChange={handleTitleChange}
            >
            </input>
            <input type="text"
                defaultValue={song.artist}
                onChange={handleArtistChange}
            ></input>
            <input type="text"
                defaultValue={song.youTubeId}
                onChange={handleYoutubeChange}
            ></input>


        </div>
    }
    return (
        songElement
    );
}

export default SongCard;