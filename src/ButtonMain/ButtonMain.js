import React, { useCallback } from 'react'
import { useHistory } from 'react-router';

import './ButtonMain.css'

export default function ButtonMain() {
    const history = useHistory()

    const goMain = useCallback(
        () => {
            history.push('/')
        }, [history]
    )
    return (
        <div className='gomain_button_wrapper'>
            <button className='gomain_button'
            onClick={ goMain }>
                Go Main
            </button>
        </div>
    )
}
