

export default class CartStorage {
    name: string = "kingsCart"
    removeItem(id: string): void {
        const store = this.getItems()
        if (store) {
            const filtered = store.filter(elem => elem !== id)
            this.addArr(filtered)
        }

    }
    isExist(id: string): boolean {
        const store = this.getItems()
        if (!store || !store.length) {
            return false
        }
        const state: boolean = store.some(elem => elem === id)
        return state
    }
    private addArr(arr: string[]): void {
        // @ts-ignore
        window.localStorage.removeItem(this.name)
        const stringified: string = JSON.stringify(arr)
        window.localStorage.setItem(this.name, stringified)
    }
    addItem(id: string): string {
        const store = this.getItems() || []
        const isCheck = this.isExist(id)
        if (isCheck) {
            return "cart item already exist"
        }
        store.push(id)
        this.addArr(store)
        return "done"
    }
    getItems(): string[] | null {
        // @ts-ignore
        const kingsCart: string | null = window.localStorage.getItem(this.name)
        const result = kingsCart ? JSON.parse(kingsCart) : null
        return result
    }
    clearItems() {
        // @ts-ignore
        window.localStorage.removeItem(this.name)
    }
}