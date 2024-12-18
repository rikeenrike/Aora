import { getCurrentUser } from '@/lib/appwrite';
import { createContext, useContext, useEffect, useState } from 'react';


const GlobalContext = createContext({
    isLoading: false,
    setIsLoading: (value: boolean) => {},
    user: null,
    setUser: (p0: any) => {},
    isLoggedin: false,
    setIsLoggedin: (p0: boolean) => {}
});
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider =  ({ children }: { children: React.ReactNode }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {
        setIsLoading(true); // Set loading state to true when the effect starts
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setUser(res);
                    setIsLoggedin(true);
                } else {
                    setUser(null);
                    setIsLoggedin(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false); 
            });
    }, []); 

    return (    
        <GlobalContext.Provider 
            value={{
                isLoading,
                setIsLoading,
                user,
                setUser,
                isLoggedin,
                setIsLoggedin
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;