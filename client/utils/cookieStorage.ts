import Cookies from "js-cookie"

class CookieStorage {
    name = "kingsCart"
    options = { expires: 365 }
    addItem(id: string): string {
        const first = this.getItems()
        const check = this.isExist(id)
        if (check) {
            return "cart item already exist"
        }
        first.push(id)
        this.setCookie(first)
        return "done"
    }
    isExist(id: string) {
        const first = this.getItems()
        const state = first?.some(elem => elem === id) as boolean
        return state

    }
    removeItem(id: string) {
        const first = this.getItems()
        const filtered = first.filter(elem => {
            if (elem === id) {
            } else {
                return elem
            }
        })
        this.setCookie(filtered)
    }
    setCookie(arr: string[]) {
        Cookies.remove(this.name)
        Cookies.set(this.name, JSON.stringify(arr), this.options)
    }
    getItems(): string[] {
        const first: string | undefined = Cookies.get(this.name)
        const second: string[] = first ? JSON.parse(first) : []
        return second
    }
    addUser(id: string) {
        Cookies.set("mgt", id, this.options
        )
    }
    removeUser(id: string) {
        Cookies.remove("mgt")
    }
    getUser() {
        const id = Cookies.get("mgt")
        return id
    }

}

const cookieStorage = new CookieStorage()
export default cookieStorage

// 65f81cb4633a54f273415deb