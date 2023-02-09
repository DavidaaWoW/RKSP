import React from "react";
import { useSignOut } from 'react-auth-kit'

export default function Logout () {
    const signOut = useSignOut()

    return (
        <button onClick={() => signOut()}>Sign Out</button>
    )
}