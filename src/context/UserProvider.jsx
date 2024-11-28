import { UserContext } from './UserContext'

function UserProvider({children,value}){
    return (
        <UserContext.Provider value={{value}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider