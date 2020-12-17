import Dexie from 'dexie';

class DexieService extends Dexie {
    constructor() {
        super('dexie-init-characters')
        this.version(1).stores(
            {
                characters: '++id'
            }
        );
    }
    list = () => this.characters.toArray();
    put = (character) => this.characters.put(character);
}
export default new DexieService();