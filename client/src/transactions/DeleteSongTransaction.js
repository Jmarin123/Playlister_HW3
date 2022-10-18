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
export default class DeleteSongTransaction extends jsTPS_Transaction {
    constructor(store, deletedTitle, deletedArtist, deletedYoutube, index) {
        super();
        this.store = store;
        this.deletedTitle = deletedTitle;
        this.deletedArtist = deletedArtist;
        this.deletedYoutube = deletedYoutube;
        this.index = index;
    }

    doTransaction() {
        this.store.deleteSong(this.index);
    }

    undoTransaction() {
        let createOld = {
            title: this.deletedTitle,
            artist: this.deletedArtist,
            youTubeId: this.deletedYoutube
        }
        this.store.moveEdit(createOld, this.index)
    }
}