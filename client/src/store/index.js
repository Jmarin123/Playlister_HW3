import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import AddSongTransaction from '../transactions/AddSongTransaction';
import MoveSongTransaction from '../transactions/MoveSongTransaction';
import EditSongTransaction from '../transactions/EditSongTransaction';
import DeleteSongTransaction from '../transactions/DeleteSongTransaction';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    SET_LIST_NAME_EDIT_DISABLE: "SET_LIST_NAME_EDIT_DISABLE",
    REMOVE_MARK_LIST_FOR_DELETION: "REMOVE_MARK_LIST_FOR_DELETION",
    REMOVE_MARK_SONG_FOR_DELETION: "REMOVE_MARK_SONG_FOR_DELETION",
    SET_SONG_NAME_EDIT_ENABLE: "SET_SONG_NAME_EDIT_ENABLE",
    SET_SONG_NAME_EDIT_DISABLE: "SET_SONG_NAME_EDIT_DISABLE"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        markedListForDelete: null,
        markedSongForDelete: null,
        currentlyEditingSong: false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedListForDelete: null,
                    markedSongForDelete: null,
                    currentlyEditingSong: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedListForDelete: null,
                    markedSongForDelete: null,
                    currentlyEditingSong: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    markedListForDelete: null,
                    markedSongForDelete: null,
                    currentlyEditingSong: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedListForDelete: null,
                    markedSongForDelete: null,
                    currentlyEditingSong: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedListForDelete: payload,
                    markedSongForDelete: null,
                    currentlyEditingSong: false
                });
            }

            case GlobalStoreActionType.REMOVE_MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedListForDelete: null,
                    markedSongForDelete: null,
                    currentlyEditingSong: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedListForDelete: null,
                    markedSongForDelete: null,
                    currentlyEditingSong: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markedListForDelete: null,
                    markedSongForDelete: null,
                    currentlyEditingSong: false
                });
            }

            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedListForDelete: null,
                    markedSongForDelete: payload,
                    currentlyEditingSong: false
                })
            }

            case GlobalStoreActionType.REMOVE_MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedListForDelete: null,
                    markedSongForDelete: null,
                    currentlyEditingSong: false
                })
            }
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_DISABLE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedListForDelete: null,
                    markedSongForDelete: null,
                    currentlyEditingSong: false
                })
            }
            case GlobalStoreActionType.SET_SONG_NAME_EDIT_ENABLE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedListForDelete: null,
                    markedSongForDelete: null,
                    currentlyEditingSong: true
                })
            }
            case GlobalStoreActionType.SET_SONG_NAME_EDIT_DISABLE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedListForDelete: null,
                    markedSongForDelete: null,
                    currentlyEditingSong: false
                })
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }


    /** 
    * * This deals with the LIST delete modal 
    */
    store.showDeleteListModal = () => {
        let modal = document.getElementById('delete-list-modal');
        modal.classList.add('is-visible');
    }
    store.hideDeleteListModal = () => {
        let modal = document.getElementById('delete-list-modal');
        modal.classList.remove('is-visible');

        storeReducer({
            type: GlobalStoreActionType.REMOVE_MARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    /** 
    * * This deals with the song delete modal 
    */

    store.showDeleteSongModal = () => {
        let modal = document.getElementById('delete-song-modal');
        modal.classList.add('is-visible');
    }
    store.hideDeleteSongModal = () => {
        let modal = document.getElementById('delete-song-modal');
        modal.classList.remove('is-visible');

        storeReducer({
            type: GlobalStoreActionType.REMOVE_MARK_SONG_FOR_DELETION,
            payload: null
        })
    }

    /**
     * 
     * * Dealing with marking and deleting lists
     */
    store.markListForDeletion = async (playlistID) => {
        const givenPlaylist = await api.getPlaylistById(playlistID);
        if (givenPlaylist.data.success) {
            const playlistData = givenPlaylist.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: playlistData
            });
            store.showDeleteListModal();
        }
    }
    store.deleteMarkedList = async () => {
        let deletedList = await api.deletePlaylistById(store.markedListForDelete._id);
        store.loadIdNamePairs();
        store.hideDeleteListModal();
    }



    /**
     * 
     * * Dealing with marking and deleting SONGS
     */
    store.markSongForDeletion = async (song) => {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: store.currentList.songs[song]
        });
        store.showDeleteSongModal();
    }

    store.deleteMarkedSong = async () => {
        let currentList = store.currentList;
        let getIndex = currentList.songs.indexOf(store.markedSongForDelete);
        let transaction = new DeleteSongTransaction(store, store.markedSongForDelete.title, store.markedSongForDelete.artist, store.markedSongForDelete.youTubeId, getIndex);
        tps.addTransaction(transaction);
        store.hideDeleteSongModal();
    }

    store.deleteSong = async (setIndex) => {
        let currentList = store.currentList;
        currentList.songs = currentList.songs.filter((getSong, index) => index !== setIndex)
        let updateCurrentList = await api.updatePlaylistById(store.currentList._id, currentList);
        if (updateCurrentList.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: currentList
            });
        }
    }

    store.editSong = async (songId, newInfo) => {
        let currentList = store.currentList;
        currentList.songs[songId] = newInfo;
        let updateCurrentList = await api.updatePlaylistById(store.currentList._id, currentList);
        if (updateCurrentList.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: currentList
            });
        }
    }
    store.handleKeyPress = (event) => {
        if (!store.listNameActive && store.currentList && !store.markedSongForDelete && !store.currentlyEditingSong) {
            if (event.ctrlKey && event.code === 'KeyZ' && tps.hasTransactionToUndo()) {
                //This will deal with undo!
                store.undo();
            } else if (event.ctrlKey && event.code === 'KeyY' && tps.hasTransactionToRedo()) {
                store.redo();
            }
        }
    }
    store.moveEdit = async (oldInfo, index) => {
        let currentList = store.currentList;
        currentList.songs.splice(index, 0, oldInfo);
        let updateCurrentList = await api.updatePlaylistById(store.currentList._id, currentList);
        if (updateCurrentList.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: currentList
            });
        }
    }

    store.editSongTransaction = (songId, oldInfo, newInfo) => {
        let transaction = new EditSongTransaction(store, oldInfo.title, oldInfo.artist, oldInfo.youTubeId, newInfo.title, newInfo.artist, newInfo.youTubeId, songId);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    store.addSong = async function () {
        let getCurrentList = await api.getPlaylistById(store.currentList._id);
        if (getCurrentList.data.success) {
            getCurrentList = getCurrentList.data.playlist
            let newSongObj = {
                title: "Untitled",
                artist: "Unknown",
                youTubeId: "dQw4w9WgXcQ"
            }
            getCurrentList.songs.push(newSongObj);
            let response = await api.updatePlaylistById(store.currentList._id, getCurrentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: getCurrentList
                });
            }
        }

    }
    store.addSongTransaction = () => {
        let transaction = new AddSongTransaction(store);
        tps.addTransaction(transaction);
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.switchSongs = async (src, target) => {
        let currentList = store.currentList;
        let temp = currentList.songs[target];
        currentList.songs[target] = currentList.songs[src];
        currentList.songs[src] = temp;
        let updateCurrentList = await api.updatePlaylistById(store.currentList._id, currentList);
        if (updateCurrentList.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: currentList
            });
        }
    }

    store.switchSongsTransaction = (src, target) => {
        let transaction = new MoveSongTransaction(store, src, target);
        tps.addTransaction(transaction);
    }

    store.getPlaylistSize = function () {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    store.checkHasTransactionToUndo = () => {
        return tps.hasTransactionToUndo();
    }
    store.checkHasTransactionToRedo = () => {
        return tps.hasTransactionToRedo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.setlistNameDisable = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_DISABLE,
            payload: null
        });
    }

    store.setSongNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_SONG_NAME_EDIT_ENABLE,
            payload: null
        })
    }
    store.setSongNameDisable = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_SONG_NAME_EDIT_DISABLE,
            payload: null
        })
    }
    //OUR CURSTOM LIST
    store.createNewList = async () => {
        const name = "Untitled";
        const songs = [];
        const usedForAPI = { name, songs };
        const answerFromAPI = await api.createPlaylist(usedForAPI);
        if (answerFromAPI.data.success) {
            let newPlaylist = answerFromAPI.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newPlaylist
            });
            store.history.push('/playlist/' + newPlaylist._id);
        }
    }
    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}