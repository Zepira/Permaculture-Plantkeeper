import React, { useState, useContext, createContext, useEffect } from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {

    const userId = 'test-user-id';

    return (<AuthenticationContext.Provider
        value={{
            userId
        }}>
        {children}
    </AuthenticationContext.Provider>
    )
}