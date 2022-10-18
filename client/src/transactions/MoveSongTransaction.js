import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class MoveSongTransaction extends jsTPS_Transaction {
    constructor(store, initOldSongIndex, initNewSongIndex) {
        super();
        this.store = store;
        this.oldSongIndex = initOldSongIndex;
        this.newSongIndex = initNewSongIndex;
    }

    doTransaction() {
        this.store.switchSongs(this.oldSongIndex, this.newSongIndex);
    }

    undoTransaction() {
        this.store.switchSongs(this.newSongIndex, this.oldSongIndex);
    }
}